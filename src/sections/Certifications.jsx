import { useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { certificatesData } from '../data/certificates';
import PdfModal from '../components/PdfModal';

// Import PDF certificates
import cert1 from '../assets/Build a computer vision app with Azure.pdf';
import cert2 from '../assets/CERTIFIED CSCSO.pdf';
import cert3 from '../assets/Generative AI Certification.pdf';
import cert4 from '../assets/ISOIEC 270012022 INFORMATION.pdf';
import cert5 from '../assets/IT Sales Job Simulation.pdf';
import cert6 from '../assets/Introduction to Vulnerability Management.pdf';
import cert7 from '../assets/Introduction to generative AI and agents.pdf';

const pdfMap = {
  "Build a computer vision app with Azure": cert1,
  "CERTIFIED CSCSO": cert2,
  "Generative AI Certification": cert3,
  "ISOIEC 270012022 INFORMATION": cert4,
  "IT Sales Job Simulation": cert5,
  "Introduction to Vulnerability Management": cert6,
  "Introduction to generative AI and agents": cert7
};

function Certifications() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);
  
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (pdfUrl) => {
    setSelectedPdfUrl(pdfUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdfUrl(null);
  };

  const certColors = [
    { bg: '#1b5e20', border: '#2e7d32' },
    { bg: '#e65100', border: '#f57c00' },
    { bg: '#1a237e', border: '#283593' },
    { bg: '#880e4f', border: '#ad1457' },
    { bg: '#006064', border: '#00838f' },
    { bg: '#4a148c', border: '#6a1b9a' },
    { bg: '#bf360c', border: '#d84315' },
    { bg: '#01579b', border: '#0277bd' },
  ];

  return (
    <section id="certifications" ref={sectionRef}>
      <div className="sec-label reveal">ACHIEVEMENTS</div>
      <h2 className="sec-title reveal">Certifications</h2>
      <p className="sec-desc reveal">
        Professional certifications that validate expertise and commitment to continuous learning.
      </p>
      
      <div className="certs-grid">
        {certificatesData.map((cert, index) => {
          const colors = certColors[index % certColors.length];
          const pdfFile = pdfMap[cert.title];
          
          return (
            <div 
              className="cert-card cert-card-colorful reveal" 
              key={index}
              onClick={() => pdfFile && openModal(pdfFile)}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                background: colors.bg,
                borderColor: colors.border,
                boxShadow: 'inset 0 0 30px rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              <div className="cert-icon" style={{ filter: 'brightness(0) invert(1)' }}>{cert.icon}</div>
              <div className="cert-title" style={{ color: '#ffffff' }}>{cert.title}</div>
              <div className="cert-issuer" style={{ color: '#ffffff' }}>{cert.issuer}</div>
              <div className="cert-date" style={{ color: '#ffffff' }}>{cert.date}</div>
              <div className="cert-desc" style={{ color: '#ffffff' }}>{cert.desc}</div>
              <button 
                className="cert-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (pdfFile) openModal(pdfFile);
                }}
              >
                🏆 View Certificate <span className="cert-arrow">↗</span>
              </button>
            </div>
          );
        })}
      </div>

      <PdfModal 
        isOpen={isModalOpen} 
        pdfUrl={selectedPdfUrl} 
        onClose={closeModal} 
      />
    </section>
  );
}

export default Certifications;
