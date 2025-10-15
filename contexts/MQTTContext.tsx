
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Make Paho available in the component
declare var Paho: any;

interface SensorData {
  temperature: number | null;
  humidity: number | null;
  heartRate: number | null;
  spo2: number | null;
  aqi: number | null;
  soundLevel: number | null;
  motionDetected: boolean | null;
  output1State: boolean;
  output2State: boolean;
  output3State: boolean;
  output4State: boolean;
  output5State: boolean;
  output6State: boolean;
}

interface MQTTContextType {
  isConnected: boolean;
  sensorData: SensorData;
  sendCommand: (topic: string, value: string) => void;
}

const MQTTContext = createContext<MQTTContextType | undefined>(undefined);

const BROKER_HOST = 'broker.hivemq.com';
const BROKER_PORT = 8884;
const CLIENT_ID = `smart-home-ui-${Math.random().toString(16).substr(2, 8)}`;

const TOPICS_TO_SUBSCRIBE = [
  '/data/159753/esp32_2/temperature',
  '/data/159753/esp32_2/humidity',
  '/data/159753/esp32_2/heart_rate',
  '/data/159753/esp32_2/spo2',
  '/data/159753/esp32_2/aqi',
  '/data/159753/esp32_2/sound_level',
  '/data/159753/esp32_2/motion_detect',
  // Assuming state topics for outputs, will act as source of truth if they exist
  '/data/159753/esp32_2/output1_state',
  '/data/159753/esp32_2/output2_state',
  '/data/159753/esp32_2/output3_state',
  '/data/159753/esp32_2/output4_state',
  '/data/159753/esp32_2/output5_state',
  '/data/159753/esp32_2/output6_state',
];

export const MQTTProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 24, humidity: 55, heartRate: 72, spo2: 98, aqi: 45,
    soundLevel: 32, motionDetected: false,
    output1State: true, output2State: true, output3State: true,
    output4State: true, output5State: false, output6State: false,
  });

  useEffect(() => {
    if (typeof Paho === 'undefined' || typeof Paho.Client === 'undefined') {
      console.error("Paho MQTT client is not available.");
      return;
    }
    
    const mqttClient = new Paho.Client(BROKER_HOST, BROKER_PORT, CLIENT_ID);
    
    mqttClient.onConnectionLost = (responseObject: any) => {
      if (responseObject.errorCode !== 0) {
        console.error('onConnectionLost:', responseObject.errorMessage);
        setIsConnected(false);
      }
    };

    mqttClient.onMessageArrived = (message: any) => {
      const topic = message.destinationName;
      const payload = message.payloadString;
      
      setSensorData(prevData => {
        const newData = { ...prevData };
        const topicParts = topic.split('/');
        const key = topicParts[topicParts.length - 1];

        switch (key) {
          case 'temperature': newData.temperature = parseFloat(payload); break;
          case 'humidity': newData.humidity = parseFloat(payload); break;
          case 'heart_rate': newData.heartRate = parseInt(payload, 10); break;
          case 'spo2': newData.spo2 = parseInt(payload, 10); break;
          case 'aqi': newData.aqi = parseInt(payload, 10); break;
          case 'sound_level': newData.soundLevel = parseInt(payload, 10); break;
          case 'motion_detect': newData.motionDetected = payload === '1'; break;
          case 'output1_state': newData.output1State = payload === '1'; break;
          case 'output2_state': newData.output2State = payload === '1'; break;
          case 'output3_state': newData.output3State = payload === '1'; break;
          case 'output4_state': newData.output4State = payload === '1'; break;
          case 'output5_state': newData.output5State = payload === '1'; break;
          case 'output6_state': newData.output6State = payload === '1'; break;
        }
        return newData;
      });
    };

    const onConnect = () => {
      console.log('Connected to MQTT Broker!');
      setIsConnected(true);
      TOPICS_TO_SUBSCRIBE.forEach(topic => {
        mqttClient.subscribe(topic);
      });
    };

    try {
        mqttClient.connect({
          onSuccess: onConnect,
          useSSL: true,
          onFailure: (err: any) => {
            console.error('MQTT Connection failed:', err.errorMessage);
          }
        });
    } catch (error) {
        console.error("Error initiating MQTT connection:", error);
    }


    setClient(mqttClient);

    return () => {
      if (mqttClient && mqttClient.isConnected()) {
        mqttClient.disconnect();
        setIsConnected(false);
      }
    };
  }, []);

  const sendCommand = (topic: string, value: string) => {
    if (client && client.isConnected()) {
      const message = new Paho.Message(value);
      message.destinationName = topic;
      client.send(message);

       // Optimistic UI update for outputs
       // Example topic: /cmd/159753/esp32_2/output1
       const topicParts = topic.split('/');
       if (topicParts.length > 2 && topicParts[1] === 'cmd') {
           const command = topicParts[topicParts.length - 1]; // e.g., 'output1'
           if (command.startsWith('output')) {
               const stateKey = `${command}State` as keyof SensorData;
               setSensorData(prevData => {
                   if (Object.prototype.hasOwnProperty.call(prevData, stateKey)) {
                       return { ...prevData, [stateKey]: value === '1' };
                   }
                   return prevData;
               });
           }
       }

    } else {
      console.error('MQTT client not connected. Cannot send command.');
    }
  };

  return (
    <MQTTContext.Provider value={{ isConnected, sensorData, sendCommand }}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMQTT = () => {
  const context = useContext(MQTTContext);
  if (!context) {
    throw new Error('useMQTT must be used within a MQTTProvider');
  }
  return context;
};
