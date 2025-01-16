// Configuració bàsica de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Carregar la textura
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg'); // URL de la textura

// Crear una esfera
let sphere;
function createSphere(radius) {
    if (sphere) {
        scene.remove(sphere);
    }
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

// Posicionar la càmera
camera.position.z = 5;

// Funció d'animació
function animate() {
    requestAnimationFrame(animate);
    if (sphere) {
        sphere.rotation.y += 0.01; // Rotació sobre l'eix Y
    }
    renderer.render(scene, camera);
}
animate();

// Ajustar la mida del renderer quan la finestra canvia de mida
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Gestionar el formulari
document.getElementById('radiusForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const radius = parseFloat(document.getElementById('radius').value);
    if (isNaN(radius) || radius <= 0) {
        alert('Si us plau, introdueix un radi vàlid.');
        return;
    }
    createSphere(radius/100);
});
