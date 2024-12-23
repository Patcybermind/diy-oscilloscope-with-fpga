import React from 'react';
import Viewer from './components/Viewer';

const App = () => {
  const waveformData = [0.1, 0.5, 0.9, 0.5, 0.1]; // Example data

  return (
    <div>
      <h1>Waveform Viewer</h1>
      <Viewer data={waveformData} width={500} height={200} />
    </div>
  );
};

export default App;