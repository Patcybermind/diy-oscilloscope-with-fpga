const {SerialPort} = require('serialport');

const tangnano = new SerialPort({
    //path: '/dev/tty.usbserial-2101',
    path: 'COM10',
    baudRate: 115200,
});

// Add an event listener for the 'data' event
tangnano.on('data', (data) => {
    const hexData = data.toString('hex');
    console.log('Data received:', hexData);
});