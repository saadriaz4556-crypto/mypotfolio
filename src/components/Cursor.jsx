import { useEffect } from 'react';

function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    
    if (!cursor || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };

    const handleMouseEnter = (e) => {
      cursor.style.width = '18px';
      cursor.style.height = '18px';
      cursor.style.background = '#FF7A7A';
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = '#FF7A7A';
    };

    const handleMouseLeave = (e) => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursor.style.background = '#635BFF';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = '#635BFF';
    };

    document.addEventListener('mousemove', handleMouseMove);
    requestAnimationFrame(animateRing);

    const interactiveElements = document.querySelectorAll(
      'a, button, .proj-card, .skill-card-3d, .c-link, .masonry-item, .hero-name-letter, .cert-card, .social-icon-link'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return null;
}

export default Cursor;
