# My React App

This project is a React application that receives bytes encoded in hexadecimal format over serial ports and visualizes them as a custom waveform graph, similar to an oscilloscope.

## Project Structure

```
my-react-app
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── Graph.js
│   │   └── SerialPortReader.js
│   ├── App.js
│   ├── index.js
│   └── styles
│       └── App.css
├── package.json
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd my-react-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```
2. Open your browser and go to `http://localhost:3000` to view the application.

## Components

- **Graph**: Renders a custom waveform graph based on the received hexadecimal data.
- **SerialPortReader**: Handles serial port communication and converts hexadecimal bytes to data for the Graph component.

## License

This project is licensed under the MIT License.