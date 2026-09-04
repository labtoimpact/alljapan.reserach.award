document.addEventListener('DOMContentLoaded', () => {
// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
menuToggle.addEventListener('click', () => {
nav.classList.toggle('active');
menuToggle.classList.toggle('active');
});

// Close menu when clicking nav links
document.querySelectorAll('.nav-list a').forEach(link => {
link.addEventListener('click', () => {
nav.classList.remove('active');
menuToggle.classList.remove('active');
});
});
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
const question = item.querySelector('.faq-question');
question.addEventListener('click', () => {
// Close other items
faqItems.forEach(other => {
if (other !== item) {
other.classList.remove('active');
}
});
// Toggle current item
item.classList.toggle('active');
});
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
const targetId = this.getAttribute('href');
if (targetId === '#') return;
const targetElement = document.querySelector(targetId);
if (targetElement) {
e.preventDefault();
const headerHeight = document.getElementById('header').offsetHeight;
const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
window.scrollTo({
top: targetPosition,
behavior: 'smooth'
});
}
});
});
});
// ===== ページ全体をぬるっと表示 =====

const elements = document.querySelectorAll(
'section h2, section h3, section p, section .card, section .btn, section li, section table, section img'
);

elements.forEach((element) => {
element.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add('show');
revealObserver.unobserve(entry.target);
}
});
}, {
threshold: 0.12
});

document.querySelectorAll('.reveal').forEach((element) => {
revealObserver.observe(element);
});
/* =========================================
3D MOLECULE ANIMATION
========================================= */

window.addEventListener("load", () => {

const container = document.getElementById("molecule-container");

if (!container || typeof THREE === "undefined") {
return;
}

// -------------------------
// Scene
// -------------------------

const scene = new THREE.Scene();


// -------------------------
// Camera
// -------------------------

const camera = new THREE.PerspectiveCamera(
45,
container.clientWidth / container.clientHeight,
0.1,
100
);

camera.position.set(0, 0, 8);


// -------------------------
// Renderer
// -------------------------

const renderer = new THREE.WebGLRenderer({
alpha: true,
antialias: true
});

renderer.setPixelRatio(
Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
container.clientWidth,
container.clientHeight
);

container.appendChild(renderer.domElement);


// -------------------------
// Light
// -------------------------

const ambientLight = new THREE.AmbientLight(
0xffffff,
1.5
);

scene.add(ambientLight);


const pointLight = new THREE.PointLight(
0x00d2ff,
4,
20
);

pointLight.position.set(3, 4, 5);

scene.add(pointLight);


// -------------------------
// Molecule Group
// -------------------------

const molecule = new THREE.Group();

scene.add(molecule);


// -------------------------
// Atom
// -------------------------

// 光が呼吸するように変化
molecule.children.forEach((object, index) => {
if (object.material &&
object.material.transparent) {
const pulse =
1 +
Math.sin(time * 1.2 + index) * 0.04;
object.scale.set(
pulse,
pulse,
pulse
);
}
});

// マウスに少し反応
molecule.rotation.y +=
mouseX * 0.25;

molecule.rotation.x +=
mouseY * 0.15;


// 粒子もゆっくり動く
particles.rotation.y =
time * 0.025;

particles.rotation.x =
Math.sin(time * 0.15) * 0.05;


renderer.render(
scene,
camera
);

}


animate();


// -------------------------
// Resize
// -------------------------

window.addEventListener(
"resize",
() => {

const width =
container.clientWidth;

const height =
container.clientHeight;


camera.aspect =
width / height;

camera.updateProjectionMatrix();


renderer.setSize(
width,
height
);

}
);

});

// -------------------------
// Bond
// -------------------------

