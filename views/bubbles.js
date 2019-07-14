function drawBubble(ctx, x, y, w, h, radius) {
  var r = x + w;
  var b = y + h;
  ctx.beginPath();
  ctx.strokeStyle="black";
  ctx.lineWidth="2";    y = y - h;
  ctx.moveTo(x+radius, y);
  ctx.lineTo(r-radius, y);
  ctx.quadraticCurveTo(r, y, r, y+radius);
  ctx.lineTo(r, y+h-radius);
  ctx.quadraticCurveTo(r, b, r-radius, b);
  ctx.lineTo(r+20, b+40);
  ctx.lineTo(r-50, b);
  ctx.lineTo(x+radius, b);
  ctx.quadraticCurveTo(x, b, x, b-radius);
  ctx.lineTo(x, y+radius);
  ctx.quadraticCurveTo(x, y, x+radius, y);
  ctx.stroke();
}
