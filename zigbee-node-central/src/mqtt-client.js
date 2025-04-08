import mqtt from 'mqtt';

const client = mqtt.connect("mqtt://test.mosquitto.org");

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

export function subscribeToTopic(topic) {
  client.subscribe(topic, (err) => {
    if (err) {
      console.error(`Failed to subscribe to topic ${topic}:`, err);
    }
    else {
      console.log(`Subscribed to topic ${topic}`);
      sendToTopic(topic, "Hello from MQTT client");
    }
  });
}

export function sendToTopic(topic, message) {
  client.publish(topic, message, (err) => {
    if (err) {
      console.error(`Failed to publish message to topic ${topic}:`, err);
    }
    else {
      console.log(`Published message to topic ${topic}`);
    }
  });
}

export default client;
