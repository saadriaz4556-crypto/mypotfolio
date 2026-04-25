import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

function Skills() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  const skills = [
    { icon: '📱', category: 'MOBILE', tags: ['Flutter', 'Dart', 'Riverpod'] },
    { icon: '🖥️', category: 'WEB FRONTEND', tags: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'JavaScript'] },
    { icon: '⚙️', category: 'BACKEND', tags: ['Node.js', 'Express', 'REST APIs', 'GraphQL'] },
    { icon: '🗄️', category: 'DATABASE', tags: ['Firebase', 'Supabase', 'MongoDB'] },
    { icon: '🎨', category: 'DESIGN', tags: ['Figma', 'Sketch', 'UX/UI', 'Prototyping'] },
    { icon: '🛠️', category: 'TOOLS', tags: ['Git', 'GitHub', 'VS Code', 'Docker'] },
  ];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 16;
    
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
    
    const shine = card.querySelector('.skill-card-shine');
    if (shine) {
      shine.style.background = `radial-gradient(ellipse at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    
    const shine = card.querySelector('.skill-card-shine');
    if (shine) {
      shine.style.background = 'radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, transparent 70%)';
    }
  };

  return (
    <section id="skills" ref={sectionRef}>
      <div className="sec-label reveal">TECH STACK</div>
      <h2 className="sec-title reveal">Skills &amp; Tools</h2>
      <p className="sec-desc reveal">
        Cross-platform expertise from mobile to backend — I build complete, polished solutions.
      </p>
      
      <div className="skills-wrap">
        {skills.map((skill, index) => (
          <div className="skill-card-3d reveal" key={index}>
            <div 
              className="skill-card-inner" 
              data-tilt
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="skill-card">
                <div className="skill-card-shine"></div>
                <div className="skill-icon">{skill.icon}</div>
                <div className="skill-cat">{skill.category}</div>
                <div className="skill-tags">
                  {skill.tags.map((tag, i) => (
                    <span className="stag" key={i}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
