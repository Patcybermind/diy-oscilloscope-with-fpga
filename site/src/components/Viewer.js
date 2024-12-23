import React, { useEffect, useRef, useState } from 'react';

const Viewer = () => {
  const canvasRef = useRef(null);
  const dataRef = useRef([]);
  const [valuesPerSecond, setValuesPerSecond] = useState(0);
  const valuesCountRef = useRef(0);
  const animationFrameRef = useRef(null);

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
      valuesCountRef.current += 1;
      if (dataRef.current.length > canvas.width) {
        dataRef.current.shift();
      }
    };

    const updateCanvas = () => {
      drawWaveform();
      animationFrameRef.current = requestAnimationFrame(updateCanvas);
    };

    window.addEventListener('serialData', handleSerialData);
    animationFrameRef.current = requestAnimationFrame(updateCanvas);

    const intervalId = setInterval(() => {
      setValuesPerSecond(valuesCountRef.current);
      valuesCountRef.current = 0;
    }, 1000);

    return () => {
      window.removeEventListener('serialData', handleSerialData);
      clearInterval(intervalId);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={400}></canvas>
      <div>Values per second: {valuesPerSecond}</div>
    </div>
  );
};

export default Viewer;