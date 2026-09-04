/* =========================================================
   Lab to Impact
   全国高校生研究論文大賞 2026

   Site interaction
   +
   Three.js Hero Molecule
   +
   Soft Bokeh / Floating Glow Particles

   Reference style:
   Deep blue scientific atmosphere
   + glossy molecule
   + many blurred floating lights
   ========================================================= */


/* =========================================================
   1. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () {

  /* =======================================================
     Mobile Menu
     ======================================================= */

  const menuToggle =
    document.getElementById("menuToggle");

  const nav =
    document.getElementById("nav");


  if (menuToggle && nav) {

    menuToggle.addEventListener(
      "click",
      () => {

        nav.classList.toggle("active");

      }
    );


    const navLinks =
      nav.querySelectorAll("a");


    navLinks.forEach(link => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove("active");

        }
      );

    });

  }


  /* =======================================================
     FAQ
     ======================================================= */

  const faqItems =
    document.querySelectorAll(".faq-item");


  faqItems.forEach(item => {

    const question =
      item.querySelector(".faq-question");


    if (!question) return;


    question.addEventListener(
      "click",
      () => {

        faqItems.forEach(
          otherItem => {

            if (otherItem !== item) {

              otherItem.classList.remove(
                "active"
              );

            }

          }
        );


        item.classList.toggle(
          "active"
        );

      }
    );

  });


  /* =======================================================
     Smooth Scroll
     ======================================================= */

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  anchorLinks.forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });

});


/* =========================================================
   2. SCROLL REVEAL
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const elements =
      document.querySelectorAll(
        "section h2, section h3, section p, section .card, section .btn, section li, section table, section img"
      );


    elements.forEach(
      element => {

        element.classList.add(
          "reveal"
        );

      }
    );


    const revealObserver =
      new IntersectionObserver(
        (
          entries,
          observer
        ) => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "show"
                );


                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12
        }
      );


    document
      .querySelectorAll(".reveal")
      .forEach(element => {

        revealObserver.observe(
          element
        );

      });

  }
);


/* =========================================================
   3. THREE.JS HERO
   ========================================================= */

