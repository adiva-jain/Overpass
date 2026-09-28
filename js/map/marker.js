import { COLORS } from "../config.js";

export function drawMarker(ctx, view, position) {
  if (!position) return;
  const { x, y } = view.toScreen(position.lat, position.lon);

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.issGlow;
  ctx.shadowColor = COLORS.issGlow;
  ctx.shadowBlur = 26;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, 11, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.iss;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x - 18, y);
  ctx.lineTo(x + 18, y);
  ctx.moveTo(x, y - 18);
  ctx.lineTo(x, y + 18);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2);
  ctx.fillStyle = "#fffaf2";
  ctx.fill();
  ctx.restore();
}