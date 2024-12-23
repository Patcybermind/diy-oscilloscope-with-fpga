import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the App component

function Site() {
 
  return (
    <div>
    <App />
    </div>
  );
}

ReactDOM.render(<Site />, document.getElementById('root'));