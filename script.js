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


  const container =
    document.getElementById("molecule-container");


  if (!container) {

    console.warn(
      "#molecule-container が見つかりません。"
    );

    return;

  }


  /* =======================================================
     Scene
     ======================================================= */

  const scene = new THREE.Scene();
   window.moleculeScene = scene;


  /* =======================================================
     Camera
     ======================================================= */

  const camera =
    new THREE.PerspectiveCamera(
      45,
      container.clientWidth /
        container.clientHeight,
      0.1,
      100
    );

  camera.position.set(
    0,
    0,
    8
  );


  /* =======================================================
     Renderer
     ======================================================= */

  const renderer =
    new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });


  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  );


  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );


  renderer.setClearColor(
    0x000000,
    0
  );


  container.appendChild(
    renderer.domElement
  );


  /* =======================================================
     Lights
     ======================================================= */

  const ambientLight =
    new THREE.AmbientLight(
      0x7ddfff,
      1.0
    );

  scene.add(
    ambientLight
  );


  const cyanLight =
    new THREE.PointLight(
      0x00d2ff,
      2.5,
      12
    );

  cyanLight.position.set(
    2,
    2,
    4
  );

  scene.add(
    cyanLight
  );


  const blueLight =
    new THREE.PointLight(
      0x3a86ff,
      2.0,
      10
    );

  blueLight.position.set(
    -3,
    -1,
    2
  );

  scene.add(
    blueLight
  );


  const softLight =
    new THREE.PointLight(
      0x7ee8ff,
      1.5,
      8
    );

  softLight.position.set(
    0,
    3,
    -2
  );

  scene.add(
    softLight
  );


  /* =======================================================
     Molecule Group
     ======================================================= */

  const molecule =
    new THREE.Group();


  molecule.position.set(
    1.35,
    0.15,
    0
  );


  molecule.scale.set(
    1.15,
    1.15,
    1.15
  );


  scene.add(
    molecule
  );


  /* =======================================================
     Atom Creation
     ======================================================= */

  function createAtom(
    radius,
    color,
    emissiveColor,
    position
  ) {

    const geometry =
      new THREE.SphereGeometry(
        radius,
        32,
        32
      );


    const material =
      new THREE.MeshStandardMaterial({

        color: color,

        emissive: emissiveColor,

        emissiveIntensity: 0.7,

        roughness: 0.25,

        metalness: 0.15,

        transparent: true,

        opacity: 0.96

      });


    const atom =
      new THREE.Mesh(
        geometry,
        material
      );


    atom.position.copy(
      position
    );


    molecule.add(
      atom
    );


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

    const direction =
      new THREE.Vector3()
        .subVectors(
          end,
          start
        );


    const length =
      direction.length();


    const geometry =
      new THREE.CylinderGeometry(
        radius,
        radius,
        length,
        16
      );


    const material =
      new THREE.MeshStandardMaterial({

        color: 0x00d2ff,

        emissive: 0x00d2ff,

        emissiveIntensity: 0.65,

        transparent: true,

        opacity: 0.72

      });


    const bond =
      new THREE.Mesh(
        geometry,
        material
      );


    const midpoint =
      new THREE.Vector3()
        .addVectors(
          start,
          end
        )
        .multiplyScalar(
          0.5
        );


    bond.position.copy(
      midpoint
    );


    // Cylinderの初期方向はY軸
    bond.quaternion.setFromUnitVectors(
      new THREE.Vector3(
        0,
        1,
        0
      ),
      direction.normalize()
    );


    molecule.add(
      bond
    );


    return bond;

  }


  /* =======================================================
     Molecule Structure
     ======================================================= */

  const centerPosition =
    new THREE.Vector3(
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

  const centerAtom =
    createAtom(
      0.42,
      0x00d2ff,
      0x00d2ff,
      centerPosition
    );


  /* =======================================================
     Outer Atoms
     ======================================================= */

  const outerAtoms = [];


  atomPositions.forEach(
    (position, index) => {

      const atom =
        createAtom(
          index % 2 === 0
            ? 0.28
            : 0.23,

          index % 2 === 0
            ? 0x3a86ff
            : 0x7ee8ff,

          0x00d2ff,

          position
        );


      outerAtoms.push(
        atom
      );


      createBond(
        centerPosition,
        position,
        0.025
      );

    }
  );


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
     Background Particle System
     ======================================================= */

  const particleCount = 320;


  const particlePositions =
    new Float32Array(
      particleCount * 3
    );


  for (
    let i = 0;
    i < particleCount;
    i++
  ) {

    const i3 =
      i * 3;


    particlePositions[i3] =
      (Math.random() - 0.5) * 7;


    particlePositions[i3 + 1] =
      (Math.random() - 0.5) * 5;


    particlePositions[i3 + 2] =
      (Math.random() - 0.5) * 7;

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
     Background Particle Material
     ======================================================= */

  const particleMaterial =
    new THREE.PointsMaterial({

      color: 0x7ee8ff,

      size: 0.045,

      transparent: true,

      opacity: 0.52,

      depthWrite: false,

      blending:
        THREE.AdditiveBlending,

      sizeAttenuation: true

    });


  const particles =
    new THREE.Points(
      particleGeometry,
      particleMaterial
    );


  particles.position.set(
    0,
    0,
    -0.5
  );


  scene.add(
    particles
  );


  /* =======================================================
     Soft Glow Particles
     =======================================================
     
     ここが「ぽわぽわ」のメインです。
     
     普通の小さな粒ではなく、
     分子の周囲をゆっくり漂う発光粒子を作ります。
     ======================================================= */

  const glowCount = 42;


  const glowPositions =
    new Float32Array(
      glowCount * 3
    );


  const glowBasePositions = [];


  for (
    let i = 0;
    i < glowCount;
    i++
  ) {

    const i3 =
      i * 3;


    /*
     * 分子周辺を中心に配置
     *
     * 完全なランダムではなく、
     * 少し広がった楕円形の範囲にします。
     */

    const angle =
      Math.random() *
      Math.PI *
      2;


    const radius =
      1.5 +
      Math.random() * 2.4;


    const x =
      1.0 +
      Math.cos(angle) *
      radius *
      1.15;


    const y =
      Math.sin(angle) *
      radius *
      0.72;


    const z =
      (Math.random() - 0.5) *
      2.5;


    glowPositions[i3] =
      x;


    glowPositions[i3 + 1] =
      y;


    glowPositions[i3 + 2] =
      z;


    glowBasePositions.push({

      x: x,

      y: y,

      z: z,

      phase:
        Math.random() *
        Math.PI *
        2,

      speed:
        0.25 +
        Math.random() *
        0.45,

      amplitude:
        0.06 +
        Math.random() *
        0.14,

      size:
        0.08 +
        Math.random() *
        0.13

    });

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


  /*
   * 発光用の丸い粒
   *
   * AdditiveBlendingによって
   * 淡い青い光として背景に重なります。
   */

  const glowMaterial =
    new THREE.PointsMaterial({

      color: 0x00d2ff,

      size: 0.20,

      transparent: true,

      opacity: 0.32,

      depthWrite: false,

      blending:
        THREE.AdditiveBlending,

      sizeAttenuation: true

    });


  const glowParticles =
    new THREE.Points(
      glowGeometry,
      glowMaterial
    );


  glowParticles.position.set(
    0,
    0,
    -0.7
  );


  scene.add(
    glowParticles
  );


  /* =======================================================
     Extra Large Soft Halo
     =======================================================
     
     分子の周囲に「光の空気感」を追加します。
     ======================================================= */

  const haloGeometry =
    new THREE.BufferGeometry();


  const haloPosition =
    new Float32Array([
      1.1,
      0.1,
      -1.2
    ]);


  haloGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      haloPosition,
      3
    )
  );


  const haloMaterial =
    new THREE.PointsMaterial({

      color: 0x7ee8ff,

      size: 1.15,

      transparent: true,

      opacity: 0.09,

      depthWrite: false,

      blending:
        THREE.AdditiveBlending,

      sizeAttenuation: true

    });


  const halo =
    new THREE.Points(
      haloGeometry,
      haloMaterial
    );


  scene.add(
    halo
  );


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
        event.clientX /
        window.innerWidth -
        0.5;


      targetMouseY =
        event.clientY /
        window.innerHeight -
        0.5;

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


    if (
      width === 0 ||
      height === 0
    ) {

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

  const clock =
    new THREE.Clock();


  function animate() {

    requestAnimationFrame(
      animate
    );


    const elapsed =
      clock.getElapsedTime();


    /* -----------------------------------------------------
       Mouse easing
       ----------------------------------------------------- */

    mouseX +=
      (
        targetMouseX -
        mouseX
      ) * 0.025;


    mouseY +=
      (
        targetMouseY -
        mouseY
      ) * 0.025;


    /* -----------------------------------------------------
       Molecule floating
       ----------------------------------------------------- */

    molecule.rotation.y =
      elapsed * 0.16;


    molecule.rotation.x =
      Math.sin(
        elapsed * 0.45
      ) * 0.10;


    molecule.position.y =
      0.15 +
      Math.sin(
        elapsed * 0.8
      ) * 0.16;


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
      Math.sin(
        elapsed * 1.15
      ) * 0.025;


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
      Math.sin(
        elapsed * 1.8
      ) * 0.08
    );


    outerAtoms.forEach(
      (atom, index) => {

        const phase =
          elapsed * 1.25 +
          index * 0.8;


        const scale =
          1 +
          Math.sin(
            phase
          ) * 0.055;


        atom.scale.setScalar(
          scale
        );

      }
    );


    /* -----------------------------------------------------
       Background Particles
       ----------------------------------------------------- */

    particles.rotation.y =
      elapsed * 0.018;


    particles.rotation.x =
      Math.sin(
        elapsed * 0.12
      ) * 0.025;


    particles.position.x =
      mouseX * 0.18;


    particles.position.y =
      mouseY * 0.12;


    /* -----------------------------------------------------
       Glow Particle Rotation
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
       Glow Particle Floating
       -----------------------------------------------------
       
       粒子それぞれが違う速度で
       ゆっくり上下・左右に漂います。
       ----------------------------------------------------- */

    const glowPositionAttribute =
      glowGeometry.attributes.position;


    for (
      let i = 0;
      i < glowCount;
      i++
    ) {

      const data =
        glowBasePositions[i];


      const i3 =
        i * 3;


      glowPositionAttribute.array[i3] =
        data.x +
        Math.sin(
          elapsed *
            data.speed +
            data.phase
        ) *
        data.amplitude;


      glowPositionAttribute.array[i3 + 1] =
        data.y +
        Math.cos(
          elapsed *
            data.speed *
            0.8 +
            data.phase
        ) *
        data.amplitude;


      glowPositionAttribute.array[i3 + 2] =
        data.z +
        Math.sin(
          elapsed *
            data.speed *
            0.6 +
            data.phase
        ) *
        data.amplitude *
        0.5;

    }


    glowPositionAttribute.needsUpdate =
      true;


    /* -----------------------------------------------------
       Glow Breathing
       ----------------------------------------------------- */

    glowMaterial.opacity =
      0.23 +
      Math.sin(
        elapsed * 0.7
      ) * 0.09;


    /*
     * 大きな光もゆっくり呼吸
     */

    const haloScale =
      1 +
      Math.sin(
        elapsed * 0.55
      ) * 0.12;


    halo.scale.set(
      haloScale,
      haloScale,
      haloScale
    );


    haloMaterial.opacity =
      0.065 +
      Math.sin(
        elapsed * 0.55
      ) * 0.025;


    /* -----------------------------------------------------
       Particle breathing
       ----------------------------------------------------- */

    particleMaterial.opacity =
      0.43 +
      Math.sin(
        elapsed * 0.75
      ) * 0.10;


    /* -----------------------------------------------------
       Lights slowly move
       ----------------------------------------------------- */

    cyanLight.position.x =
      2 +
      Math.sin(
        elapsed * 0.5
      ) * 1.5;


    cyanLight.position.y =
      2 +
      Math.cos(
        elapsed * 0.4
      ) * 0.8;


    blueLight.position.x =
      -3 +
      Math.cos(
        elapsed * 0.35
      ) * 1.0;


    blueLight.position.y =
      -1 +
      Math.sin(
        elapsed * 0.3
      ) * 0.8;


    softLight.position.x =
      Math.sin(
        elapsed * 0.25
      ) * 2;


    /* -----------------------------------------------------
       Camera subtle movement
       ----------------------------------------------------- */

    camera.position.x +=
      (
        mouseX * 0.18 -
        camera.position.x
      ) * 0.015;


    camera.position.y +=
      (
        -mouseY * 0.12 -
        camera.position.y
      ) * 0.015;


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
/* =========================================================
   BENZENE FALLING EFFECT
   メイン分子には触れず、ベンゼン環だけを追加
   ========================================================= */

(function () {

  function startBenzeneEffect() {

    if (typeof THREE === "undefined") {
      console.warn("Three.js が読み込まれていません。");
      return;
    }

    if (!window.moleculeScene) {
      console.warn("moleculeScene が見つかりません。");
      return;
    }

    const scene = window.moleculeScene;

    /* -----------------------------------------
       設定
       ----------------------------------------- */

    const BENZENE_COUNT = 12;

    // ベンゼン環の大きさ
    // 極端に大きく・小さくしない
    const MIN_SCALE = 0.48;
    const MAX_SCALE = 0.72;

    // 落下速度
    const MIN_SPEED = 0.12;
    const MAX_SPEED = 0.25;

    // 左右へのゆらぎ
    const SWAY_AMOUNT = 0.18;

    const benzeneGroup = new THREE.Group();

    // メイン分子より少し奥に配置
    benzeneGroup.position.set(0, 0, -1.8);

    scene.add(benzeneGroup);


    /* -----------------------------------------
       ベンゼン環を作る
       ----------------------------------------- */

    function createBenzene() {

      const group = new THREE.Group();

      const radius = 0.52;

      const points = [];

      for (let i = 0; i < 6; i++) {

        const angle =
          (Math.PI * 2 / 6) * i +
          Math.PI / 6;

        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          )
        );

      }


      /* -----------------------------------------
         外側の六角形
         ----------------------------------------- */

      const geometry = new THREE.BufferGeometry();

      const vertices = [];

      for (let i = 0; i < 6; i++) {

        const a = points[i];
        const b = points[(i + 1) % 6];

        vertices.push(
          a.x, a.y, a.z,
          b.x, b.y, b.z
        );

      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );


      const material = new THREE.LineBasicMaterial({
        color: 0x00d2ff,
        transparent: true,
        opacity: 0.48,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });


      const ring = new THREE.LineSegments(
        geometry,
        material
      );

      group.add(ring);


      /* -----------------------------------------
         内側のベンゼン環
         ----------------------------------------- */

      const innerGeometry = new THREE.BufferGeometry();

      const innerRadius = 0.29;

      const innerPoints = [];

      for (let i = 0; i < 6; i++) {

        const angle =
          (Math.PI * 2 / 6) * i +
          Math.PI / 6;

        innerPoints.push(
          new THREE.Vector3(
            Math.cos(angle) * innerRadius,
            Math.sin(angle) * innerRadius,
            0.015
          )
        );

      }

      const innerVertices = [];

      for (let i = 0; i < 6; i++) {

        const a = innerPoints[i];
        const b = innerPoints[(i + 1) % 6];

        innerVertices.push(
          a.x, a.y, a.z,
          b.x, b.y, b.z
        );

      }

      innerGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          innerVertices,
          3
        )
      );


      const innerMaterial = new THREE.LineBasicMaterial({
        color: 0x7ee8ff,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });


      const innerRing = new THREE.LineSegments(
        innerGeometry,
        innerMaterial
      );

      group.add(innerRing);


      /* -----------------------------------------
         六角形の頂点に小さな光
         ----------------------------------------- */

      const vertexGeometry =
        new THREE.SphereGeometry(
          0.035,
          8,
          8
        );

      const vertexMaterial =
        new THREE.MeshBasicMaterial({
          color: 0x7ee8ff,
          transparent: true,
          opacity: 0.65
        });


      points.forEach(point => {

        const atom =
          new THREE.Mesh(
            vertexGeometry,
            vertexMaterial
          );

        atom.position.copy(point);

        group.add(atom);

      });


      return group;
    }


    /* -----------------------------------------
       ベンゼン環を生成
       ----------------------------------------- */

    const benzeneObjects = [];

    for (
      let i = 0;
      i < BENZENE_COUNT;
      i++
    ) {

      const benzene = createBenzene();

      const scale =
        MIN_SCALE +
        Math.random() *
        (MAX_SCALE - MIN_SCALE);

      benzene.scale.set(
        scale,
        scale,
        scale
      );


      benzene.position.set(

        // 横方向
        -3.0 +
        Math.random() * 6.0,

        // 上からスタート
        3.0 +
        Math.random() * 6.0,

        // 奥行き
        -1.5 +
        Math.random() * 2.0

      );


      // 最初から少し回転
      benzene.rotation.x =
        Math.random() * Math.PI;

      benzene.rotation.y =
        Math.random() * Math.PI;

      benzene.rotation.z =
        Math.random() * Math.PI;


      benzene.userData = {

        speed:
          MIN_SPEED +
          Math.random() *
          (MAX_SPEED - MIN_SPEED),

        sway:
          Math.random() *
          Math.PI * 2,

        swaySpeed:
          0.25 +
          Math.random() * 0.45,

        swayAmount:
          SWAY_AMOUNT *
          (0.6 + Math.random() * 0.8),

        rotationSpeed:
          (Math.random() - 0.5) * 0.35,

        startX:
          benzene.position.x,

        opacity:
          0.35 +
          Math.random() * 0.3

      };


      benzeneGroup.add(benzene);

      benzeneObjects.push(benzene);
    }


    /* -----------------------------------------
       落下アニメーション
       ----------------------------------------- */

    let lastTime = performance.now();

    function animateBenzene(time) {

      requestAnimationFrame(
        animateBenzene
      );

      const delta =
        Math.min(
          (time - lastTime) / 1000,
          0.05
        );

      lastTime = time;


      benzeneObjects.forEach(
        benzene => {

          const data =
            benzene.userData;


          /* -----------------------------
             下へ落ちる
             ----------------------------- */

          benzene.position.y -=
            data.speed * delta;


          /* -----------------------------
             左右にふわっと揺れる
             ----------------------------- */

          data.sway +=
            data.swaySpeed * delta;

          benzene.position.x =
            data.startX +
            Math.sin(data.sway) *
            data.swayAmount;


          /* -----------------------------
             ゆっくり回転
             ----------------------------- */

          benzene.rotation.z +=
            data.rotationSpeed *
            delta;

          benzene.rotation.x +=
            data.rotationSpeed *
            0.35 *
            delta;


          /* -----------------------------
             下まで来たら上へ戻す
             ----------------------------- */

          if (benzene.position.y < -4.0) {

            benzene.position.y =
              4.0 +
              Math.random() * 3.0;

            data.startX =
              -3.0 +
              Math.random() * 6.0;

            benzene.position.x =
              data.startX;

            benzene.position.z =
              -1.5 +
              Math.random() * 2.0;

            data.sway =
              Math.random() *
              Math.PI * 2;

          }

        }
      );

    }


    animateBenzene(
      performance.now()
    );


    console.log(
      "Benzene falling effect started."
    );

  }


  /* -----------------------------------------
     Three.jsの初期化を待つ
     ----------------------------------------- */

  let checkCount = 0;

  const checkScene =
    setInterval(() => {

      checkCount++;

      if (window.moleculeScene) {

        clearInterval(checkScene);

        startBenzeneEffect();

      }

      // 10秒以上待たない
      if (checkCount > 100) {

        clearInterval(checkScene);

        console.warn(
          "ベンゼン環エフェクトを開始できませんでした。"
        );

      }

    }, 100);

})();
