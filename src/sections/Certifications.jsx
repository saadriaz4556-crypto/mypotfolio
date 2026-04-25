import { useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { certificatesData } from '../data/certificates';
import CertModal from '../components/CertModal';

function Certifications() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);
  
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCert(null);
  };

  return (
    <section id="certifications" ref={sectionRef}>
      <div className="sec-label reveal">ACHIEVEMENTS</div>
      <h2 className="sec-title reveal">Certifications</h2>
      <p className="sec-desc reveal">
        Professional certifications that validate expertise and commitment to continuous learning.
      </p>
      
      <div className="certs-grid">
        {certificatesData.map((cert, index) => (
          <div 
            className="cert-card reveal" 
            key={index}
            onClick={() => openModal(cert)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="cert-icon">{cert.icon}</div>
            <div className="cert-title">{cert.title}</div>
            <div className="cert-issuer">{cert.issuer}</div>
            <div className="cert-date">{cert.date}</div>
            <div className="cert-desc">{cert.desc}</div>
            <button 
              className="cert-btn"
              onClick={(e) => {
                e.stopPropagation();
                openModal(cert);
              }}
            >
              🔍 View Details
            </button>
          </div>
        ))}
      </div>

      <CertModal 
        isOpen={isModalOpen} 
        cert={selectedCert} 
        onClose={closeModal} 
      />
    </section>
  );
}

export default Certifications;
