// components/Sphere3D.tsx
'use client'; // IMPORTANT pour Next.js - indique que c'est un composant client

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Sphere3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // ========== SCENE ==========
    const scene = new THREE.Scene();
    
    // ========== CAMERA ==========
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // ========== RENDERER ==========
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // Fond transparent
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ========== GROUPE PRINCIPAL ==========
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // ========== 1. SPHERE WIREFRAME (Structure filaire) ==========
    const geometry = new THREE.IcosahedronGeometry(2, 2);
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xc5fb67, // Vert néon
      transparent: true,
      opacity: 0.3,
    });
    const wireframe = new THREE.LineSegments(
      wireframeGeometry,
      wireframeMaterial
    );
    sphereGroup.add(wireframe);

    // ========== 2. SPHERE INTÉRIEURE (Cœur lumineux) ==========
    const coreGeometry = new THREE.IcosahedronGeometry(1.8, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xc5fb67,
      transparent: true,
      opacity: 0.05,
      wireframe: true,
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    sphereGroup.add(coreSphere);

    // ========== 3. PARTICULES (Points autour de la sphère) ==========
    const particlesCount = 150;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      const radius = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      posArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i3 + 2] = radius * Math.cos(phi);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xc5fb67,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    sphereGroup.add(particlesMesh);

    // ========== 4. LIGNES DE CONNEXION ==========
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xc5fb67,
      transparent: true,
      opacity: 0.15,
    });

    const linePositions: number[] = [];
    for (let i = 0; i < particlesCount; i++) {
      for (let j = i + 1; j < particlesCount; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 1.2) {
          linePositions.push(
            posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
            posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    sphereGroup.add(lines);

    // ========== 5. ORBES LUMINEUSES ==========
    const orbGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const orbMaterial = new THREE.MeshBasicMaterial({
      color: 0xc5fb67,
      transparent: true,
      opacity: 0.9,
    });

    for (let i = 0; i < 8; i++) {
      const orb = new THREE.Mesh(orbGeometry, orbMaterial.clone());
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.2;
      orb.position.x = Math.cos(angle) * radius;
      orb.position.y = Math.sin(angle) * radius * 0.5;
      orb.position.z = Math.sin(angle) * radius;
      sphereGroup.add(orb);

      // Animation individuelle de chaque orbe
      const animateOrb = () => {
        orb.material.opacity = 0.5 + Math.sin(Date.now() * 0.003 + i) * 0.4;
        requestAnimationFrame(animateOrb);
      };
      animateOrb();
    }

    // ========== BOUCLE D'ANIMATION ==========
    let time = 0;
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      time += 0.005;

      // Rotation de la sphère
      sphereGroup.rotation.y = time * 0.5;
      sphereGroup.rotation.x = Math.sin(time * 0.3) * 0.1;

      // Pulse du cœur
      const scale = 1 + Math.sin(time * 2) * 0.02;
      coreSphere.scale.set(scale, scale, scale);

      // Animation des particules
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + i) * 0.002;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // ========== GESTION DU REDIMENSIONNEMENT ==========
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // ========== NETTOYAGE ==========
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      // Dispose toutes les géométries et matériaux
      geometry.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      orbGeometry.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        opacity: 0,
        animation: 'fadeIn 0.5s ease-out 0.5s forwards',
      }}
    />
  );
};

export default Sphere3D;