import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Set up camera
const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 13;

const scene = new THREE.Scene();
let hood;
const loader = new GLTFLoader();
loader.load(
  "/hood.glb",
  function (gltf) {
    hood = gltf.scene;
    hood.position.y = -2.5; // Initial position of the model
    hood.rotation.y = 1.5;
    hood.scale.set(2, 2, 2); // Scale the model (increase size)
    scene.add(hood);
  },
  function (xhr) {
    // Optional: handle loading progress here
  },
  function (error) {
    console.error("An error occurred while loading the model:", error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.PointLight(0xffffff, 1.5);
topLight.position.set(500, 500, 500);
scene.add(topLight);

// Variables for rotation
let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0,
};

// Mouse drag event listener for left and right rotation
document.addEventListener("mousedown", function (e) {
  isDragging = true;
});
document.addEventListener("mouseup", function (e) {
  isDragging = false;
});
document.addEventListener("mousemove", function (e) {
  if (isDragging && hood) {
    const deltaX = e.clientX - previousMousePosition.x;
    hood.rotation.y += deltaX * 0.005; // Adjust speed as necessary
  }
  previousMousePosition = {
    x: e.clientX,
    y: e.clientY,
  };
});

// ** Touch interaction for mobile devices **
let previousTouchPosition = {
  x: 0,
  y: 0,
};

document.addEventListener("touchstart", function (e) {
  if (e.touches.length === 1) {
    isDragging = true;
    previousTouchPosition.x = e.touches[0].clientX;
    previousTouchPosition.y = e.touches[0].clientY;
  }
});

document.addEventListener("touchend", function () {
  isDragging = false;
});

document.addEventListener("touchmove", function (e) {
  if (isDragging && hood && e.touches.length === 1) {
    const deltaX = e.touches[0].clientX - previousTouchPosition.x;
    hood.rotation.y += deltaX * 0.005; // Adjust rotation speed for touch
    previousTouchPosition.x = e.touches[0].clientX;
  }
});

// Scroll event listener to move the model when scrolling
window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  if (hood) {
    const newYPosition = -2.5 + scrollY * 0.01;
    hood.position.y = Math.max(-2.5, Math.min(newYPosition, 0)); // Y position range: [-2.5, 0]
  }
});

// Handle window resize to keep the model responsive
window.addEventListener("resize", function () {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Update renderer and camera on resize
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix(); // Apply changes to the camera
});

// Re-render function
const reRender3D = () => {
  requestAnimationFrame(reRender3D);
  renderer.render(scene, camera);
};
reRender3D();
