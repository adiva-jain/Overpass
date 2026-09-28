import { COLORS } from "../config.js";
import { project } from "../projection.js";
import { state } from "../state.js";
import { drawGrid } from "./grid.js";
import { drawLand } from "./land.js";
import { drawTrail } from "./trail.js";
import { drawMarker } from "./marker.js";

const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");

const view = {
  width: 0,
  height: 0,
  toScreen(lat, lon) {
    return project(lat, lon, this.width, this.height);
  },
};

export function resizeMap() {
  const dpr = window.devicePixelRatio || 1;
  view.width = canvas.clientWidth;
  view.height = canvas.clientHeight;
  canvas.width = view.width * dpr;
  canvas.height = view.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawMap();
}

export function drawMap() {
  ctx.fillStyle = COLORS.ocean;
  ctx.fillRect(0, 0, view.width, view.height);

  drawGrid(ctx, view);
  drawLand(ctx, view, state.land);
  drawTrail(ctx, view, state.trail);
  drawMarker(ctx, view, state.trail.at(-1));
}