import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

// Import images from assets
import pic1 from '../assets/pic1.jpeg';
import pic2 from '../assets/pic2.jpeg';
import pic11 from '../assets/pic11.jpeg';
import pic4 from '../assets/pic4.jpeg';
import pic5 from '../assets/pic5.jpeg';
import pic6 from '../assets/pic6.jpeg';
import pic10 from '../assets/pic10.jpeg';
import pic8 from '../assets/pic8.jpeg';
import pic9 from '../assets/pic9.jpeg';

function Photography() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  const photos = [
    { src: pic1, bg: 'linear-gradient(160deg,#1a3a2a,#2a5a3a,#0f2f1a)', tag: 'Rawalpindi' },
    { src: pic2, bg: 'linear-gradient(160deg,#1a2a3e,#284060,#101830)', tag: 'Islamabad' },
    { src: pic11, bg: 'linear-gradient(160deg,#2a1a08,#4a2a10,#2f1a06)', tag: '6th Road, Rawalpindi' },
    { src: pic4, bg: 'linear-gradient(160deg,#0a0a1a,#1a1a30,#08081a)', tag: 'Shamsabad Rawalpindi' },
    { src: pic5, bg: 'linear-gradient(160deg,#1a2a0a,#2a4a10,#1a2a06)', tag: 'Faisal Mosque Islamabad' },
    { src: pic6, bg: 'linear-gradient(160deg,#1a0a2a,#2a1a3a,#10061a)', tag: 'Azad Kashmir' },
    { src: pic10, bg: 'linear-gradient(160deg,#0a1a2a,#1a2a3a,#0a1220)', tag: 'MOUNTAINS Azad Kahsmir' },
    { src: pic8, bg: 'linear-gradient(160deg,#2a0808,#4a1010,#1a0606)', tag: 'Lake View Park Islamabad' },
    { src: pic9, bg: 'linear-gradient(160deg,#0a1a0a,#1a2a10,#081a08)', tag: 'Azad Kashmir' },
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
                width: '100%',
                aspectRatio: '4 / 5',
                background: photo.bg,
                overflow: 'hidden'
              }}
            >
              <img
                src={photo.src}
                alt={photo.tag}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />
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
