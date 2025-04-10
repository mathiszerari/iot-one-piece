import SerialPort from 'serialport';
import xbee_api from 'xbee-api';
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
  api_mode: 1
});

const connectedBoxes = new Map();

let actualStep = 'step-1'

function getBoxIdByName(name) {
  for (const [boxId, nodeIdentifier] of connectedBoxes) {
    if (nodeIdentifier === name) {
      return boxId;
    }
  }
  return null;
}


let serialport = new SerialPort(SERIAL_PORT, {
  baudRate: parseInt(process.env.SERIAL_BAUDRATE) || 9600,
}, function (err) {
  if (err) {
    return console.log('Creating SerialPort', err.message)
  }
});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

serialport.on("open", function () {

  let previousStep = null;

  subscribeToTopic('box/step', (message) => {

    actualStep = message;

    if (message === previousStep) {
      console.log("Aucune modification de l'étape, on ne fait rien.");
      return;
    }

    previousStep = message;

    switch (message) {
      case 'step-0' :
        sendRemoteAtCommand(getBoxIdByName('box1'), 'D0', [0x00], xbeeAPI);
        sendRemoteAtCommand(getBoxIdByName('box1'), 'D1', [0x00], xbeeAPI);
        break;
      case 'step-1':
        sendRemoteAtCommand(getBoxIdByName('box1'), 'D0', [0x02], xbeeAPI);
        break;

      case 'step-2':
        sendRemoteAtCommand(getBoxIdByName('box1'), 'D0', [0x00], xbeeAPI);
        sendRemoteAtCommand(getBoxIdByName('box1'), 'D1', [0x02], xbeeAPI);
        break;

        case 'step-3':
          sendRemoteAtCommand(getBoxIdByName('box1'), 'D1', [0x00], xbeeAPI);
          sendRemoteAtCommand(getBoxIdByName('box1'), 'D2', [0x02], xbeeAPI);
          break;

    }
  });





});

// All frames parsed by the XBee will be emitted here
xbeeAPI.parser.on("data", function (frame) {


  if (C.FRAME_TYPE.NODE_IDENTIFICATION === frame.type) {
    console.log("NODE_IDENTIFICATION", frame);

    const boxId = frame.sender64.toString('hex');
    const nodeIdentifier = frame.nodeIdentifier;

    if (!connectedBoxes.has(boxId)) {
      if (nodeIdentifier === 'box1') {
        connectedBoxes.set(boxId, nodeIdentifier);

      } else {
        console.log(`Box ignorée : nodeIdentifier = "${nodeIdentifier}"`);
      }
    }
    console.log("Boxes:", Array.from(connectedBoxes.entries()));

  } else if (C.FRAME_TYPE.ZIGBEE_IO_DATA_SAMPLE_RX === frame.type) {
    console.log("ZIGBEE_IO_DATA_SAMPLE_RX");
    console.log(frame);
    console.log(actualStep)
    switch (actualStep) {
      case 'step-1':
        sendToTopic('box/lightlevel', String(frame.analogSamples.AD0));
        break;

    }



  } else if (C.FRAME_TYPE.REMOTE_COMMAND_RESPONSE === frame.type) {
    console.log("REMOTE_COMMAND_RESPONSE", frame)
  } else {
    console.debug(frame);
    let dataReceived = String.fromCharCode.apply(null, frame.commandData)
    console.log(dataReceived);
  }
});
