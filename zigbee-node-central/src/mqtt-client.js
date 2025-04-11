import mqtt from 'mqtt';
import xbee_api from 'xbee-api';

const C = xbee_api.constants;

const client = mqtt.connect("mqtt://test.mosquitto.org");

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

export function subscribeToTopic(topic, callback) {
  client.subscribe(topic, (err) => {
    if (err) {
      console.error(`Failed to subscribe to topic ${topic}:`, err);
    } else {
      console.log(`Subscribed to topic ${topic}`);
    }
  });

  client.on("message", (receivedTopic, message) => {
    if (receivedTopic === topic) {
      const data = message.toString();
      console.log(`${receivedTopic}: ${data}`);
      if (callback) callback(data);
    }
  });
}


export function sendToTopic(topic, message) {
  client.publish(topic, message, (err) => {
    if (err) {
      console.error(` Failed to publish message to topic ${topic}:`, err);
    } else {
      console.log(` Published message to topic ${topic}`);
    }
  });
}

export function sendAtCommand(command, parameter = [], xbeeAPI) {
  const frame = {
    type: C.FRAME_TYPE.AT_COMMAND,
    command: command,
    commandParameter: parameter,
  };
  xbeeAPI.builder.write(frame);
  console.log(` Sent local AT command: ${command}`);
}

export function sendRemoteAtCommand(destination64, command, parameter = [], xbeeAPI) {
  const frame = {
    type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
    destination64: destination64,
    command: command,
    commandParameter: parameter,
  };
  xbeeAPI.builder.write(frame);
  console.log(` Sent remote AT command '${command}' to ${destination64} with param:`, parameter);
}

export default client;
