This is a work in progress project, it is nowhere near done and here is what i have tried so far and have been working on:

First i designed a breakout board for the ads9283brs-100 and ordered it from jlcpcb

then i wrote some verilog which is code that runs on an fpga. An fpga, or a field programable gate array is a piece of hardware that lets you reconfigure the hardware inside anytime. You can therefore change the individual logic gates which allows you to run things very fast when its a very specific task that requires high throughput. This allows me to save a parralel 8 bit input on 8 pins at 100mhz.

while this works not everyone has an fpga and the cheapest decent ones i still consider kind of expensive. 

Thats when i remembered that the raspberry pi pico has pio also known as programmable io which lets you create custom hardware interfaces eg i2c uart spi or such and in my case all i need is a parralel interface with direct access to memory (dma) i started working on this but havent gone very far. If this works this should allow for very cheap medium speed oscilloscopes.