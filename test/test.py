import serial
import time

def count_bytes_per_second(port):
    ser = serial.Serial(port, 115200, timeout=1) # Open the serial port 115384 is the baud rate
    count = 0
    start_time = time.time()
    read_count = 0

    while True:
        if ser.in_waiting > 0:
            data = ser.read()
            count += 1
            read_count += 1

            if read_count % 10 == 0:
                print(f"Data read: {data.hex()}")

        if time.time() - start_time >= 1:
            print(f"Bytes received in the last second: {count}")
            count = 0
            start_time = time.time()

if __name__ == "__main__":
    count_bytes_per_second('COM10')