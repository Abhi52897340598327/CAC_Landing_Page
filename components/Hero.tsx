'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface BrainSceneProps {
  cuttingPlaneY: number;
  cameraRotationX: number;
  cameraPosZ: number;
}

// Placeholder Brain Mesh (Simple geometric approximation)
function BrainMesh({ cuttingPlaneY }: { cuttingPlaneY: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(({ mouse }) => {
    if (meshRef.current) {
      // Subtle mouse-tracking rotation
      meshRef.current.rotation.x = mouse.y * 0.3;
      meshRef.current.rotation.y = mouse.x * 0.3;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Main Brain Sphere (placeholder for GLB model) */}
      <mesh position={[0, 0, 0]} castShadow>
        <icosahedronGeometry args={[1.5, 5]} />
        <meshPhongMaterial
          color="#0353A4"
          emissive="#006DAA"
          emissiveIntensity={0.3}
          wireframe={false}
          shininess={100}
        />
      </mesh>

      {/* Horizontal Cutting Plane - MRI Cross Section */}
      <mesh position={[0, cuttingPlaneY, 0.1]} rotation={[0, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial
          color="#B9D6F2"
          transparent
          opacity={0.4}
          emissive="#B9D6F2"
          emissiveIntensity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glow ring around cutting plane */}
      <mesh position={[0, cuttingPlaneY, 0.05]}>
        <torusGeometry args={[2.2, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#B9D6F2"
          emissive="#B9D6F2"
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// Camera Controller with Scroll-linked animations
function CameraController({ rotationX, posZ }: { rotationX: number; posZ: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Smooth camera positioning
    camera.position.z = gsap.utils.interpolate(camera.position.z, posZ, 0.1);
    camera.rotation.x = gsap.utils.interpolate(camera.rotation.x, rotationX, 0.1);
    camera.updateProjectionMatrix();
  });

  return null;
}

// Main 3D Canvas Component
function BrainScene({ cuttingPlaneY, cameraRotationX, cameraPosZ }: BrainSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      shadows
      dpr={1.5}
    >
      <color attach="background" args={['#061A40']} />

      {/* Lighting */}
      <ambientLight intensity={0.6} color="#B9D6F2" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        color="#0353A4"
        castShadow
      />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#006DAA" />

      {/* Brain Mesh */}
      <BrainMesh cuttingPlaneY={cuttingPlaneY} />

      {/* Camera Controller */}
      <CameraController rotationX={cameraRotationX} posZ={cameraPosZ} />

      {/* Controls - disabled during scroll animation */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
        maxPolarAngle={Math.PI * 0.6}
      />
    </Canvas>
  );
}

// Main Hero Component with Scroll Orchestration
export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const [cuttingPlaneY, setCuttingPlaneY] = useState(0);
  const [cameraRotationX, setCameraRotationX] = useState(0);
  const [cameraPosZ, setCameraPosZ] = useState(3.5);
  const [textOpacity, setTextOpacity] = useState(1);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Scroll-linked animation using ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom center',
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;

        // Cutting plane moves from -1 to 1 as user scrolls through section
        setCuttingPlaneY(gsap.utils.interpolate(-1, 1, progress));

        // Camera dollies up and pitches down 90° as progress increases
        setCameraRotationX(gsap.utils.interpolate(0, -Math.PI / 2, progress));
        setCameraPosZ(gsap.utils.interpolate(3.5, 0.5, progress));

        // Fade out text overlay in second half of scroll
        setTextOpacity(Math.max(0, 1 - Math.max(0, (progress - 0.5) * 2)));
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, { dependencies: [] });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-navy via-navy to-sapphire"
    >
      {/* 3D Canvas Container */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full"
      >
        <BrainScene 
          cuttingPlaneY={cuttingPlaneY}
          cameraRotationX={cameraRotationX}
          cameraPosZ={cameraPosZ}
        />
      </div>

      {/* Text Overlay */}
      <div
        ref={textOverlayRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        style={{
          opacity: textOpacity,
          transition: 'opacity 0.05s ease-out',
        }}
      >
        <h1 className="text-7xl md:text-8xl font-black text-ice drop-shadow-2xl tracking-tight mb-6">
          NeuroLens
        </h1>
        <p className="text-xl md:text-2xl text-ice/80 max-w-3xl text-center drop-shadow-lg">
          Accessible neuro-oncology diagnostics powered by AI
        </p>
        <div className="absolute bottom-12 text-ice/60 animate-pulse">
          <p className="text-sm">Scroll to explore</p>
          <svg
            className="w-5 h-5 mx-auto mt-2 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-sapphire via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
