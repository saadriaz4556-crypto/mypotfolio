import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

function About() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

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
              <div className="tl-year">ONGOING · FINAL YEAR</div>
              <div className="tl-degree">BSCS — Bachelor of Computer Science</div>
              <div className="tl-inst">University of Punjab, Lahore</div>
            </div>
            
            <div className="tl-item">
              <div className="tl-dot"></div>
              <div className="tl-year">INTERMEDIATE</div>
              <div className="tl-degree">ICS — Computer Science</div>
              <div className="tl-inst">Intermediate Level</div>
            </div>
            
            <div className="tl-item">
              <div className="tl-dot"></div>
              <div className="tl-year">MATRICULATION</div>
              <div className="tl-degree">Biology Group</div>
              <div className="tl-inst">Mirpur Board</div>
            </div>
          </div>
        </div>

        <div className="about-aside reveal">
          <div className="info-card">
            <div className="info-card-title">// QUICK INFO</div>
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
              <span className="info-v">BSCS (Final Year)</span>
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

          <div className="info-card">
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
