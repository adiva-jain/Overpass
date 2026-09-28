import { COLORS } from "../config.js";

export function drawMarker(ctx, view, position) {
  if (!position) return;
  const { x, y } = view.toScreen(position.lat, position.lon);

  ctx.fillStyle = COLORS.issGlow;
  ctx.beginPath();
  ctx.arc(x, y, 16, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = COLORS.iss;
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();
}