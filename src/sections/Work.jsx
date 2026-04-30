import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

function Work() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.animationPlayState = 'paused, running';
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.animationPlayState = 'running, running';
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section id="projects" ref={sectionRef}>
      <div className="sec-label reveal">PORTFOLIO</div>
      <h2 className="sec-title reveal">Projects</h2>
      <p className="sec-desc reveal">
        Real-world applications built from design to deployment.
      </p>

      <div className="projects-grid">
        <div
          className="proj-card proj-card-3d proj-card-1 reveal"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="proj-banner proj-banner-1">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop" alt="Team Collaboration" className="proj-banner-img" />
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
                href="https://dancing-dango-e9795e.netlify.app/"
                target="_blank"
                className="btn btn-primary"
                style={{ padding: '7px 16px', fontSize: '12px', marginTop: '10px', width: 'fit-content' }}
              >
                ▶ Live Demo
              </a>
            </div>
          </div>
        </div>

        <div
          className="proj-card proj-card-3d proj-card-2 reveal"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="proj-banner proj-banner-2">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop" alt="Pakistani Mountain Landscape" className="proj-banner-img" />
          </div>
          <div className="proj-body">
            <div className="proj-techs">
              <span className="proj-tech">React.js</span>
              <span className="proj-tech">Node.js</span>
              <span className="proj-tech">Supabase</span>
            </div>
            <h3 className="proj-name">Natures</h3>
            <p className="proj-desc">
              Nature exploration app with stunning visual galleries.
            </p>
            <div className="proj-links">
              <a
                href="https://natures-black.vercel.app"
                target="_blank"
                className="btn btn-primary"
                style={{ padding: '7px 16px', fontSize: '12px', marginTop: '10px', width: 'fit-content' }}
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
