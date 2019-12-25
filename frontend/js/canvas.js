$(document).ready(function(){
    var demoCanvas = document.getElementById("demoCanvas");
    var ctx = demoCanvas.getContext("2d");
    ctx.fillStyle = "rgb(0,0,255)";
    ctx.fillRect(30, 30, 100, 100);
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.arc(100, 100, 30, 0, 2 * Math.PI, true);
    ctx.fill();
})