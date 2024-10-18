// Load the ring model
const loader = new THREE.GLTFLoader();
loader.load(
    'models/ring/your-ring-model.glb', // Updated to .glb file
    function (gltf) {
        const ring = gltf.scene;
        scene.add(ring);

        // Center the ring
        const box = new THREE.Box3().setFromObject(ring);
        const center = box.getCenter(new THREE.Vector3());
        ring.position.sub(center);

        // Scale the ring if needed
        const scale = 8; // Adjust this value to scale the ring
        ring.scale.set(scale, scale, scale);

        // Position camera
        camera.position.z = 5; // Adjust as needed
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error happened', error);
    }
);