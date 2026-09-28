import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { POLL_MS } from "./config.js";
import { fetchISS, fetchLand } from "./api.js";
import { state, addPosition } from "./state.js";
import { setStatus, showStats } from "./ui.js";
import { resizeMap, drawMap } from "./map/canvas.js";

function initBackgroundScene() {
  const mount = document.getElementById("bg-scene");
  if (!mount) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, mount.clientWidth / mount.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffdff1, 1.8);
  scene.add(ambient);

  const pointLight = new THREE.PointLight(0xc4b5fd, 2.2, 100);
  pointLight.position.set(4, 2, 6);
  scene.add(pointLight);

  const moonLight = new THREE.PointLight(0xffc0d8, 1.6, 80);
  moonLight.position.set(-5, -2, 4);
  scene.add(moonLight);

  const group = new THREE.Group();
  const orbMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf8b4d9,
    emissive: 0xf472b6,
    emissiveIntensity: 0.75,
    transparent: true,
    opacity: 0.42,
    roughness: 0.25,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.3,
  });

  const orbs = [
    { radius: 1.2, x: -2.8, y: 1.4, z: -1.5 },
    { radius: 0.9, x: 2.2, y: 1.8, z: -2.5 },
    { radius: 1.5, x: 1.4, y: -1.8, z: -3.1 },
    { radius: 0.8, x: -1.1, y: -2.1, z: -1.2 },
    { radius: 1.1, x: 3.4, y: -0.3, z: -2.1 },
  ];

  orbs.forEach(({ radius, x, y, z }) => {
    const orb = new THREE.Mesh(new THREE.SphereGeometry(radius, 42, 42), orbMaterial.clone());
    orb.position.set(x, y, z);
    group.add(orb);
  });

  scene.add(group);

  const resize = () => {
    const { clientWidth, clientHeight } = mount;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    group.rotation.x += 0.0022;
    group.rotation.y += 0.0035;
    group.rotation.z += 0.0015;
    renderer.render(scene, camera);
  };

  resize();
  animate();
  window.addEventListener("resize", resize);
}

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
initBackgroundScene();
resizeMap();
loadLand();
poll();