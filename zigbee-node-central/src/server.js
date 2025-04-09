import SerialPort from 'serialport';
import xbee_api from 'xbee-api';
import mqtt from 'mqtt';
import {sendRemoteAtCommand, sendToTopic, subscribeToTopic} from './mqtt-client.js';
import dotenv from 'dotenv';

dotenv.config();

const C = xbee_api.constants;

if (!process.env.SERIAL_PORT)
  throw new Error('Missing SERIAL_PORT environment variable');

if (!process.env.SERIAL_BAUDRATE)
  throw new Error('Missing SERIAL_BAUDRATE environment variable');

// Replace with your serial port and baud rate (9600 by default)
const SERIAL_PORT = process.env.SERIAL_PORT;

// Ensure to configure your XBEE Module in API MODE 2
var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 2
});

let serialport = new SerialPort(SERIAL_PORT, {
  baudRate: parseInt(process.env.SERIAL_BAUDRATE) || 9600,
}, function (err) {
  if (err) {
    return console.log('Creating SerialPort', err.message)
  }
});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

const BROADCAST_ADDRESS = "FFFFFFFFFFFFFFFF";
const XBEE1 = "0013A20041FB76EA"


serialport.on("open", function () {

  //Sample local command to ask local Xbee module the value of NODE IDENTIFIER
  var frame_obj = { // AT Request to be sent
    type: C.FRAME_TYPE.AT_COMMAND,
    command: "NI",
    commandParameter: [],
  };

  xbeeAPI.builder.write(frame_obj);

  //Sample remote command to ask all remote Xbee modules the value of their NODE IDENTIFIER
  frame_obj = { // AT Request to be sent
    type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
    destination64: BROADCAST_ADDRESS,
    command: "NI",
    commandParameter: [],
  };
  xbeeAPI.builder.write(frame_obj);

  var setLum = {
    type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
    destination64: '0013a20041fb76ea',
    command: "D1",
    commandParameter: [0x00],
  };
  xbeeAPI.builder.write(setLum);

});

// All frames parsed by the XBee will be emitted here
xbeeAPI.parser.on("data", function (frame) {

  //on new device is joined, register it
  if (C.FRAME_TYPE.JOIN_NOTIFICATION_STATUS === frame.type) {
    console.log("New device has joined network, you can register has new device available");

  }

  if (C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET === frame.type) {
    console.log("C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET");
    let dataReceived = String.fromCharCode.apply(null, frame.data);
    console.log(">> ZIGBEE_RECEIVE_PACKET >", dataReceived);

  }

  if (C.FRAME_TYPE.NODE_IDENTIFICATION === frame.type) {
    // let dataReceived = String.fromCharCode.apply(null, frame.nodeIdentifier);
    console.log("NODE_IDENTIFICATION", frame);

  } else if (C.FRAME_TYPE.ZIGBEE_IO_DATA_SAMPLE_RX === frame.type) {
    console.log("ZIGBEE_IO_DATA_SAMPLE_RX");
    console.log(frame);
    console.log(frame.analogSamples.AD0);

    sendToTopic('box/lightlevel', String(frame.analogSamples.AD0));

  } else if (C.FRAME_TYPE.REMOTE_COMMAND_RESPONSE === frame.type) {
    console.log("REMOTE_COMMAND_RESPONSE")
  } else {
    console.debug(frame);
    let dataReceived = String.fromCharCode.apply(null, frame.commandData)
    console.log(dataReceived);
    subscribeToTopic('game/player1');
  }
});
