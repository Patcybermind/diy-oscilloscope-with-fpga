`default_nettype none


module top
(
    input wire clk,
    
    input uart_rx,
    output uart_tx,
    output reg [5:0] led,
    input btn1,
    input adcIn[7:0] // msb is adcIn[7] and lsb is adcIn[0]
);
    uart u(
        .clk(clk),
        .uart_rx(uart_rx),
        .uart_tx(uart_tx),
        .led(led), // keep in mind i changed this to be inverted
        .btn1(btn1)
    );
    



endmodule