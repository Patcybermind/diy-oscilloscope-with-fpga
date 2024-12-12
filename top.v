`default_nettype none


module top
(
    input wire clk,
    
    input uart_rx,
    output uart_tx,
    output reg [5:0] led,
    input btn1
);
    uart u(
        .clk(clk),
        .uart_rx(uart_rx),
        .uart_tx(uart_tx),
        .led(led), // keep in mind i changed this to be inverted
        .btn1(btn1)
    );
    reg testovar;
reg [3:0] counter;

always @(posedge clk) begin
    counter <= counter + 1;
    if (counter == 4'd15) begin
        testovar <= ~testovar;
        counter <= 4'd0;
    end
end



endmodule