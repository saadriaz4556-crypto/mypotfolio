import { useState, useEffect } from 'react';

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hamburger = document.getElementById('hamburger');
    
    const handleHamburgerClick = () => {
      setIsOpen(prev => !prev);
    };

    if (hamburger) {
      hamburger.addEventListener('click', handleHamburgerClick);
    }

    return () => {
      if (hamburger) {
        hamburger.removeEventListener('click', handleHamburgerClick);
      }
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavClick = (e, href) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.getElementById(href.substring(1));
      if (target) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
        const startY = window.pageYOffset;
        const dist = top - startY;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / 800, 1);
          const ease = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          
          window.scrollTo(0, startY + dist * ease);
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };
        
        requestAnimationFrame(animateScroll);
      }
      closeMenu();
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`} id="mobileMenu">
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')}>Home</a>
        <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Work</a>
        <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a>
        <a href="#certifications" onClick={(e) => handleNavClick(e, '#certifications')}>Certifications</a>
        <a href="#photography" onClick={(e) => handleNavClick(e, '#photography')}>Photography</a>
        <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
    </div>
  );
}

export default MobileMenu;