window.addEventListener(
  "load",
  () => {

    /* =====================================================
       Check Three.js
       ===================================================== */

    if (
      typeof THREE === "undefined"
    ) {

      console.warn(
        "Three.js が読み込まれていません。"
      );

      return;

    }


    const container =
      document.getElementById(
        "molecule-container"
      );


    if (!container) {

      console.warn(
        "#molecule-container が見つかりません。"
      );

      return;

    }


    /* =====================================================
       Scene
       ===================================================== */

    const scene =
      new THREE.Scene();


    /* =====================================================
       Camera
       ===================================================== */

    const camera =
      new THREE.PerspectiveCamera(
        42,
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


    /* =====================================================
       Renderer
       ===================================================== */

    const renderer =
      new THREE.WebGLRenderer({

        antialias: true,

        alpha: true,

        powerPreference:
          "high-performance"

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


    /* =====================================================
       LIGHTING
       ===================================================== */

    const ambientLight =
      new THREE.AmbientLight(
        0x8edfff,
        1.15
      );


    scene.add(
      ambientLight
    );


    /* -----------------------------------------------------
       Main cyan light
       ----------------------------------------------------- */

    const cyanLight =
      new THREE.PointLight(
        0x00eaff,
        3.2,
        13
      );


    cyanLight.position.set(
      2.5,
      2.5,
      4
    );


    scene.add(
      cyanLight
    );


    /* -----------------------------------------------------
       Blue light
       ----------------------------------------------------- */

    const blueLight =
      new THREE.PointLight(
        0x147cff,
        2.4,
        12
      );


    blueLight.position.set(
      -3,
      -1,
      3
    );


    scene.add(
      blueLight
    );


    /* -----------------------------------------------------
       Soft white-blue light
       ----------------------------------------------------- */

    const softLight =
      new THREE.PointLight(
        0x9eefff,
        2.0,
        10
      );


    softLight.position.set(
      0,
      3,
      1
    );


    scene.add(
      softLight
    );


    /* =====================================================
       MOLECULE GROUP
       ===================================================== */

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


    /* =====================================================
       ATOM MATERIAL
       ===================================================== */

    function createAtom(
      radius,
      color,
      position
    ) {

      const geometry =
        new THREE.SphereGeometry(
          radius,
          48,
          48
        );


      const material =
        new THREE.MeshStandardMaterial({

          color: color,

          emissive: 0x00cfff,

          emissiveIntensity: 0.55,

          roughness: 0.16,

          metalness: 0.22,

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


    /* =====================================================
       BOND
       ===================================================== */

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
          24
        );


      const material =
        new THREE.MeshStandardMaterial({

          color: 0x1ddfff,

          emissive: 0x00cfff,

          emissiveIntensity: 0.85,

          roughness: 0.12,

          metalness: 0.45,

          transparent: true,

          opacity: 0.84

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


    /* =====================================================
       MOLECULE STRUCTURE
       ===================================================== */

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


    /* =====================================================
       CENTER ATOM
       ===================================================== */

    const centerAtom =
      createAtom(
        0.45,
        0x00dfff,
        centerPosition
      );


    /* =====================================================
       OUTER ATOMS
       ===================================================== */

    const outerAtoms = [];


    atomPositions.forEach(
      (
        position,
        index
      ) => {

        const atom =
          createAtom(

            index % 2 === 0
              ? 0.30
              : 0.25,

            index % 2 === 0
              ? 0x17bfff
              : 0x65e9ff,

            position

          );


        outerAtoms.push(
          atom
        );


        createBond(
          centerPosition,
          position,
          0.028
        );

      }
    );


    /* =====================================================
       EXTRA BONDS
       ===================================================== */

    createBond(
      atomPositions[0],
      atomPositions[2],
      0.017
    );


    createBond(
      atomPositions[1],
      atomPositions[3],
      0.017
    );


    /* =====================================================
       GLOW TEXTURE
       
       CSSの普通の円ではなく、
       Canvasで「ぼかした光」を生成します。
       
       これが今回の「ぽわぽわ」の核です。
       ===================================================== */

    function createGlowTexture() {

      const size = 256;


      const canvas =
        document.createElement(
          "canvas"
        );


      canvas.width = size;
      canvas.height = size;


      const context =
        canvas.getContext(
          "2d"
        );


      const gradient =
        context.createRadialGradient(

          size / 2,
          size / 2,
          0,

          size / 2,
          size / 2,
          size / 2

        );


      gradient.addColorStop(
        0,
        "rgba(255,255,255,1)"
      );


      gradient.addColorStop(
        0.08,
        "rgba(130,245,255,0.95)"
      );


      gradient.addColorStop(
        0.25,
        "rgba(0,220,255,0.60)"
      );


      gradient.addColorStop(
        0.48,
        "rgba(0,170,255,0.20)"
      );


      gradient.addColorStop(
        0.72,
        "rgba(0,100,255,0.07)"
      );


      gradient.addColorStop(
        1,
        "rgba(0,80,255,0)"
      );


      context.fillStyle =
        gradient;


      context.fillRect(
        0,
        0,
        size,
        size
      );


      const texture =
        new THREE.CanvasTexture(
          canvas
        );


      texture.needsUpdate =
        true;


      return texture;

    }


    const glowTexture =
      createGlowTexture();


    /* =====================================================
       BACKGROUND TINY PARTICLES
       ===================================================== */

    const particleCount = 360;


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
        (Math.random() - 0.5) * 7.5;


      particlePositions[i3 + 1] =
        (Math.random() - 0.5) * 5.5;


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


    const particleMaterial =
      new THREE.PointsMaterial({

        color: 0x8befff,

        size: 0.035,

        transparent: true,

        opacity: 0.48,

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
      -1.0
    );


    scene.add(
      particles
    );


    /* =====================================================
       LARGE SOFT BOKEH
       
       参考画像のような
       大きな「丸いボケ」を大量に作ります。
       ===================================================== */

    const bokehGroup =
      new THREE.Group();


    scene.add(
      bokehGroup
    );


    const bokehData = [];


    const bokehCount = 58;


    for (
      let i = 0;
      i < bokehCount;
      i++
    ) {

      const material =
        new THREE.SpriteMaterial({

          map: glowTexture,

          color:
            Math.random() > 0.25
              ? 0x21dfff
              : 0x4d9dff,

          transparent: true,

          opacity:
            0.07 +
            Math.random() * 0.18,

          depthWrite: false,

          blending:
            THREE.NormalBlending

        });


      const sprite =
        new THREE.Sprite(
          material
        );


      /* -----------------------------------------------
         Depth
         ----------------------------------------------- */

      const depth =
        -3.5 +
        Math.random() * 5.5;


      /* -----------------------------------------------
         Position
         ----------------------------------------------- */

      const x =
        0.8 +
        (Math.random() - 0.5) *
        6.5;


      const y =
        (Math.random() - 0.5) *
        5.0;


      const z =
        depth;


      sprite.position.set(
        x,
        y,
        z
      );


      /* -----------------------------------------------
         Size
         ----------------------------------------------- */

      const size =
        0.12 +
        Math.random() *
        0.55;


      sprite.scale.set(
        size,
        size,
        1
      );


      bokehGroup.add(
        sprite
      );


      bokehData.push({

        sprite: sprite,

        baseX: x,

        baseY: y,

        baseZ: z,

        phase:
          Math.random() *
          Math.PI *
          2,

        speed:
          0.08 +
          Math.random() *
          0.25,

        amplitude:
          0.04 +
          Math.random() *
          0.18,

        baseOpacity:
          0.07 +
          Math.random() *
          0.18,

        size: size

      });

    }


    /* =====================================================
       MOLECULE SURROUNDING GLOW
       
       分子の近くに集中させる
       「ぽわぽわ」の層。
       ===================================================== */

    const moleculeGlowGroup =
      new THREE.Group();


    moleculeGlowGroup.position.set(
      1.35,
      0.15,
      -0.6
    );


    scene.add(
      moleculeGlowGroup
    );


    const moleculeGlowData = [];


    const moleculeGlowCount = 30;


    for (
      let i = 0;
      i < moleculeGlowCount;
      i++
    ) {

      const material =
        new THREE.SpriteMaterial({

          map: glowTexture,

          color:
            i % 4 === 0
              ? 0x9effff
              : 0x00d9ff,

          transparent: true,

          opacity:
            0.10 +
            Math.random() * 0.22,

          depthWrite: false,

          blending:
            THREE.NormalBlending

        });


      const sprite =
        new THREE.Sprite(
          material
        );


      const angle =
        Math.random() *
        Math.PI *
        2;


      const radius =
        0.9 +
        Math.random() *
        2.7;


      const x =
        Math.cos(angle) *
        radius *
        1.35;


      const y =
        Math.sin(angle) *
        radius *
        0.75;


      const z =
        (Math.random() - 0.5) *
        2.8;


      sprite.position.set(
        x,
        y,
        z
      );


      const size =
        0.10 +
        Math.random() *
        0.48;


      sprite.scale.set(
        size,
        size,
        1
      );


      moleculeGlowGroup.add(
        sprite
      );


      moleculeGlowData.push({

        sprite: sprite,

        baseX: x,

        baseY: y,

        baseZ: z,

        phase:
          Math.random() *
          Math.PI *
          2,

        speed:
          0.15 +
          Math.random() *
          0.35,

        amplitude:
          0.04 +
          Math.random() *
          0.16,

        baseOpacity:
          0.10 +
          Math.random() *
          0.22,

        size: size

      });

    }


    /* =====================================================
       LARGE ATMOSPHERIC HALOS
       ===================================================== */

    const haloGroup =
      new THREE.Group();


    scene.add(
      haloGroup
    );


    const haloData = [];


    for (
      let i = 0;
      i < 5;
      i++
    ) {

      const material =
        new THREE.SpriteMaterial({

          map: glowTexture,

          color:
            i % 2 === 0
              ? 0x00dfff
              : 0x168cff,

          transparent: true,

          opacity: 0.035,

          depthWrite: false,

          blending:
            THREE.NormalBlending

        });


      const sprite =
        new THREE.Sprite(
          material
        );


      const angle =
        Math.random() *
        Math.PI *
        2;


      const radius =
        0.5 +
        Math.random() *
        2.0;


      sprite.position.set(

        1.35 +
        Math.cos(angle) *
        radius,

        0.15 +
        Math.sin(angle) *
        radius *
        0.7,

        -1.4 -
        Math.random() * 1.5

      );


      const size =
        1.1 +
        Math.random() *
        1.4;


      sprite.scale.set(
        size,
        size,
        1
      );


      haloGroup.add(
        sprite
      );


      haloData.push({

        sprite: sprite,

        phase:
          Math.random() *
          Math.PI *
          2,

        speed:
          0.12 +
          Math.random() *
          0.15,

        size: size

      });

    }


    /* =====================================================
       MOUSE
       ===================================================== */

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


    /* =====================================================
       RESIZE
       ===================================================== */

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


    /* =====================================================
       CLOCK
       ===================================================== */

    const clock =
      new THREE.Clock();


    /* =====================================================
       ANIMATION
       ===================================================== */

    function animate() {

      requestAnimationFrame(
        animate
      );


      const elapsed =
        clock.getElapsedTime();


      /* ===================================================
         Mouse smoothing
         =================================================== */

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


      /* ===================================================
         MOLECULE ROTATION
         =================================================== */

      molecule.rotation.y =
        elapsed * 0.12;


      molecule.rotation.x =
        Math.sin(
          elapsed * 0.40
        ) * 0.09;


      molecule.rotation.z =
        Math.sin(
          elapsed * 0.27
        ) * 0.025;


      /* ===================================================
         MOLECULE FLOAT
         =================================================== */

      molecule.position.y =
        0.15 +
        Math.sin(
          elapsed * 0.72
        ) * 0.15;


      molecule.position.x =
        1.35 +
        mouseX * 0.35;


      molecule.position.z =
        mouseY * 0.22;


      /* ===================================================
         MOLECULE BREATHING
         =================================================== */

      const breathe =
        1 +
        Math.sin(
          elapsed * 1.05
        ) * 0.025;


      molecule.scale.set(
        1.15 * breathe,
        1.15 * breathe,
        1.15 * breathe
      );


      /* ===================================================
         CENTER ATOM PULSE
         =================================================== */

      centerAtom.scale.setScalar(

        1 +
        Math.sin(
          elapsed * 1.7
        ) * 0.07

      );


      /* ===================================================
         OUTER ATOMS PULSE
         =================================================== */

      outerAtoms.forEach(
        (
          atom,
          index
        ) => {

          const phase =
            elapsed * 1.15 +
            index * 0.8;


          const scale =
            1 +
            Math.sin(
              phase
            ) * 0.045;


          atom.scale.setScalar(
            scale
          );

        }
      );


      /* ===================================================
         BACKGROUND TINY PARTICLES
         =================================================== */

      particles.rotation.y =
        elapsed * 0.012;


      particles.rotation.x =
        Math.sin(
          elapsed * 0.10
        ) * 0.025;


      particles.position.x =
        mouseX * 0.20;


      particles.position.y =
        mouseY * 0.14;


      particleMaterial.opacity =
        0.34 +
        Math.sin(
          elapsed * 0.55
        ) * 0.10;


      /* ===================================================
         BOKEH ANIMATION
         =================================================== */

      bokehData.forEach(
        data => {

          const sprite =
            data.sprite;


          sprite.position.x =
            data.baseX +
            Math.sin(
              elapsed *
              data.speed +
              data.phase
            ) *
            data.amplitude;


          sprite.position.y =
            data.baseY +
            Math.cos(
              elapsed *
              data.speed *
              0.8 +
              data.phase
            ) *
            data.amplitude;


          sprite.position.z =
            data.baseZ +
            Math.sin(
              elapsed *
              data.speed *
              0.6 +
              data.phase
            ) *
            0.12;


          const pulse =
            1 +
            Math.sin(
              elapsed *
              data.speed *
              1.8 +
              data.phase
            ) * 0.15;


          sprite.scale.set(
            data.size * pulse,
            data.size * pulse,
            1
          );


          sprite.material.opacity =
            data.baseOpacity *
            (
              0.72 +
              Math.sin(
                elapsed * 0.55 +
                data.phase
              ) * 0.28
            );

        }
      );


      /* ===================================================
         MOLECULE GLOW ANIMATION
         =================================================== */

      moleculeGlowData.forEach(
        data => {

          const sprite =
            data.sprite;


          sprite.position.x =
            data.baseX +
            Math.sin(
              elapsed *
              data.speed +
              data.phase
            ) *
            data.amplitude;


          sprite.position.y =
            data.baseY +
            Math.cos(
              elapsed *
              data.speed *
              0.75 +
              data.phase
            ) *
            data.amplitude;


          sprite.position.z =
            data.baseZ +
            Math.sin(
              elapsed *
              data.speed *
              0.55 +
              data.phase
            ) *
            0.10;


          const pulse =
            1 +
            Math.sin(
              elapsed *
              0.8 +
              data.phase
            ) * 0.18;


          sprite.scale.set(
            data.size * pulse,
            data.size * pulse,
            1
          );


          sprite.material.opacity =
            data.baseOpacity *
            (
              0.65 +
              Math.sin(
                elapsed * 0.7 +
                data.phase
              ) * 0.35
            );

        }
      );


      /* ===================================================
         LARGE HALOS
         =================================================== */

      haloData.forEach(
        data => {

          const pulse =
            1 +
            Math.sin(
              elapsed *
              data.speed +
              data.phase
            ) * 0.16;


          data.sprite.scale.set(
            data.size * pulse,
            data.size * pulse,
            1
          );


          data.sprite.material.opacity =
            0.025 +
            (
              Math.sin(
                elapsed * 0.45 +
                data.phase
              ) + 1
            ) * 0.018;

        }
      );


      /* ===================================================
         GLOW GROUP MOVEMENT
         =================================================== */

      moleculeGlowGroup.rotation.y =
        -elapsed * 0.025;


      moleculeGlowGroup.rotation.x =
        Math.sin(
          elapsed * 0.12
        ) * 0.03;


      moleculeGlowGroup.position.x =
        1.35 +
        mouseX * 0.22;


      moleculeGlowGroup.position.y =
        0.15 +
        mouseY * 0.15;


      /* ===================================================
         HALO MOVEMENT
         =================================================== */

      haloGroup.rotation.y =
        elapsed * 0.018;


      haloGroup.rotation.x =
        Math.sin(
          elapsed * 0.18
        ) * 0.025;


      /* ===================================================
         LIGHT MOVEMENT
         =================================================== */

      cyanLight.position.x =
        2.3 +
        Math.sin(
          elapsed * 0.45
        ) * 1.4;


      cyanLight.position.y =
        2.2 +
        Math.cos(
          elapsed * 0.35
        ) * 0.8;


      blueLight.position.x =
        -3 +
        Math.cos(
          elapsed * 0.30
        ) * 1.2;


      blueLight.position.y =
        -1 +
        Math.sin(
          elapsed * 0.28
        ) * 0.9;


      softLight.position.x =
        Math.sin(
          elapsed * 0.23
        ) * 2;


      softLight.position.y =
        2.5 +
        Math.cos(
          elapsed * 0.31
        ) * 0.7;


      /* ===================================================
         CAMERA
         =================================================== */

      camera.position.x +=
        (
          mouseX * 0.18 -
          camera.position.x
        ) * 0.012;


      camera.position.y +=
        (
          -mouseY * 0.12 -
          camera.position.y
        ) * 0.012;


      camera.lookAt(
        0.6,
        0,
        0
      );


      /* ===================================================
         RENDER
         =================================================== */

      renderer.render(
        scene,
        camera
      );

    }


    animate();

  }
);
