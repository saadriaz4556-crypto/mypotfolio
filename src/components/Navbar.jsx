import { useEffect, useState } from 'react';

function Navbar({ theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const allSections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
      const navHeight = document.querySelector('nav').offsetHeight;
      let current = '';
      
      allSections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= navHeight + 120) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    }
  };

  return (
    <nav id="nav">
      <a href="#hero" className="nav-logo">
        &lt;<em>saad</em>riaz /&gt;
      </a>
      
      <ul className="nav-links">
        <li>
          <a 
            href="#projects" 
            data-section="projects"
            className={activeSection === 'projects' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, '#projects')}
          >
            Work
          </a>
        </li>
        <li>
          <a 
            href="#skills" 
            data-section="skills"
            className={activeSection === 'skills' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, '#skills')}
          >
            Skills
          </a>
        </li>
        <li>
          <a 
            href="#certifications" 
            data-section="certifications"
            className={activeSection === 'certifications' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, '#certifications')}
          >
            Certifications
          </a>
        </li>
        <li>
          <a 
            href="#photography" 
            data-section="photography"
            className={activeSection === 'photography' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, '#photography')}
          >
            Photography
          </a>
        </li>
        <li>
          <a 
            href="#about" 
            data-section="about"
            className={activeSection === 'about' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, '#about')}
          >
            About
          </a>
        </li>
        <li>
          <a 
            href="#contact" 
            data-section="contact"
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Contact
          </a>
        </li>
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        <button className="theme-toggle" onClick={toggleTheme}>
          <div className="toggle-icons">
            <span>🌙</span>
            <span>☀️</span>
          </div>
        </button>
        <div className="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
