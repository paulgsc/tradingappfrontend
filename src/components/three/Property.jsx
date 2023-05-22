import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Property = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create the scene
    const scene = new THREE.Scene();

    const sceneRange = {
      minX: -10,
      maxX: 10,
      minY: -10,
      maxY: 10,
      minZ: -10,
      maxZ: 10,
    };

    // Create the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    // Create the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);
    renderer.setClearColor(0xffa500);

    // Array to store firework particles
    const fireworks = [];

    // Firework particle geometry and material

    const particleGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    let timeoutId = null;

    // Animation function
    const animate = () => {
      timeoutId = null; // Reset the timeoutId at the start of each loop
      clearTimeout(timeoutId);

      // Create new firework particles
      if (Math.random() < 0.08) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        // Randomize particle position within a desired range
        particle.position.set(
          Math.random() * 20 - 10, // Random x-coordinate between -10 and 10
          Math.random() * 20 - 10, // Random y-coordinate between -10 and 10
          Math.random() * 20 - 10 // Random z-coordinate between -10 and 10
        );
        fireworks.push(particle);
        scene.add(particle);
      }

      // Update firework particles' positions and scale
      fireworks.forEach((particle) => {
        if (particle.position.y >= 5) {
          scene.remove(particle);
          fireworks.splice(fireworks.indexOf(particle), 1);
        }
      });

      // Render the scene with the camera
      renderer.render(scene, camera);

      // Request the next animation frame
      requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      animate();
      timeoutId = setTimeout(() => {
        fireworks.forEach((particle) => {
          scene.remove(particle);
        });
        fireworks.length = 0;
        startAnimation();
      }, 4000);
    };

    // Start the animation loop
    startAnimation();

    // Cleanup on component unmount
    return () => {
      // Clear the timeout on unmount
      clearTimeout(timeoutId);
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default Property;
