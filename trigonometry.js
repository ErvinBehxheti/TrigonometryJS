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
  const c = distance(A, B);
  const a = distance(B, C);
  const b = distance(A, C);

  const sin = a / c;
  const cos = b / c;
  const tan = sin / cos;
  const theta = Math.asin(sin);

  ctx.clearRect(-offset.x, -offset.y, canvas.clientWidth, canvas.clientHeight);

  drawCoordinateSystem(ctx, offset);

  drawText(
    "sin = a / c = " + sin.toFixed(2),
    { x: -offset.x / 2, y: offset.y * 0.7 },
    "red"
  );
  drawText(
    "θ = " + theta.toFixed(2) + "rad " + "(" + Math.round(toDeg(theta)) + "°)",
    { x: offset.x / 2, y: offset.y * 0.7 }
  );
  drawText(
    "cos = b / c = " + cos.toFixed(2),
    { x: -offset.x / 2, y: offset.y * 0.8 },
    "blue"
  );
  drawText(
    "tan = sin / cos = " + tan.toFixed(2),
    { x: -offset.x / 2, y: offset.y * 0.9 },
    "magenta"
  );

  drawLine(A, B);
  drawText("c", average(A, B));
  drawLine(A, C, "blue");
  drawText("b", average(A, C), "blue");
  drawLine(B, C, "red");
  drawText("a", average(B, C), "red");

  drawText("θ", A);

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  const start = B.x > A.x ? 0 : Math.PI;
  const clockwise = (B.y < C.y) ^ (B.x > A.x);
  let end = B.y < C.y ? -theta : theta;
  if (B.x < A.x) {
    end = Math.PI - end;
  }
  ctx.arc(0, 0, 20, start, end, !clockwise);
  ctx.stroke();
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

function toDeg(rad) {
  return (rad * 180) / Math.PI;
}

function drawPoint(loc, size = 10, color = "black") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(loc.x, loc.y, size, 0, Math.PI * 2);
  ctx.fill();
}

function drawLine(p1, p2, color = "black") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = "2";
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function average(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function drawText(text, loc, color = "black") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 18px Courier";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 7;
  ctx.strokeText(text, loc.x, loc.y);
  ctx.fillText(text, loc.x, loc.y);
}
