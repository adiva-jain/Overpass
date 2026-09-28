import { COLORS } from "../config.js";

export function drawGrid(ctx, view) {
  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (let lon = -180; lon <= 180; lon += 30) {
    const { x } = view.toScreen(0, lon);
    ctx.moveTo(x, 0);
    ctx.lineTo(x, view.height);
  }

  for (let lat = -90; lat <= 90; lat += 30) {
    const { y } = view.toScreen(lat, 0);
    ctx.moveTo(0, y);
    ctx.lineTo(view.width, y);
  }

  ctx.stroke();
}