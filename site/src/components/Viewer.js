import React, { useEffect, useRef } from 'react';
import DataFetcher from './DataFetcher';

const Viewer = ({ data, width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Set the waveform style
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    // Draw the waveform
    ctx.beginPath();
    const step = width / data.length;
    for (let i = 0; i < data.length; i++) {
      const x = i * step;
      const y = (1 - data[i]) * height;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }, [data, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
};

export default Viewer;
const DataFetcher = require('./DataFetcher');

const dataFetcher = new DataFetcher('COM10'); // Replace 'COM3' with your serial port

dataFetcher.on('data', (dataArray) => {
  console.log('Received data array:', dataArray);
  // Process the data array as needed
});