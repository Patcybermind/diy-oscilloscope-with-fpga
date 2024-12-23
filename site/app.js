const connectButton = document.getElementById('connect');
const pauseButton = document.getElementById('pause');
const chartCanvas = document.getElementById('chart'); // Define chartCanvas here
let chart;
const maxDataPoints = 1000; // Change this value to the desired number of data points
let paused = false;

pauseButton.addEventListener('click', () => {
    paused = !paused;
    pauseButton.textContent = paused ? 'Resume' : 'Pause';
});

connectButton.addEventListener('click', async () => {
    try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });

        const reader = port.readable.getReader();
        const data = [];
        console.log('Connected to serial port:', port);

        while (port.readable) {
            const { value, done } = await reader.read();
            if (done) {
                reader.releaseLock();
                break;
            }
            if (value && !paused) {
                for (let byte of value) {
                    if (data.length >= maxDataPoints) {
                        data.shift(); // Remove the oldest data point
                    }
                    const intValue = byte;
                    if (intValue >= 0 && intValue <= 255) { // Validate the parsed value
                        const normalizedValue = (intValue / 255) * 1.024 - 0.512; // Normalize to -0.512 to 0.512
                        data.push(normalizedValue);
                        //console.log('Normalized value:', normalizedValue);
                        updateChart(data);
                    } else {
                        console.warn('Received invalid data:', intValue);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function updateChart(data) {
    if (!chart) {
        chart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: Array.from({ length: data.length }, (_, i) => i),
                datasets: [{
                    label: 'Serial Data',
                    data: data,
                    borderColor: 'rgba(75,192,192,1)',
                    fill: false,
                }],
            },
            options: {
                animation: false,
                scales: {
                    y: {
                        min: -0.512,
                        max: 0.512,
                    },
                },
                plugins: {
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true, // Enable zooming with the mouse wheel
                            },
                            pinch: {
                                enabled: true, // Enable zooming with pinch gestures
                            },
                            mode: 'xy', // Allow zooming on both axes
                        },
                        pan: {
                            enabled: true,
                            mode: 'xy', // Allow panning on both axes
                        },
                    },
                },
            },
        });
    } else {
        chart.data.labels = Array.from({ length: data.length }, (_, i) => i);
        chart.data.datasets[0].data = data;
        chart.update();
    }
}