import React, { useEffect } from 'react';

const DataFetcher = () => {
  useEffect(() => {
    const connectSerial = async () => {
      try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115384 }); // 115200 115384 but this is way closer to the actual baud rate 27 000 000 / 234 = 115384.615..

        const reader = port.readable.getReader();
        while (true) {
          
          const { value, done } = await reader.read();
          if (done) {
            console.log("Done");
            break;
          }
          const data = value;
          
          window.dispatchEvent(new CustomEvent('serialData', { detail: data }));
          
        }
      } catch (error) {
        console.error('Error connecting to serial port:', error);
      }
    };

    connectSerial();
  }, []);

  return null;
};

export default DataFetcher;