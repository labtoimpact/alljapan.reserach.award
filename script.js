/* =========================================================
   Lab to Impact - script.js

   サイト全体の動き
   +
   Hero 3D Molecule
   +
   Floating Glow
   +
   Falling Benzene Rings
   +
   Mouse Rotation
   ========================================================= */


/* =========================================================
   1. MOBILE MENU
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const menuToggle =
      document.getElementById(
        "menuToggle"
      );

    const nav =
      document.getElementById(
        "nav"
      );


    if (
      menuToggle &&
      nav
    ) {

      menuToggle.addEventListener(
        "click",
        () => {

          nav.classList.toggle(
            "active"
          );

        }
      );


      const navLinks =
        nav.querySelectorAll(
          "a"
        );


      navLinks.forEach(
        link => {

          link.addEventListener(
            "click",
            () => {

              nav.classList.remove(
                "active"
              );

            }
          );

        }
      );

    }

  }
);


/* =========================================================
   2. FAQ
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const faqItems =
      document.querySelectorAll(
        ".faq-item"
      );


    faqItems.forEach(
      item => {

        const question =
          item.querySelector(
            ".faq-question"
          );


        if (!question) {
          return;
        }


        question.addEventListener(
          "click",
          () => {


            faqItems.forEach(
              otherItem => {

                if (
                  otherItem !== item
                ) {

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

      }
    );

  }
);


/* =========================================================
   3. SMOOTH SCROLL
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const anchorLinks =
      document.querySelectorAll(
        'a[href^="#"]'
      );


    anchorLinks.forEach(
      link => {

        link.addEventListener(
          "click",
          event => {

            const targetId =
              link.getAttribute(
                "href"
              );


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


            if (!target) {
              return;
            }


            event.preventDefault();


            target.scrollIntoView({
              behavior:
                "smooth",

              block:
                "start"
            });

          }
        );

      }
    );

  }
);


/* =========================================================
   4. SCROLL REVEAL
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
          threshold:
            0.12
        }
      );


    document
      .querySelectorAll(
        ".reveal"
      )
      .forEach(
        element => {

          revealObserver.observe(
            element
          );

        }
      );

  }
);


/* =========================================================
   5. HERO
   THREE.JS
   ========================================================= */

