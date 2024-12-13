`default_nettype none


module top
#(
    parameter DELAY_FRAMES = 234, // 27,000,000 (27Mhz) / 115200 Baud rate
    parameter ADC_DELAY_FRAMES = 50000 // 16 times DELAY_FRAMES
)
(
    input wire clk,
    
    input uart_rx,
    output uart_tx,
    output wire [5:0] led,
    input btn1,
    input [7:0] adcIn // msb is adcIn[7] and lsb is adcIn[0]
);
    // tx
    reg [7:0] dataOut;
    reg [3:0] txState = 0;
    reg readyToTransmit = 0;
    
    uart u(
        .clk(clk),
        .uart_rx(uart_rx),
        .uart_tx(uart_tx),
        .led(led), // keep in mind i changed this to be inverted
        //.btn1(btn1),
        .dataOut(dataOut),
        .readyToTransmit(readyToTransmit)
        //.txState(txState)
    );

    reg [31:0] adcTransmitCounter = 0;

    always @(posedge clk) begin
        if (adcTransmitCounter == ADC_DELAY_FRAMES) begin
            adcTransmitCounter <= 0;
            readyToTransmit <= 1;
            dataOut <= adcIn;
        end else if (adcTransmitCounter == 1) begin
            readyToTransmit <= 0;
            adcTransmitCounter <= adcTransmitCounter + 1;
        end else begin
            adcTransmitCounter <= adcTransmitCounter + 1;
        end
    end
    




endmodule