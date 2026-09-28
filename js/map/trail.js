export function drawTrail(ctx, view, trail) {
  ctx.lineWidth = 2;
  ctx.lineCap = "round";

  for (let i = 1; i < trail.length; i++) {
    const prev = trail[i - 1];
    const curr = trail[i];
    if (Math.abs(curr.lon - prev.lon) > 180) continue;

    const a = view.toScreen(prev.lat, prev.lon);
    const b = view.toScreen(curr.lat, curr.lon);

    ctx.strokeStyle = `rgba(255, 209, 102, ${i / trail.length})`;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
}