function createBond(atom1, atom2) {

const start = new THREE.Vector3(
atom1.x,
atom1.y,
atom1.z
);

const end = new THREE.Vector3(
atom2.x,
atom2.y,
atom2.z
);

const direction = new THREE.Vector3()
.subVectors(end, start);

const length = direction.length();

const geometry = new THREE.CylinderGeometry(
0.045,
0.045,
length,
16
);

const material = new THREE.MeshBasicMaterial({
color: 0x00d2ff,
transparent: true,
opacity: 0.75
});

const bond = new THREE.Mesh(
geometry,
material
);

const midpoint = new THREE.Vector3()
.addVectors(start, end)
.multiplyScalar(0.5);

bond.position.copy(midpoint);

bond.quaternion.setFromUnitVectors(
new THREE.Vector3(0, 1, 0),
direction.normalize()
);

molecule.add(bond);
}


// -------------------------
// Create Molecule
// -------------------------

const atoms = [
{
x: 0,
y: 0,
z: 0,
size: 0.55,
color: 0x7dd3fc
},
{
x: 1.45,
y: 0.8,
z: 0.2,
size: 0.34,
color: 0x38bdf8
},
{
x: -1.4,
y: 0.7,
z: -0.1,
size: 0.34,
color: 0x60a5fa
},
{
x: 0.8,
y: -1.3,
z: 0.1,
size: 0.34,
color: 0x22d3ee
},
{
x: -0.9,
y: -1.2,
z: -0.2,
size: 0.34,
color: 0xa5f3fc
}
];

const atomObjects = atoms.map(atom => {

return createAtom(
atom.x,
atom.y,
atom.z,
atom.size,
atom.color
);

});


// -------------------------
// Connect Atoms
// -------------------------

createBond(
atoms[0],
atoms[1]
);

createBond(
atoms[0],
atoms[2]
);

createBond(
atoms[0],
atoms[3]
);

createBond(
atoms[0],
atoms[4]
);


// -------------------------
// Floating Particles
// -------------------------

const particleGeometry =
new THREE.BufferGeometry();

const particleCount = 180;

const particlePositions =
new Float32Array(
particleCount * 3
);


for (let i = 0; i < particleCount; i++) {

particlePositions[i * 3] =
(Math.random() - 0.5) * 8;

particlePositions[i * 3 + 1] =
(Math.random() - 0.5) * 6;

particlePositions[i * 3 + 2] =
(Math.random() - 0.5) * 5;

}


particleGeometry.setAttribute(
"position",
new THREE.BufferAttribute(
particlePositions,
3
)
);


const particleMaterial =
new THREE.PointsMaterial({

color: 0x00d2ff,

size: 0.035,

transparent: true,

opacity: 0.65

});


const particles =
new THREE.Points(
particleGeometry,
particleMaterial
);


scene.add(particles);


// -------------------------
// Mouse
// -------------------------

let mouseX = 0;
let mouseY = 0;

document.addEventListener(
"mousemove",
(event) => {

mouseX =
(event.clientX / window.innerWidth - 0.5);

mouseY =
(event.clientY / window.innerHeight - 0.5);

}
);


// -------------------------
// Animation
// -------------------------

const clock = new THREE.Clock();


function animate() {

requestAnimationFrame(animate);

const time = clock.getElapsedTime();


// 分子をゆっくり回転
molecule.rotation.y =
time * 0.18;

molecule.rotation.x =
Math.sin(time * 0.4) * 0.08;


// 分子全体をふわっと上下
molecule.position.y =
Math.sin(time * 0.8) * 0.18;
// 光が呼吸するように変化
molecule.children.forEach((object, index) => {
if (object.material &&
object.material.transparent) {
const pulse =
1 +
Math.sin(time * 1.2 + index) * 0.04;
object.scale.set(
pulse,
pulse,
pulse
);
}
});

// マウスに少し反応
molecule.rotation.y +=
mouseX * 0.25;

molecule.rotation.x +=
mouseY * 0.15;


// 粒子もゆっくり動く
particles.rotation.y =
time * 0.025;

particles.rotation.x =
Math.sin(time * 0.15) * 0.05;


renderer.render(
scene,
camera
);

}


animate();


// -------------------------
// Resize
// -------------------------

window.addEventListener(
"resize",
() => {

const width =
container.clientWidth;

const height =
container.clientHeight;


camera.aspect =
width / height;

camera.updateProjectionMatrix();


renderer.setSize(
width,
height
);

}
);

});
