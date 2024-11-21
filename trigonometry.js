const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const offset = {
  x: canvas.clientWidth / 2,
  y: canvas.clientHeight / 2,
};

const A = { x: 0, y: 0 };
const B = { x: 90, y: 120 };
const C = { x: B.x, y: 0 };

ctx.translate(offset.x, offset.y);
update();
document.onmousemove = (event) => {
  B.x = event.x - offset.x;
  B.y = event.y - offset.y;
  C.x = B.x;

  update();
};

function update() {
    const c = distance(A, B)
    const a = distance(B, C)
    const b = distance(A, C)
  ctx.clearRect(-offset.x, -offset.y, canvas.clientWidth, canvas.clientHeight);

  drawCoordinateSystem(ctx, offset);

  drawLine(A, B);
  drawText("c:" + Math.round(c), average(A, B), "black")
  drawLine(A, C);
  drawText("b:" + Math.round(b), average(A, C), "black")
  drawLine(B, C);
  drawText("a:" + Math.round(a), average(B, C), "black")
}

function drawCoordinateSystem(ctx, offset) {
  ctx.beginPath();
  ctx.moveTo(-offset.x, 0);
  ctx.lineTo(ctx.canvas.clientWidth - offset.x, 0);
  ctx.moveTo(0, -offset.y);
  ctx.lineTo(0, ctx.canvas.clientHeight - offset.y);
  ctx.setLineDash([4, 2]);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "gray";
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawPoint(loc, size = 10, color = "black") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(loc.x, loc.y, size, 0, Math.PI * 2);
  ctx.fill();
}

function drawLine(p1, p2, color="black") {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = "2";
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke()
}

function average(p1, p2) {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
    }
}

function distance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

function drawText(text, loc, color = "white") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 13px Courier";
  ctx.fillText(text, loc.x, loc.y);
}
