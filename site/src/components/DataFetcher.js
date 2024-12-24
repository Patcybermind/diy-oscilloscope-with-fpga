import React, { useEffect, useState } from 'react';

const DataFetcher = () => {
  const [count, setCount] = useState(0);
  const [valuesPerSecond, setValuesPerSecond] = useState(0);

  useEffect(() => {
    const connectSerial = async () => {
      try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115384 }); // 115200 115384 but this is way closer to the actual baud rate 27 000 000 / 234 = 115384.615..

        const reader = port.readable.getReader();
        let valueCount = 0;
        
        const interval = setInterval(() => {
          setValuesPerSecond(valueCount);
          valueCount = 0;
        }, 1000);

        while (true) {
          
          const { value, done } = await reader.read();
          if (done) {
            console.log("Done");
            clearInterval(interval);
            break;
          }
          valueCount++;
          const data = value;
          if (valueCount < 10) {
            console.log("value :",value); // so it doesnt log all the time
          }
          
          
          window.dispatchEvent(new CustomEvent('serialData', { detail: data }));
          
        }
      } catch (error) {
        console.error('Error connecting to serial port:', error);
      }
    };

    connectSerial();
  }, []);

  return (
    <div>
      <p>Values per second at fetcher: {valuesPerSecond}</p>
    </div>
  );
};

export default DataFetcher;