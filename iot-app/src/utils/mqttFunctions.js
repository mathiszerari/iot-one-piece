import mqtt from 'mqtt';

const client = mqtt.connect("wss://test.mosquitto.org:8081");

export function subscribeToTopic(topic, setMessage) {

    client.on("connect", () => {
        client.subscribe(topic, (err) => {
            if (err) {
                console.error("Erreur lors de l'abonnement :", err);
            }
        });
    });


    // ici je ne passe pas
    client.on("message", (receivedTopic, message) => {
        console.log('Received message:', message.toString());
        if (receivedTopic === topic) {
            console.log('Setting message:', message.toString());
            setMessage(message.toString());
        }
        console.log('Returning message:', message.toString());
        return message.toString();
    });

    return "default";
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
