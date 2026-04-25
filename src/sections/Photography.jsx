import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

function Photography() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  const photos = [
    { emoji: '🌲', height: '260px', bg: 'linear-gradient(160deg,#1a3a2a,#2a5a3a,#0f2f1a)', tag: 'NATURE' },
    { emoji: '🌊', height: '180px', bg: 'linear-gradient(160deg,#1a2a3e,#284060,#101830)', tag: 'LANDSCAPE' },
    { emoji: '🌅', height: '300px', bg: 'linear-gradient(160deg,#2a1a08,#4a2a10,#2f1a06)', tag: 'GOLDEN HOUR' },
    { emoji: '🌌', height: '220px', bg: 'linear-gradient(160deg,#0a0a1a,#1a1a30,#08081a)', tag: 'NIGHT SKY' },
    { emoji: '🍃', height: '160px', bg: 'linear-gradient(160deg,#1a2a0a,#2a4a10,#1a2a06)', tag: 'MACRO' },
    { emoji: '🌃', height: '280px', bg: 'linear-gradient(160deg,#1a0a2a,#2a1a3a,#10061a)', tag: 'STREET' },
    { emoji: '🏔️', height: '200px', bg: 'linear-gradient(160deg,#0a1a2a,#1a2a3a,#0a1220)', tag: 'MOUNTAINS' },
    { emoji: '🌹', height: '240px', bg: 'linear-gradient(160deg,#2a0808,#4a1010,#1a0606)', tag: 'FLORA' },
    { emoji: '🌿', height: '190px', bg: 'linear-gradient(160deg,#0a1a0a,#1a2a10,#081a08)', tag: 'FOREST' },
  ];

  return (
    <section id="photography" ref={sectionRef}>
      <div className="photo-header">
        <div>
          <div className="sec-label reveal">THROUGH THE LENS</div>
          <h2 className="sec-title reveal">Photography</h2>
          <p className="sec-desc reveal" style={{ marginBottom: 0 }}>
            Dark &amp; moody nature photography.
          </p>
        </div>
        <a 
          href="https://instagram.com/clicks._.by._.saadi" 
          target="_blank" 
          className="btn btn-outline reveal"
        >
          📸&nbsp; @clicks._.by._.saadi
        </a>
      </div>

      <div className="masonry reveal">
        {photos.map((photo, index) => (
          <div className="masonry-item" key={index}>
            <div 
              className="photo-placeholder"
              style={{ 
                height: photo.height, 
                background: photo.bg 
              }}
            >
              {photo.emoji}
            </div>
            <div className="photo-overlay">
              <span className="photo-tag">{photo.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="insta-cta reveal">
        <p className="insta-handle">
          📸 instagram.com/clicks._.by._.saadi
        </p>
        <a 
          href="https://instagram.com/clicks._.by._.saadi" 
          target="_blank" 
          className="btn btn-warm"
        >
          Follow on Instagram
        </a>
      </div>
    </section>
  );
}

export default Photography;