window.addEventListener(
  "load",
  () => {


    /* -----------------------------------------------------
       Three.js Check
       ----------------------------------------------------- */

    if (
      typeof THREE ===
      "undefined"
    ) {

      console.warn(
        "Three.js が読み込まれていません。"
      );

      return;

    }


    /* -----------------------------------------------------
       Container
       ----------------------------------------------------- */

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
       SCENE
       ===================================================== */

    const scene =
      new THREE.Scene();


    /*
     * ベンゼン追加用に
     * Sceneを外部から参照できるようにします。
     */

    window.moleculeScene =
      scene;


    /* =====================================================
       CAMERA
       ===================================================== */

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


    /* =====================================================
       RENDERER
       ===================================================== */

    const renderer =
      new THREE.WebGLRenderer({
        antialias:
          true,

        alpha:
          true
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
       LIGHTS
       ===================================================== */

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


    /* =====================================================
       MAIN MOLECULE
       ===================================================== */

    const molecule =
      new THREE.Group();


    /*
     * 位置は元のまま。
     */

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
       ATOM CREATION
       ===================================================== */

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

          color:
            color,

          emissive:
            emissiveColor,

          emissiveIntensity:
            0.7,

          roughness:
            0.25,

          metalness:
            0.15,

          transparent:
            true,

          opacity:
            0.96

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
       BOND CREATION
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
          16
        );


      const material =
        new THREE.MeshStandardMaterial({

          color:
            0x00d2ff,

          emissive:
            0x00d2ff,

          emissiveIntensity:
            0.65,

          transparent:
            true,

          opacity:
            0.72

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
        0.42,
        0x00d2ff,
        0x00d2ff,
        centerPosition
      );


    /* =====================================================
       OUTER ATOMS
       ===================================================== */

    const outerAtoms =
      [];


    atomPositions.forEach(
      (
        position,
        index
      ) => {


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


    /* =====================================================
       EXTRA BONDS
       ===================================================== */

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


    /* =====================================================
       BACKGROUND PARTICLES
       ===================================================== */

    const particleCount =
      320;


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


    const particleMaterial =
      new THREE.PointsMaterial({

        color:
          0x7ee8ff,

        size:
          0.045,

        transparent:
          true,

        opacity:
          0.52,

        depthWrite:
          false,

        blending:
          THREE.AdditiveBlending,

        sizeAttenuation:
          true

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


    /* =====================================================
       SOFT GLOW PARTICLES
       ===================================================== */

    const glowCount =
      42;


    const glowPositions =
      new Float32Array(
        glowCount * 3
      );


    const glowBasePositions =
      [];


    for (
      let i = 0;
      i < glowCount;
      i++
    ) {


      const i3 =
        i * 3;


      const angle =
        Math.random() *
        Math.PI *
        2;


      const radius =
        1.5 +
        Math.random() *
        2.4;


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

        x:
          x,

        y:
          y,

        z:
          z,

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
          0.14

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


    const glowMaterial =
      new THREE.PointsMaterial({

        color:
          0x00d2ff,

        size:
          0.20,

        transparent:
          true,

        opacity:
          0.32,

        depthWrite:
          false,

        blending:
          THREE.AdditiveBlending,

        sizeAttenuation:
          true

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


    /* =====================================================
       LARGE SOFT HALO
       ===================================================== */

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

        color:
          0x7ee8ff,

        size:
          1.15,

        transparent:
          true,

        opacity:
          0.09,

        depthWrite:
          false,

        blending:
          THREE.AdditiveBlending,

        sizeAttenuation:
          true

      });


    const halo =
      new THREE.Points(
        haloGeometry,
        haloMaterial
      );


    scene.add(
      halo
    );


    /* =====================================================
       MOUSE
       ===================================================== */

    let mouseX =
      0;

    let mouseY =
      0;


    let targetMouseX =
      0;

    let targetMouseY =
      0;


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
       TOUCH
       ===================================================== */

    window.addEventListener(
      "touchmove",
      event => {


        if (
          !event.touches ||
          !event.touches[0]
        ) {

          return;

        }


        const touch =
          event.touches[0];


        targetMouseX =
          touch.clientX /
          window.innerWidth -
          0.5;


        targetMouseY =
          touch.clientY /
          window.innerHeight -
          0.5;

      },
      {
        passive:
          true
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
         MOUSE EASING
         =================================================== */

      mouseX +=
        (
          targetMouseX -
          mouseX
        ) * 0.035;


      mouseY +=
        (
          targetMouseY -
          mouseY
        ) * 0.035;


      /* ===================================================
         MAIN MOLECULE
         AUTO ROTATION + MOUSE ROTATION
         =================================================== */


      /*
       * 自動回転
       *
       * 元より少し速く。
       */

      const autoRotationY =
        elapsed * 0.28;


      /*
       * マウス左右
       */

      const targetRotationY =
        autoRotationY +
        mouseX * 0.75;


      /*
       * マウス上下
       */

      const targetRotationX =
        Math.sin(
          elapsed * 0.45
        ) * 0.10 +
        mouseY * 0.45;


      /*
       * なめらかに追従
       */

      molecule.rotation.y +=
        (
          targetRotationY -
          molecule.rotation.y
        ) * 0.035;


      molecule.rotation.x +=
        (
          targetRotationX -
          molecule.rotation.x
        ) * 0.035;


      /*
       * Z方向にも
       * ごくわずかに反応
       */

      const targetRotationZ =
        mouseX * 0.10;


      molecule.rotation.z +=
        (
          targetRotationZ -
          molecule.rotation.z
        ) * 0.025;


      /* ===================================================
         FLOATING
         =================================================== */

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


      /* ===================================================
         BREATHING
         =================================================== */

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


      /* ===================================================
         CENTER ATOM PULSE
         =================================================== */

      centerAtom.scale.setScalar(

        1 +
        Math.sin(
          elapsed * 1.8
        ) * 0.08

      );


      /* ===================================================
         OUTER ATOMS
         =================================================== */

      outerAtoms.forEach(
        (
          atom,
          index
        ) => {


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


      /* ===================================================
         BACKGROUND PARTICLES
         =================================================== */

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


      /* ===================================================
         GLOW PARTICLES
         =================================================== */

      glowParticles.rotation.y =
        -elapsed * 0.025;


      glowParticles.rotation.x =
        elapsed * 0.012;


      glowParticles.position.x =
        mouseX * 0.25;


      glowParticles.position.y =
        mouseY * 0.18;


      /* ===================================================
         GLOW FLOATING
         =================================================== */

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


      /* ===================================================
         GLOW BREATHING
         =================================================== */

      glowMaterial.opacity =

        0.23 +

        Math.sin(
          elapsed * 0.7
        ) * 0.09;


      /* ===================================================
         HALO
         =================================================== */

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


      /* ===================================================
         PARTICLE BREATHING
         =================================================== */

      particleMaterial.opacity =

        0.43 +

        Math.sin(
          elapsed * 0.75
        ) * 0.10;


      /* ===================================================
         LIGHT MOVEMENT
         =================================================== */

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


      /* ===================================================
         CAMERA
         =================================================== */

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


      /*
       * ここは以前の位置を維持。
       * 分子が消えないように変更しない。
       */

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


    /* =====================================================
       BENZENE FALLING EFFECT
       ===================================================== */

    startBenzeneEffect(
      scene
    );


  }
);


/* =========================================================
   BENZENE EFFECT
   ========================================================= */

function startBenzeneEffect(
  scene
) {


  if (
    typeof THREE ===
    "undefined"
  ) {

    return;

  }


  /* =======================================================
     SETTINGS
     ======================================================= */

  const BENZENE_COUNT =
    12;


  /*
   * サイズは現在のまま
   */

  const MIN_SCALE =
    0.48;


  const MAX_SCALE =
    0.72;


  /*
   * 落下速度も現在のまま
   */

  const MIN_SPEED =
    0.12;


  const MAX_SPEED =
    0.25;


  const SWAY_AMOUNT =
    0.18;


  /* =======================================================
     BENZENE GROUP
     ======================================================= */

  const benzeneGroup =
    new THREE.Group();


  /*
   * メイン分子より奥
   */

  benzeneGroup.position.set(
    0,
    0,
    -1.8
  );


  scene.add(
    benzeneGroup
  );


  /* =======================================================
     CREATE BENZENE
     ======================================================= */

  function createBenzene() {


    const group =
      new THREE.Group();


    const radius =
      0.52;


    const points =
      [];


    for (
      let i = 0;
      i < 6;
      i++
    ) {


      const angle =

        (
          Math.PI *
          2 /
          6
        ) *
        i +

        Math.PI /
        6;


      points.push(

        new THREE.Vector3(

          Math.cos(angle) *
          radius,

          Math.sin(angle) *
          radius,

          0

        )

      );

    }


    /* ===================================================
       OUTER RING
       =================================================== */

    const geometry =
      new THREE.BufferGeometry();


    const vertices =
      [];


    for (
      let i = 0;
      i < 6;
      i++
    ) {


      const a =
        points[i];


      const b =
        points[
          (i + 1) % 6
        ];


      vertices.push(

        a.x,
        a.y,
        a.z,

        b.x,
        b.y,
        b.z

      );

    }


    geometry.setAttribute(

      "position",

      new THREE.Float32BufferAttribute(
        vertices,
        3
      )

    );


    const material =
      new THREE.LineBasicMaterial({

        color:
          0x00d2ff,

        transparent:
          true,

        opacity:
          0.48,

        depthWrite:
          false,

        blending:
          THREE.AdditiveBlending

      });


    const ring =
      new THREE.LineSegments(
        geometry,
        material
      );


    group.add(
      ring
    );


    /* ===================================================
       INNER RING
       =================================================== */

    const innerGeometry =
      new THREE.BufferGeometry();


    const innerRadius =
      0.29;


    const innerPoints =
      [];


    for (
      let i = 0;
      i < 6;
      i++
    ) {


      const angle =

        (
          Math.PI *
          2 /
          6
        ) *
        i +

        Math.PI /
        6;


      innerPoints.push(

        new THREE.Vector3(

          Math.cos(angle) *
          innerRadius,

          Math.sin(angle) *
          innerRadius,

          0.015

        )

      );

    }


    const innerVertices =
      [];


    for (
      let i = 0;
      i < 6;
      i++
    ) {


      const a =
        innerPoints[i];


      const b =
        innerPoints[
          (i + 1) % 6
        ];


      innerVertices.push(

        a.x,
        a.y,
        a.z,

        b.x,
        b.y,
        b.z

      );

    }


    innerGeometry.setAttribute(

      "position",

      new THREE.Float32BufferAttribute(
        innerVertices,
        3
      )

    );


    const innerMaterial =
      new THREE.LineBasicMaterial({

        color:
          0x7ee8ff,

        transparent:
          true,

        opacity:
          0.28,

        depthWrite:
          false,

        blending:
          THREE.AdditiveBlending

      });


    const innerRing =
      new THREE.LineSegments(

        innerGeometry,

        innerMaterial

      );


    group.add(
      innerRing
    );


    /* ===================================================
       VERTEX GLOW
       =================================================== */

    const vertexGeometry =
      new THREE.SphereGeometry(
        0.035,
        8,
        8
      );


    const vertexMaterial =
      new THREE.MeshBasicMaterial({

        color:
          0x7ee8ff,

        transparent:
          true,

        opacity:
          0.65

      });


    points.forEach(
      point => {


        const atom =
          new THREE.Mesh(

            vertexGeometry,

            vertexMaterial

          );


        atom.position.copy(
          point
        );


        group.add(
          atom
        );

      }
    );


    return group;

  }


  /* =======================================================
     CREATE OBJECTS
     ======================================================= */

  const benzeneObjects =
    [];


  for (
    let i = 0;
    i < BENZENE_COUNT;
    i++
  ) {


    const benzene =
      createBenzene();


    const scale =

      MIN_SCALE +

      Math.random() *
      (
        MAX_SCALE -
        MIN_SCALE
      );


    benzene.scale.set(
      scale,
      scale,
      scale
    );


    /*
     * 最初の位置。
     * 一部はHero内に見えるようにします。
     */

    benzene.position.set(

      -3.0 +
      Math.random() * 6.0,

      -1.0 +
      Math.random() * 6.0,

      -1.5 +
      Math.random() * 2.0

    );


    benzene.rotation.x =
      Math.random() *
      Math.PI;


    benzene.rotation.y =
      Math.random() *
      Math.PI;


    benzene.rotation.z =
      Math.random() *
      Math.PI;


    benzene.userData = {

      speed:

        MIN_SPEED +

        Math.random() *
        (
          MAX_SPEED -
          MIN_SPEED
        ),


      sway:

        Math.random() *
        Math.PI *
        2,


      swaySpeed:

        0.25 +
        Math.random() *
        0.45,


      swayAmount:

        SWAY_AMOUNT *
        (
          0.6 +
          Math.random() *
          0.8
        ),


      rotationSpeed:

        (
          Math.random() -
          0.5
        ) *
        0.35,


      startX:

        benzene.position.x

    };


    benzeneGroup.add(
      benzene
    );


    benzeneObjects.push(
      benzene
    );

  }


  /* =======================================================
     ANIMATION
     ======================================================= */

  let lastTime =
    performance.now();


  function animateBenzene(
    time
  ) {


    requestAnimationFrame(
      animateBenzene
    );


    const delta =

      Math.min(

        (
          time -
          lastTime
        ) / 1000,

        0.05

      );


    lastTime =
      time;


    benzeneObjects.forEach(
      benzene => {


        const data =
          benzene.userData;


        /* -----------------------------------------------
           FALL
           ----------------------------------------------- */

        benzene.position.y -=
          data.speed *
          delta;


        /* -----------------------------------------------
           SWAY
           ----------------------------------------------- */

        data.sway +=
          data.swaySpeed *
          delta;


        benzene.position.x =

          data.startX +

          Math.sin(
            data.sway
          ) *
          data.swayAmount;


        /* -----------------------------------------------
           ROTATION
           ----------------------------------------------- */

        benzene.rotation.z +=
          data.rotationSpeed *
          delta;


        benzene.rotation.x +=
          data.rotationSpeed *
          0.35 *
          delta;


        /* -----------------------------------------------
           RESET
           ----------------------------------------------- */

        if (
          benzene.position.y <
          -4.0
        ) {


          benzene.position.y =

            4.0 +

            Math.random() *
            3.0;


          data.startX =

            -3.0 +

            Math.random() *
            6.0;


          benzene.position.x =
            data.startX;


          benzene.position.z =

            -1.5 +

            Math.random() *
            2.0;


          data.sway =

            Math.random() *
            Math.PI *
            2;

        }

      }
    );

  }


  animateBenzene(
    performance.now()
  );

}
