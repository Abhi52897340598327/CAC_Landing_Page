'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BrainSceneProps {
  cuttingPlaneY: number;
  cameraRotationX: number;
  cameraPosZ: number;
}

export default function BrainScene({
  cuttingPlaneY,
  cameraRotationX,
  cameraPosZ,
}: BrainSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    brainMesh: THREE.Group;
    cuttingPlane: THREE.Mesh;
    torusRing: THREE.Mesh;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x061a40);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xb9d6f2, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x0353a4, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x006daa, 0.5);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Brain mesh group
    const brainMesh = new THREE.Group();
    scene.add(brainMesh);

    // Main brain sphere
    const brainGeometry = new THREE.IcosahedronGeometry(1.5, 5);
    const brainMaterial = new THREE.MeshPhongMaterial({
      color: 0x0353a4,
      emissive: 0x006daa,
      emissiveIntensity: 0.3,
      shininess: 100,
    });
    const brainSphere = new THREE.Mesh(brainGeometry, brainMaterial);
    brainSphere.castShadow = true;
    brainMesh.add(brainSphere);

    // Cutting plane
    const planeGeometry = new THREE.PlaneGeometry(4, 4);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xb9d6f2,
      emissive: 0x006daa,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    const cuttingPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    cuttingPlane.position.z = 0.1;
    brainMesh.add(cuttingPlane);

    // Glowing torus ring
    const torusGeometry = new THREE.TorusGeometry(2.2, 0.08, 32, 64);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0xb9d6f2,
      emissive: 0x0353a4,
      emissiveIntensity: 1.2,
    });
    const torusRing = new THREE.Mesh(torusGeometry, torusMaterial);
    torusRing.rotation.x = Math.PI / 2;
    brainMesh.add(torusRing);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      brainMesh,
      cuttingPlane,
      torusRing,
    };

    // Mouse tracking
    const onMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      brainMesh.rotation.x = y * 0.3;
      brainMesh.rotation.y = x * 0.3;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Handle window resize
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Apply scroll-driven updates
      cuttingPlane.position.y = cuttingPlaneY;
      torusRing.position.y = cuttingPlaneY;

      // Smooth camera interpolation
      camera.position.z += (cameraPosZ - camera.position.z) * 0.08;
      camera.rotation.x += (cameraRotationX - camera.rotation.x) * 0.08;

      // Auto-rotate if no scroll happening
      brainMesh.rotation.z += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      brainGeometry.dispose();
      brainMaterial.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
    };
  }, [cuttingPlaneY, cameraRotationX, cameraPosZ]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
      }}
    />
  );
}
