`default_nettype none


module top
#(
    parameter DELAY_FRAMES = 234 // 27,000,000 (27Mhz) / 115200 Baud rate
     // 16 times DELAY_FRAMES is 16 * 234 = 3744
)
(
    input wire clk,
    
    input uart_rx,
    output uart_tx,
    output wire [5:0] led,
    input btn1,
    input [7:0] adcIn // msb is adcIn[7] and lsb is adcIn[0]
);
    localparam UART_INTERVAL_SEND = 27000000/10; // 1 second
    // tx
    reg [7:0] dataOut = 'h11;
    reg [3:0] txState = 0;
    reg sendOnLow = 1;
    
    uart u(
        .clk(clk),
        .uart_rx(uart_rx),
        .uart_tx(uart_tx),
        .led(led), 
        .dataOut(dataOut),
        .sendOnLow(sendOnLow)
    );
    

    

    reg [31:0] txIntervalCounter = 0;

    always @(posedge clk) begin
    if (txIntervalCounter == UART_INTERVAL_SEND) begin
        txIntervalCounter <= 0;
        sendOnLow <= 0;
        dataOut <= adcIn;
    end else begin
        txIntervalCounter <= txIntervalCounter + 1;
        sendOnLow <= 1;
    end
end
    




endmodule