import { POLL_MS } from "./config.js";
import { fetchISS, fetchLand } from "./api.js";
import { state, addPosition } from "./state.js";
import { setStatus, showStats } from "./ui.js";
import { resizeMap, drawMap } from "./map/canvas.js";

async function updatePosition() {
  try {
    const iss = await fetchISS();
    addPosition(iss.latitude, iss.longitude);
    showStats(iss);
    setStatus(`Live, updated ${new Date().toLocaleTimeString()}`, "live");
    drawMap();
  } catch (err) {
    setStatus(`Can't reach the tracking API (${err.message}). Retrying in ${POLL_MS / 1000}s`, "error");
  }
}

async function poll() {
  await updatePosition();
  setTimeout(poll, POLL_MS);
}

async function loadLand() {
  try {
    state.land = await fetchLand();
    drawMap();
  } catch {
    state.land = null;
  }
}

window.addEventListener("resize", resizeMap);
resizeMap();
loadLand();
poll();