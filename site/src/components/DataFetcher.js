class DataFetcher {
    constructor() {
      this.port = null;
      this.reader = null;
      this.buffer = [];
      this.eventTarget = new EventTarget();
    }
  
    async connect() {
      try {
        this.port = await navigator.serial.requestPort();
        await this.port.open({ baudRate: 9600 });
        this.reader = this.port.readable.getReader();
        this.readLoop();
      } catch (error) {
        console.error('Failed to connect to the serial port:', error);
      }
    }
  
    async readLoop() {
      while (true) {
        const { value, done } = await this.reader.read();
        if (done) {
          console.log('Stream closed');
          this.reader.releaseLock();
          break;
        }
        this.handleData(value);
      }
    }
  
    handleData(data) {
      const value = new Uint8Array(data);
      for (let i = 0; i < value.length; i++) {
        this.buffer.push(value[i]);
        if (this.buffer.length === 10) {
          const event = new CustomEvent('data', { detail: this.buffer });
          this.eventTarget.dispatchEvent(event);
          this.buffer = [];
        }
      }
    }
  
    addEventListener(type, listener) {
      this.eventTarget.addEventListener(type, listener);
    }
  
    removeEventListener(type, listener) {
      this.eventTarget.removeEventListener(type, listener);
    }
  }
  
  export default DataFetcher;