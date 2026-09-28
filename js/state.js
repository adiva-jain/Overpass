import { TRAIL_LENGTH } from "./config.js";

export const state = {
  land: null,
  trail: [],
};

export function addPosition(lat, lon) {
  state.trail.push({ lat, lon });
  if (state.trail.length > TRAIL_LENGTH) state.trail.shift();
}