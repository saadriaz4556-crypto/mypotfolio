import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function GlobeComponent() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const backLight = new THREE.DirectionalLight(0x4F46E5, 0.3);
    backLight.position.set(-5, -3, -5);
    scene.add(backLight);

    // Globe group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Earth sphere
    const earthGeometry = new THREE.SphereGeometry(1.5, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a5f8a,
      shininess: 25,
      specular: 0x333333,
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earth);

    // Load Earth texture
    textureLoader.load(
      'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg',
      (texture) => {
        earthMaterial.map = texture;
        earthMaterial.color.set(0xffffff);
        earthMaterial.needsUpdate = true;
        setIsLoaded(true);
      },
      undefined,
      (error) => {
        console.warn('Earth texture failed to load, using fallback color', error);
        setIsLoaded(true);
      }
    );

    // Cloud layer
    const cloudGeometry = new THREE.SphereGeometry(1.52, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: 0.3,
      color: 0xffffff,
    });

    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    globeGroup.add(clouds);

    textureLoader.load(
      'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png',
      (texture) => {
        cloudMaterial.map = texture;
        cloudMaterial.needsUpdate = true;
      }
    );

    // Atmosphere glow (custom shader)
    const atmosphereVertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const atmosphereFragmentShader = `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        gl_FragColor = vec4(0.0, 0.83, 1.0, 1.0) * intensity;
      }
    `;

    const atmosphereGeometry = new THREE.SphereGeometry(1.65, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphere);

    // Helper: Convert lat/lng to 3D coordinates
    const latLngToVector3 = (lat, lng, radius) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return new THREE.Vector3(x, y, z);
    };

    // Arcs data
    const arcs = [
      { start: { lat: 24.8607, lng: 67.0011 }, end: { lat: 51.5074, lng: -0.1278 } },
      { start: { lat: 31.5204, lng: 74.3587 }, end: { lat: 40.7128, lng: -74.0060 } },
      { start: { lat: 33.6844, lng: 73.0479 }, end: { lat: 25.2048, lng: 55.2708 } },
      { start: { lat: 33.6844, lng: 73.0479 }, end: { lat: 52.5200, lng: 13.4050 } },
    ];

    // Create arcs
    const arcMeshes = [];
    const arcDots = [];

    arcs.forEach((arc, index) => {
      const startPoint = latLngToVector3(arc.start.lat, arc.start.lng, 1.5);
      const endPoint = latLngToVector3(arc.end.lat, arc.end.lng, 1.5);
      
      // Control point (midpoint with height)
      const midPoint = startPoint.clone().add(endPoint).multiplyScalar(0.5);
      const distance = startPoint.distanceTo(endPoint);
      midPoint.normalize().multiplyScalar(1.5 + distance * 0.3);

      // Create curve
      const curve = new THREE.QuadraticBezierCurve3(startPoint, midPoint, endPoint);
      const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.008, 8, false);
      
      // Arc material with glow
      const arcMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0,
      });

      const arcMesh = new THREE.Mesh(tubeGeometry, arcMaterial);
      globeGroup.add(arcMesh);
      arcMeshes.push({ mesh: arcMesh, material: arcMaterial, delay: index * 0.5 });

      // Glow tube (larger, more transparent)
      const glowGeometry = new THREE.TubeGeometry(curve, 64, 0.02, 8, false);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0,
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      globeGroup.add(glowMesh);

      // Animated dot along arc
      const dotGeometry = new THREE.SphereGeometry(0.025, 16, 16);
      const dotMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0,
      });
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      globeGroup.add(dot);
      arcDots.push({ dot, material: dotMaterial, curve, delay: index * 0.5 });
    });

    // City location dots
    const cities = [
      { lat: 33.6844, lng: 73.0479 },
      { lat: 51.5074, lng: -0.1278 },
      { lat: 40.7128, lng: -74.0060 },
      { lat: 25.2048, lng: 55.2708 },
      { lat: 52.5200, lng: 13.4050 },
    ];

    const cityDots = [];

    cities.forEach((city) => {
      const position = latLngToVector3(city.lat, city.lng, 1.51);
      
      // Main dot
      const dotGeometry = new THREE.SphereGeometry(0.03, 16, 16);
      const dotMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.9,
      });
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.copy(position);
      globeGroup.add(dot);

      // Pulse ring
      const ringGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.4,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(position);
      globeGroup.add(ring);

      cityDots.push({ dot, ring, ringMaterial });
    });

    // Interaction state
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0 };
    let isHovering = false;
    let autoRotationSpeed = 0.002;

    // Mouse events
    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y,
        };

        rotationVelocity.x = deltaMove.y * 0.005;
        rotationVelocity.y = deltaMove.x * 0.005;

        globeGroup.rotation.x += rotationVelocity.x;
        globeGroup.rotation.y += rotationVelocity.y;

        previousMousePosition = {
          x: e.clientX,
          y: e.clientY,
        };
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    let animationFrameId;
    let startTime = Date.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip rendering when tab is not visible
      if (document.hidden) return;

      const elapsedTime = (Date.now() - startTime) / 1000;

      // Auto-rotation
      if (!isDragging) {
        const currentSpeed = isHovering ? autoRotationSpeed * 0.5 : autoRotationSpeed;
        globeGroup.rotation.y += currentSpeed;

        // Spring-back: gradually reduce rotation velocity
        rotationVelocity.x *= 0.95;
        rotationVelocity.y *= 0.95;
        globeGroup.rotation.x += rotationVelocity.x;
        globeGroup.rotation.y += rotationVelocity.y;
      }

      // Cloud rotation (slightly different speed)
      clouds.rotation.y += 0.0005;

      // Animate arcs (sequential fade-in)
      arcMeshes.forEach(({ material, delay }) => {
        const arcStartTime = delay;
        if (elapsedTime >= arcStartTime) {
          const fadeProgress = Math.min((elapsedTime - arcStartTime) * 2, 1);
          material.opacity = fadeProgress * 0.6;
        }
      });

      // Animate dots along arcs
      arcDots.forEach(({ dot, material, curve, delay }) => {
        const arcStartTime = delay;
        if (elapsedTime >= arcStartTime) {
          material.opacity = 1;
          const dotProgress = ((elapsedTime - arcStartTime) * 0.3) % 1;
          const position = curve.getPoint(dotProgress);
          dot.position.copy(position);
        }
      });

      // Pulse city dots
      cityDots.forEach(({ ring, ringMaterial }, index) => {
        const pulse = Math.sin(elapsedTime * 2 + index * 0.5) * 0.5 + 0.5;
        const scale = 1 + pulse * 0.5;
        ring.scale.set(scale, scale, scale);
        ringMaterial.opacity = 0.4 - pulse * 0.3;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      
      // Dispose Three.js resources
      earthGeometry.dispose();
      earthMaterial.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '3px solid rgba(0,212,255,0.2)',
            borderTop: '3px solid #00d4ff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
        </div>
      )}
      <canvas
        ref={canvasRef}
        id="globe-canvas"
        style={{
          width: '100%',
          height: '100%',
          opacity: isLoaded ? 1 : 0.3,
          transition: 'opacity 0.5s ease',
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default GlobeComponent;
