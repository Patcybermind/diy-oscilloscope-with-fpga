import React, { useEffect, useRef } from 'react';

const Viewer = () => {
  const canvasRef = useRef(null);
  const dataRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawWaveform = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      dataRef.current.forEach((value, index) => {
        const x = (index / dataRef.current.length) * canvas.width;
        const y = (1 - value / 255) * canvas.height;
        ctx.lineTo(x, y);
      });

      ctx.strokeStyle = 'rgba(75, 192, 192, 1)';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const handleSerialData = (event) => {
      const data = event.detail;
      dataRef.current.push(data);
      if (dataRef.current.length > canvas.width) {
        dataRef.current.shift();
      }
      drawWaveform();
    };

    window.addEventListener('serialData', handleSerialData);

    return () => {
      window.removeEventListener('serialData', handleSerialData);
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={400}></canvas>;
};

export default Viewer;