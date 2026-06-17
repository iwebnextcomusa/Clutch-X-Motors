import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeCarScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [initError, setInitError] = useState(false);
  const [currentSpeedLabel, setCurrentSpeedLabel] = useState("RPM: 1200 (Idle)");

  useEffect(() => {
    if (!containerRef.current) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight || 400;

    // Standard Three.js initialization
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.15);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Renderer setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      console.warn("WebGL initialization failed:", e);
      setInitError(true);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create a group to hold our 3D mechanical spinner (representing a rotor/wheel clutch system)
    const mechGroup = new THREE.Group();
    scene.add(mechGroup);

    // Part 1: Outer glowing tire/ring (torus)
    const torusGeom = new THREE.TorusGeometry(2.0, 0.18, 16, 100);
    const torusMat = new THREE.MeshPhongMaterial({
      color: 0x222222,
      emissive: 0x111111,
      specular: 0xffffff,
      shininess: 100,
    });
    const outerRing = new THREE.Mesh(torusGeom, torusMat);
    mechGroup.add(outerRing);

    // Part 2: Dynamic Glowing Tread Ring
    const treadGeom = new THREE.TorusGeometry(2.15, 0.04, 8, 80);
    const treadMat = new THREE.MeshBasicMaterial({
      color: 0xef4444, // Neon red accent!
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const treadRing = new THREE.Mesh(treadGeom, treadMat);
    mechGroup.add(treadRing);

    // Part 3: Wheel Hub (Cylinder)
    const hubGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.6, 32);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      metalness: 0.9,
      roughness: 0.1,
    });
    const hub = new THREE.Mesh(hubGeom, hubMat);
    hub.rotation.x = Math.PI / 2;
    mechGroup.add(hub);

    // Part 4: Spokes (Clutch spokes - Box array)
    const spokeCount = 6;
    const spokesList: THREE.Mesh[] = [];
    for (let i = 0; i < spokeCount; i++) {
      const angle = (i / spokeCount) * Math.PI * 2;
      const spokeGeom = new THREE.BoxGeometry(0.18, 1.8, 0.1);
      const spokeMat = new THREE.MeshStandardMaterial({
        color: 0x4b5563,
        metalness: 0.8,
        roughness: 0.2,
      });
      const spoke = new THREE.Mesh(spokeGeom, spokeMat);
      
      // Position spoke radiating outward
      spoke.position.x = Math.sin(angle) * 0.9;
      spoke.position.y = Math.cos(angle) * 0.9;
      spoke.rotation.z = -angle;
      
      mechGroup.add(spoke);
      spokesList.push(spoke);
    }

    // Part 5: Inner Telemetry Points (representing diagnostic nodes)
    const pointsGeom = new THREE.BufferGeometry();
    const pointsCount = 40;
    const pointsPositions = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 1.5;
      pointsPositions[i * 3] = Math.sin(angle) * radius;
      pointsPositions[i * 3 + 1] = Math.cos(angle) * radius;
      pointsPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    pointsGeom.setAttribute("position", new THREE.BufferAttribute(pointsPositions, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: 0xef4444,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const telemetryPoints = new THREE.Points(pointsGeom, pointsMat);
    mechGroup.add(telemetryPoints);

    // Part 6: Sports Brake Caliper (high performance red block)
    const caliperGeom = new THREE.BoxGeometry(0.4, 1.1, 0.45);
    const caliperMat = new THREE.MeshPhongMaterial({
      color: 0x000000,
      emissive: 0xd01212, // Bright rich performance red
    });
    const caliper = new THREE.Mesh(caliperGeom, caliperMat);
    // Position fixed near top right corner of the rotor
    caliper.position.set(1.4, 1.2, 0.1);
    caliper.rotation.z = -Math.PI / 4;
    scene.add(caliper);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xef4444, 1.5); // Neon red ambient side glow
    dirLight2.position.set(-5, -3, 2);
    scene.add(dirLight2);

    // Interactive mouse trackers
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Map to normalized coordinates -1 to 1
      mouseX = (x / width) * 2 - 1;
      mouseY = -(y / height) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Scroll linkage tracker
    let scrollPercent = 0;
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      scrollPercent = window.scrollY / docHeight;
    };
    window.addEventListener("scroll", onScroll);

    // Animation Loop
    let baseRotationSpeed = 0.02;
    let animateId: number;

    const clock = new THREE.Clock();

    const animate = () => {
      animateId = requestAnimationFrame(animate);

      // Scroll changes rotational velocity & camera depth beautifully!
      const elapsed = clock.getElapsedTime();
      const scrollSpeedBoost = scrollPercent * 0.12;
      const activeSpeed = baseRotationSpeed + scrollSpeedBoost;

      // Update telemetry RPM text
      const currentRPM = Math.round(1200 + scrollPercent * 4800);
      const isBoosting = currentRPM > 1300;
      setCurrentSpeedLabel(`RPM: ${currentRPM} ${isBoosting ? "(ACCELERATING)" : "(IDLE)"}`);

      // Auto rotation of mechanical group
      mechGroup.rotation.z -= activeSpeed;
      treadRing.rotation.z += activeSpeed * 0.5;

      // Telemetry points pulsing
      const scalePulse = 1.0 + Math.sin(elapsed * 4) * 0.05;
      telemetryPoints.scale.set(scalePulse, scalePulse, scalePulse);

      // Inertia mouse tilt
      targetX += (mouseX - targetX) * 0.08;
      targetY += (mouseY - targetY) * 0.08;

      mechGroup.rotation.y = targetX * 0.6;
      mechGroup.rotation.x = -targetY * 0.6;

      // Camera dynamic depth with scroll
      camera.position.z = 8.5 - scrollPercent * 2.5;

      renderer.render(scene, camera);
    };

    animate();

    // Responsive resize handler with ResizeObserver
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight || 400;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(containerRef.current);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(animateId);
      if (renderer && renderer.domElement) {
        renderer.domElement.remove();
        renderer.dispose();
      }
    };
  }, []);

  if (initError) {
    return (
      <div id="three-fallback-container" className="flex flex-col items-center justify-center h-[400px] border border-zinc-800 rounded-2xl bg-zinc-950 p-6 text-center">
        <div className="w-24 h-24 rounded-full border-4 border-red-600/30 border-t-red-600 animate-spin flex items-center justify-center mb-6">
          <span className="text-zinc-400 font-mono text-xs">DIAG</span>
        </div>
        <h4 className="text-xl font-sans font-semibold text-white tracking-tight mb-2">ClutchX Telemetry Core</h4>
        <p className="text-sm text-zinc-400 max-w-sm mb-4">
          Interactive digital chassis diagnostics online. Your browser supports high performance hardware acceleration.
        </p>
        <div className="flex gap-4 font-mono text-xs text-red-500 bg-red-950/20 px-3 py-1.5 rounded-full border border-red-900/30">
          <span>SECURE DIAGNOSTICS ACTIVE</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] md:h-[450px] bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden group">
      {/* Absolute Overlays representing futuristic UI telemetry stats */}
      <div className="absolute top-4 left-4 z-10 bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 p-3 rounded-lg font-mono text-[11px] text-zinc-400 shadow-md">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-zinc-200 uppercase font-semibold">Rotational Telemetry</span>
        </div>
        <p className="text-red-500 font-bold">{currentSpeedLabel}</p>
        <p className="mt-1">Dampener: Coilover 40-way</p>
        <p className="text-[10px] text-zinc-500">Pressure: 32 PSI (Cold)</p>
      </div>

      <div className="absolute bottom-4 left-4 z-10 bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 p-2.5 rounded-lg font-mono text-[10px] text-zinc-500 hidden sm:block">
        <p className="text-zinc-300 font-semibold mb-0.5">ClutchX 3D Sensor V2</p>
        <div className="flex gap-2">
          <span>X: {Number(cameraRefZ().toFixed(2))}</span>
          <span>Pitch: Tiltable</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <span className="bg-red-600/10 text-red-500 text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-red-600/30 text-right">
          3D MODEL VIEW
        </span>
        <span className="bg-zinc-900/80 text-zinc-400 text-[9px] font-mono px-2 py-0.5 rounded text-right">
          Drag / Move mouse to rotate
        </span>
      </div>

      {/* Render Canvas Target */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}

// Pseudo calculation for display depth
function cameraRefZ() {
  return typeof window !== "undefined" ? 8.5 - (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)) * 2.5 : 8.5;
}
