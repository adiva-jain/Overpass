import { COLORS } from "../config.js";

export function drawLand(ctx, view, land) {
  if (!land) return;

  ctx.fillStyle = COLORS.land;
  ctx.beginPath();

  for (const feature of land.features) {
    const { type, coordinates } = feature.geometry;
    const polygons = type === "Polygon" ? [coordinates] : coordinates;

    for (const polygon of polygons) {
      for (const ring of polygon) {
        ring.forEach(([lon, lat], i) => {
          const { x, y } = view.toScreen(lat, lon);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
      }
    }
  }

  ctx.fill("evenodd");
}