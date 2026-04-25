import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Hero() {
  const canvasRef = useRef(null);
  const heroNameRef = useRef(null);

  // Three.js Globe
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.offsetWidth || 500;
    const H = canvas.offsetHeight || 500;
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.2;

    const geo = new THREE.SphereGeometry(1, 52, 52);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x635BFF,
      wireframe: false,
      transparent: true,
      opacity: 0.7,
      shininess: 60,
      specular: 0x4F46E5
    });
    const globe = new THREE.Mesh(geo, mat);
    scene.add(globe);

    const wf = new THREE.Mesh(
      new THREE.SphereGeometry(1.015, 30, 30),
      new THREE.MeshBasicMaterial({ 
        color: 0x00D4FF, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.1 
      })
    );
    scene.add(wf);

    const wf2 = new THREE.Mesh(
      new THREE.SphereGeometry(1.03, 20, 20),
      new THREE.MeshBasicMaterial({ 
        color: 0xA78BFA, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.06 
      })
    );
    scene.add(wf2);

    const r1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.28, 0.014, 8, 100),
      new THREE.MeshBasicMaterial({ 
        color: 0x635BFF, 
        transparent: true, 
        opacity: 0.45 
      })
    );
    r1.rotation.x = Math.PI / 2;
    scene.add(r1);

    const r2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.55, 0.008, 8, 100),
      new THREE.MeshBasicMaterial({ 
        color: 0xA78BFA, 
        transparent: true, 
        opacity: 0.25 
      })
    );
    r2.rotation.x = Math.PI / 3;
    r2.rotation.y = Math.PI / 6;
    scene.add(r2);

    const r3 = new THREE.Mesh(
      new THREE.TorusGeometry(1.42, 0.005, 8, 80),
      new THREE.MeshBasicMaterial({ 
        color: 0xFF7A7A, 
        transparent: true, 
        opacity: 0.2 
      })
    );
    r3.rotation.x = Math.PI / 4;
    r3.rotation.y = -Math.PI / 5;
    scene.add(r3);

    scene.add(new THREE.AmbientLight(0x334466, 1.6));
    
    const pL = new THREE.PointLight(0x635BFF, 2, 8);
    pL.position.set(3, 3, 3);
    scene.add(pL);

    const pL2 = new THREE.PointLight(0xA78BFA, 1.2, 6);
    pL2.position.set(-3, -2, -2);
    scene.add(pL2);

    const pL3 = new THREE.PointLight(0xFF7A7A, 0.7, 5);
    pL3.position.set(1, -2, 3);
    scene.add(pL3);

    let mouseX = 0, mouseY = 0, t = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const animate = () => {
      requestAnimationFrame(animate);
      t += 0.008;

      globe.rotation.y = t * 0.25 + mouseX * 0.3;
      globe.rotation.x = mouseY * 0.2;
      
      wf.rotation.y = -t * 0.18 + mouseX * 0.25;
      wf.rotation.x = mouseY * 0.15;
      
      wf2.rotation.y = t * 0.12 - mouseX * 0.2;
      wf2.rotation.x = -mouseY * 0.12;
      
      r1.rotation.z = t * 0.3;
      r2.rotation.y = t * 0.2;
      r3.rotation.z = -t * 0.22;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const s = canvas.offsetWidth;
      renderer.setSize(s, s);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  // Animated Name
  useEffect(() => {
    const container = heroNameRef.current;
    if (!container) return;

    const text = 'Saad Riaz';
    container.innerHTML = '';

    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.classList.add('hero-name-letter');
      
      if (char === ' ') {
        span.classList.add('space');
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = char;
      }
      
      span.style.animationDelay = `${0.25 + i * 0.07}s`;
      container.appendChild(span);
    });

    const handleMouseEnter = () => {
      container.querySelectorAll('.hero-name-letter').forEach((letter, i) => {
        letter.style.animation = 'none';
        letter.offsetHeight; // Trigger reflow
        letter.style.animation = `letterDrop 0.55s ${i * 0.04}s cubic-bezier(0.34,1.56,0.64,1) forwards`;
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <section id="hero">
      <div className="hero-left">
        <div className="hero-badge">⚡ Available for Freelance</div>
        
        <h1 className="hero-name-container" ref={heroNameRef}></h1>
        
        <p className="hero-tagline">
          Full Stack Developer (Mobile + Web) &amp; Photographer
        </p>
        
        <h2 className="hero-headline">
          "Building <span className="highlight">scalable apps</span> and capturing <span className="highlight">moody aesthetics</span>."
        </h2>
        
        <p className="hero-sub">
          Flutter, React, Node.js — and a camera when the code compiles.
        </p>
        
        <div className="hero-btns">
          <a href="#projects" className="btn btn-primary">▶&nbsp; View My Work</a>
          <a href="#contact" className="btn btn-outline">✉&nbsp; Hire Me</a>
        </div>
        
        <div className="hero-social-row social-icons-row">
          <a href="https://www.tiktok.com/@itx._.saadi2" target="_blank" className="social-icon-link" title="TikTok">
            <svg viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
          <a href="https://instagram.com/clicks._.by._.saadi" target="_blank" className="social-icon-link" title="Instagram">
            <svg viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/saad-riaz-3b36063" target="_blank" className="social-icon-link" title="LinkedIn">
            <svg viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="https://www.facebook.com/share/1N36hNQD8o/" target="_blank" className="social-icon-link" title="Facebook">
            <svg viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-profile-img-wrap">
          <div className="hero-profile-img">
            <div className="hero-profile-img-inner">
              <span>👨‍💻</span>
            </div>
          </div>
        </div>
        
        <canvas id="globe-canvas" ref={canvasRef}></canvas>
        
        <div className="profile-float">
          <div className="profile-avatar">👨‍💻</div>
          <div>
            <div className="profile-name">Saad Riaz</div>
            <div className="profile-role">Full Stack Dev &amp; Photographer</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse"></div>
        <span>SCROLL</span>
      </div>
    </section>
  );
}

export default Hero;
