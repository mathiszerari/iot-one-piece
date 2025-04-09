import mqtt from 'mqtt';

const client = mqtt.connect("mqtt://test.mosquitto.org:8081");

export function subscribeToTopic(topic, setMessage) {

    client.on("connect", () => {
        client.subscribe(topic, (err) => {
            if (err) {
                console.error("Erreur lors de l'abonnement :", err);
            }
        });
    });

    client.on("message", (receivedTopic, message) => {
        if (receivedTopic === topic) {
            setMessage(message.toString());
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
