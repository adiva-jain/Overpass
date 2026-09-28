const statusEl = document.getElementById("status");

export function setStatus(text, kind) {
  statusEl.textContent = text;
  statusEl.className = kind;
}

export function showStats(iss) {
  const ns = iss.latitude >= 0 ? "N" : "S";
  const ew = iss.longitude >= 0 ? "E" : "W";

  document.getElementById("lat").textContent = `${Math.abs(iss.latitude).toFixed(2)}° ${ns}`;
  document.getElementById("lon").textContent = `${Math.abs(iss.longitude).toFixed(2)}° ${ew}`;
  document.getElementById("alt").textContent = `${iss.altitude.toFixed(0)} km`;
  document.getElementById("vel").textContent = `${Math.round(iss.velocity).toLocaleString()} km/h`;
  document.getElementById("vis").textContent = iss.visibility === "daylight" ? "Daylight" : "Earth's shadow";
}