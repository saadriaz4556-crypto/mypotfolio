import { useRef, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';

function About() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  const quickInfoRef = useRef(null);
  const interestsRef = useRef(null);

  const handleMouseMove = (e, cardRef) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    card.style.animationPlayState = 'paused, running';
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
  };

  const handleMouseLeave = (cardRef) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    
    card.style.animationPlayState = 'running, running';
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const tags = entry.target.querySelectorAll('.stag');
          tags.forEach((tag, index) => {
            setTimeout(() => {
              tag.classList.add('visible');
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (interestsRef.current) {
      observer.observe(interestsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      <div className="sec-label reveal">WHO I AM</div>
      <h2 className="sec-title reveal">About Me</h2>
      
      <div className="about-grid">
        <div className="about-text-block reveal">
          <p>
            I'm <span className="hl">Saad Riaz</span>, a Computer Science student at <span className="hl">Punjab University</span> building cross-platform apps with <span className="hl">Flutter</span> and web apps with <span className="hl">React</span> &amp; <span className="hl">Node.js</span>.
          </p>
          <p>
            When I'm not coding, you'll find me capturing moody landscapes through my lens.
          </p>
          
          <div className="edu-title">// EDUCATION</div>
          
          <div className="timeline">
            <div className="tl-item">
              <div className="tl-dot active"></div>
              <div className="tl-year">Graguation</div>
              <div className="tl-degree">BSCS Bachelor of Computer Science</div>
              <div className="tl-inst">University of Punjab, Lahore</div>
            </div>
            
            <div className="tl-item">
              <div className="tl-dot"></div>
              <div className="tl-year">INTERMEDIATE</div>
              <div className="tl-degree">ICS Computer Science</div>
              <div className="tl-inst">BISE Rawalpindi </div>
            </div>
            
            <div className="tl-item">
              <div className="tl-dot"></div>
              <div className="tl-year">MATRICULATION</div>
              <div className="tl-degree">Biology Group</div>
              <div className="tl-inst">Mirpur Board, AJ&K</div>
            </div>
          </div>
        </div>

        <div className="about-aside reveal">
          <div 
            className="info-card quick-info"
            ref={quickInfoRef}
            onMouseMove={(e) => handleMouseMove(e, quickInfoRef)}
            onMouseLeave={() => handleMouseLeave(quickInfoRef)}
          >
            <div className="info-card-title"> QUICK INFO</div>
            <div className="info-row">
              <span className="info-k">Name</span>
              <span className="info-v">Saad Riaz</span>
            </div>
            <div className="info-row">
              <span className="info-k">Location</span>
              <span className="info-v">Rawalpindi, PK</span>
            </div>
            <div className="info-row">
              <span className="info-k">Degree</span>
              <span className="info-v">BSCS</span>
            </div>
            <div className="info-row">
              <span className="info-k">Focus</span>
              <span className="info-v">Full Stack + Mobile</span>
            </div>
            <div className="info-row">
              <span className="info-k">Status</span>
              <span className="info-v green">● Open to Work</span>
            </div>
          </div>

          <div 
            className="info-card interests-card"
            ref={interestsRef}
            onMouseMove={(e) => handleMouseMove(e, interestsRef)}
            onMouseLeave={() => handleMouseLeave(interestsRef)}
          >
            <div className="info-card-title">// INTERESTS</div>
            <div className="skill-tags">
              <span className="stag">Mobile Apps</span>
              <span className="stag">Web Dev</span>
              <span className="stag">Photography</span>
              <span className="stag">UI/UX</span>
              <span className="stag">Open Source</span>
            </div>
          </div>

          <a 
            href="#contact" 
            className="btn btn-primary"
            style={{ justifyContent: 'center' }}
          >
            ✉ Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
