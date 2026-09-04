```javascript
/* =========================================================
   Lab to Impact - script.js
   サイト全体の動き + Hero 3D Molecule
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     Mobile Menu
     ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    // メニュー内のリンクをクリックしたら閉じる
    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });
  }


  /* =======================================================
     FAQ Accordion
     ======================================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {

      // 他のFAQを閉じる
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // クリックしたFAQを開閉
      item.classList.toggle("active");

    });

  });


  /* =======================================================
     Smooth Scroll
     ======================================================= */

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

});


/* =========================================================
   Scroll Reveal Animation
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const elements = document.querySelectorAll(
    "section h2, section h3, section p, section .card, section .btn, section li, section table, section img"
  );

  elements.forEach(element => {
    element.classList.add("reveal");
  });


  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
  });

});


/* =========================================================
   HERO
   3D MOLECULE + FLOATING LIGHT PARTICLES
   ========================================================= */

window.addEventListener("load", () => {

  // Three.jsが読み込まれていない場合は何もしない
  if (typeof THREE === "undefined") {
    console.warn("Three.js が読み込まれていません。");
    return;
  }


  const container = document.getElementById("molecule-container");

  if (!container) {
    console.warn("#molecule-container が見つかりません。");
    return;
  }


  /* =======================================================
     Scene
     ======================================================= */

  const scene = new THREE.Scene();


  /* =======================================================
     Camera
     ======================================================= */

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );

  camera.position.set(0, 0, 8);


  /* =======================================================
     Renderer
     ======================================================= */

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

  renderer.setClearColor(0x000000, 0);

  container.appendChild(renderer.domElement);


  /* =======================================================
     Lights
     ======================================================= */

  const ambientLight = new THREE.AmbientLight(
    0x7ddfff,
    1.0
  );

  scene.add(ambientLight);


  const cyanLight = new THREE.PointLight(
    0x00d2ff,
    2.5,
    12
  );

  cyanLight.position.set(2, 2, 4);

  scene.add(cyanLight);


  const blueLight = new THREE.PointLight(
    0x3a86ff,
    2.0,
    10
  );

  blueLight.position.set(-3, -1, 2);

  scene.add(blueLight);


  const softLight = new THREE.PointLight(
    0x7ee8ff,
    1.5,
    8
  );

  softLight.position.set(0, 3, -2);

  scene.add(softLight);


  /* =======================================================
     Molecule Group
     ======================================================= */

  const molecule = new THREE.Group();

  molecule.position.set(1.35, 0.15, 0);

  molecule.scale.set(
    1.15,
    1.15,
    1.15
  );

  scene.add(molecule);


  /* =======================================================
     Atom Creation
     ======================================================= */

  function createAtom(
    radius,
    color,
    emissiveColor,
    position
  ) {

    const geometry = new THREE.SphereGeometry(
      radius,
      32,
      32
    );


    const material = new THREE.MeshStandardMaterial({

      color: color,

      emissive: emissiveColor,

      emissiveIntensity: 0.7,

      roughness: 0.25,

      metalness: 0.15,

      transparent: true,

      opacity: 0.96

    });


    const atom = new THREE.Mesh(
      geometry,
      material
    );


    atom.position.copy(position);

    molecule.add(atom);

    return atom;

  }


  /* =======================================================
     Bond Creation
     ======================================================= */

  function createBond(
    start,
    end,
    radius = 0.025
  ) {

    const direction = new THREE.Vector3()
      .subVectors(end, start);

    const length = direction.length();

    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      16
    );


    const material = new THREE.MeshStandardMaterial({

      color: 0x00d2ff,

      emissive: 0x00d2ff,

      emissiveIntensity: 0.65,

      transparent: true,

      opacity: 0.72

    });


    const bond = new THREE.Mesh(
      geometry,
      material
    );


    const midpoint = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);

    bond.position.copy(midpoint);


    // Cylinderの初期方向はY軸
    bond.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );


    molecule.add(bond);

    return bond;

  }


  /* =======================================================
     Molecule Structure
     ======================================================= */

  const centerPosition = new THREE.Vector3(
    0,
    0,
    0
  );


  const atomPositions = [

    new THREE.Vector3(
      1.25,
      0.45,
      0.20
    ),

    new THREE.Vector3(
      -1.15,
      0.55,
      -0.15
    ),

    new THREE.Vector3(
      0.25,
      -1.20,
      0.35
    ),

    new THREE.Vector3(
      0.15,
      0.15,
      -1.35
    )

  ];


  /* =======================================================
     Center Atom
     ======================================================= */

  const centerAtom = createAtom(
    0.42,
    0x00d2ff,
    0x00d2ff,
    centerPosition
  );


  /* =======================================================
     Outer Atoms
     ======================================================= */

  const outerAtoms = [];


  atomPositions.forEach((position, index) => {

    const atom = createAtom(
      index % 2 === 0 ? 0.28 : 0.23,
      index % 2 === 0 ? 0x3a86ff : 0x7ee8ff,
      0x00d2ff,
      position
    );

    outerAtoms.push(atom);

    createBond(
      centerPosition,
      position,
      0.025
    );

  });


  /* =======================================================
     Extra Small Bonds
     ======================================================= */

  createBond(
    atomPositions[0],
    atomPositions[2],
    0.015
  );

  createBond(
    atomPositions[1],
    atomPositions[3],
    0.015
  );


  /* =======================================================
     Particle System
     ======================================================= */

  const particleCount = 320;

  const particlePositions = new Float32Array(
    particleCount * 3
  );

  const particleSizes = new Float32Array(
    particleCount
  );


  for (let i = 0; i < particleCount; i++) {

    const i3 = i * 3;

    particlePositions[i3] =
      (Math.random() - 0.5) * 7;

    particlePositions[i3 + 1] =
      (Math.random() - 0.5) * 5;

    particlePositions[i3 + 2] =
      (Math.random() - 0.5) * 7;


    particleSizes[i] =
      0.02 + Math.random() * 0.045;

  }


  const particleGeometry =
    new THREE.BufferGeometry();


  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      particlePositions,
      3
    )
  );


  /* =======================================================
     Particle Material
     ======================================================= */

  const particleMaterial =
    new THREE.PointsMaterial({

      color: 0x7ee8ff,

      size: 0.045,

      transparent: true,

      opacity: 0.52,

      depthWrite: false,

      blending: THREE.AdditiveBlending,

      sizeAttenuation: true

    });


  const particles = new THREE.Points(
    particleGeometry,
    particleMaterial
  );


  particles.position.set(
    0,
    0,
    -0.5
  );


  scene.add(particles);


  /* =======================================================
     Larger Soft Glow Particles
     ======================================================= */

  const glowCount = 35;

  const glowPositions = new Float32Array(
    glowCount * 3
  );


  for (let i = 0; i < glowCount; i++) {

    const i3 = i * 3;

    glowPositions[i3] =
      (Math.random() - 0.5) * 6;

    glowPositions[i3 + 1] =
      (Math.random() - 0.5) * 4.5;

    glowPositions[i3 + 2] =
      (Math.random() - 0.5) * 5;

  }


  const glowGeometry =
    new THREE.BufferGeometry();


  glowGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      glowPositions,
      3
    )
  );


  const glowMaterial =
    new THREE.PointsMaterial({

      color: 0x00d2ff,

      size: 0.13,

      transparent: true,

      opacity: 0.15,

      depthWrite: false,

      blending: THREE.AdditiveBlending,

      sizeAttenuation: true

    });


  const glowParticles = new THREE.Points(
    glowGeometry,
    glowMaterial
  );


  glowParticles.position.set(
    0,
    0,
    -1
  );


  scene.add(glowParticles);


  /* =======================================================
     Mouse Interaction
     ======================================================= */

  let mouseX = 0;
  let mouseY = 0;

  let targetMouseX = 0;
  let targetMouseY = 0;


  window.addEventListener(
    "mousemove",
    event => {

      targetMouseX =
        (event.clientX / window.innerWidth - 0.5);

      targetMouseY =
        (event.clientY / window.innerHeight - 0.5);

    }
  );


  /* =======================================================
     Resize
     ======================================================= */

  function resize() {

    const width =
      container.clientWidth;

    const height =
      container.clientHeight;


    if (width === 0 || height === 0) {
      return;
    }


    camera.aspect =
      width / height;

    camera.updateProjectionMatrix();


    renderer.setSize(
      width,
      height
    );

  }


  window.addEventListener(
    "resize",
    resize
  );


  resize();


  /* =======================================================
     Animation
     ======================================================= */

  const clock = new THREE.Clock();


  function animate() {

    requestAnimationFrame(animate);


    const elapsed =
      clock.getElapsedTime();


    /* -----------------------------------------------------
       Mouse easing
       ----------------------------------------------------- */

    mouseX +=
      (targetMouseX - mouseX) * 0.025;

    mouseY +=
      (targetMouseY - mouseY) * 0.025;


    /* -----------------------------------------------------
       Molecule floating
       ----------------------------------------------------- */

    molecule.rotation.y =
      elapsed * 0.16;

    molecule.rotation.x =
      Math.sin(elapsed * 0.45) * 0.10;


    molecule.position.y =
      0.15 +
      Math.sin(elapsed * 0.8) * 0.16;


    molecule.position.x =
      1.35 +
      mouseX * 0.35;


    molecule.position.z =
      mouseY * 0.25;


    /* -----------------------------------------------------
       Subtle molecule breathing
       ----------------------------------------------------- */

    const breathe =
      1 +
      Math.sin(elapsed * 1.15) * 0.025;


    molecule.scale.set(
      1.15 * breathe,
      1.15 * breathe,
      1.15 * breathe
    );


    /* -----------------------------------------------------
       Atom pulsing
       ----------------------------------------------------- */

    centerAtom.scale.setScalar(
      1 +
      Math.sin(elapsed * 1.8) * 0.08
    );


    outerAtoms.forEach((atom, index) => {

      const phase =
        elapsed * 1.25 +
        index * 0.8;

      const scale =
        1 +
        Math.sin(phase) * 0.055;

      atom.scale.setScalar(scale);

    });


    /* -----------------------------------------------------
       Particles
       ----------------------------------------------------- */

    particles.rotation.y =
      elapsed * 0.018;

    particles.rotation.x =
      Math.sin(elapsed * 0.12) * 0.025;


    particles.position.x =
      mouseX * 0.18;

    particles.position.y =
      mouseY * 0.12;


    /* -----------------------------------------------------
       Glow particles
       ----------------------------------------------------- */

    glowParticles.rotation.y =
      -elapsed * 0.025;

    glowParticles.rotation.x =
      elapsed * 0.012;


    glowParticles.position.x =
      mouseX * 0.25;

    glowParticles.position.y =
      mouseY * 0.18;


    /* -----------------------------------------------------
       Particle breathing
       ----------------------------------------------------- */

    particleMaterial.opacity =
      0.43 +
      Math.sin(elapsed * 0.75) * 0.10;


    glowMaterial.opacity =
      0.10 +
      Math.sin(elapsed * 0.65) * 0.055;


    /* -----------------------------------------------------
       Lights slowly move
       ----------------------------------------------------- */

    cyanLight.position.x =
      2 +
      Math.sin(elapsed * 0.5) * 1.5;

    cyanLight.position.y =
      2 +
      Math.cos(elapsed * 0.4) * 0.8;


    blueLight.position.x =
      -3 +
      Math.cos(elapsed * 0.35) * 1.0;

    blueLight.position.y =
      -1 +
      Math.sin(elapsed * 0.3) * 0.8;


    softLight.position.x =
      Math.sin(elapsed * 0.25) * 2;


    /* -----------------------------------------------------
       Camera subtle movement
       ----------------------------------------------------- */

    camera.position.x +=
      (mouseX * 0.18 - camera.position.x) * 0.015;

    camera.position.y +=
      (-mouseY * 0.12 - camera.position.y) * 0.015;


    camera.lookAt(
      0.6,
      0,
      0
    );


    /* -----------------------------------------------------
       Render
       ----------------------------------------------------- */

    renderer.render(
      scene,
      camera
    );

  }


  animate();

});
```
