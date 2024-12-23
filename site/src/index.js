import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DataFetcher from './components/DataFetcher';
import Viewer from './components/Viewer';

function Site() {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected(true);
  };

  return (
    <div>
      <App />
      {!connected && <button onClick={handleConnect}>Connect to Serial Port</button>}
      {connected && (
        <>
          <DataFetcher />
          <Viewer />
        </>
      )}
    </div>
  );
}

ReactDOM.render(<Site />, document.getElementById('root'));