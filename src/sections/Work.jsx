import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

function Work() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="sec-label reveal">PORTFOLIO</div>
      <h2 className="sec-title reveal">Featured Projects</h2>
      <p className="sec-desc reveal">
        Real-world applications built from design to deployment.
      </p>
      
      <div className="projects-grid">
        <div className="proj-card reveal">
          <div className="proj-banner proj-banner-1">
            🤝
            <span className="proj-num">01</span>
            <span className="proj-type-badge">FULL STACK WEB</span>
          </div>
          <div className="proj-body">
            <div className="proj-techs">
              <span className="proj-tech">React.js</span>
              <span className="proj-tech">Node.js</span>
              <span className="proj-tech">Firebase</span>
            </div>
            <h3 className="proj-name">TeamProject</h3>
            <p className="proj-desc">
              Collaborative project management tool with real-time updates.
            </p>
            <div className="proj-links">
              <a 
                href="https://github.com/saadriaz4556-crypto/teamproject" 
                target="_blank" 
                className="btn btn-outline"
                style={{ padding: '.6rem 1.2rem', fontSize: '.75rem' }}
              >
                ⚡ Code
              </a>
              <a 
                href="https://dancing-dango-e9795e.netlify.app/" 
                target="_blank" 
                className="btn btn-primary"
                style={{ padding: '.6rem 1.2rem', fontSize: '.75rem' }}
              >
                ▶ Live Demo
              </a>
            </div>
          </div>
        </div>

        <div className="proj-card reveal">
          <div className="proj-banner proj-banner-2">
            🌿
            <span className="proj-num">02</span>
            <span className="proj-type-badge">FLUTTER APP</span>
          </div>
          <div className="proj-body">
            <div className="proj-techs">
              <span className="proj-tech">Flutter</span>
              <span className="proj-tech">Dart</span>
              <span className="proj-tech">Supabase</span>
            </div>
            <h3 className="proj-name">Natures</h3>
            <p className="proj-desc">
              Nature exploration app with stunning visual galleries.
            </p>
            <div className="proj-links">
              <a 
                href="https://github.com/saadriaz4556-crypto/natures" 
                target="_blank" 
                className="btn btn-outline"
                style={{ padding: '.6rem 1.2rem', fontSize: '.75rem' }}
              >
                ⚡ Code
              </a>
              <a 
                href="https://natures-black.vercel.app/" 
                target="_blank" 
                className="btn btn-primary"
                style={{ padding: '.6rem 1.2rem', fontSize: '.75rem' }}
              >
                ▶ Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Work;
