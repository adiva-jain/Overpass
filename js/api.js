import { ISS_URL, LAND_URL } from "./config.js";

async function getJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export function fetchISS() {
    return getJSON(ISS_URL);
}

export function fetchLand() {
    return getJSON(LAND_URL);
}