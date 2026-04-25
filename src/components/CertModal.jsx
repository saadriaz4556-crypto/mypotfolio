import { useEffect } from 'react';

function CertModal({ isOpen, cert, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !cert) return null;

  return (
    <div 
      className={`cert-modal-overlay ${isOpen ? 'active' : ''}`} 
      onClick={onClose}
    >
      <div 
        className="cert-modal" 
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
      >
        <button className="cert-modal-close" onClick={onClose}>
          &times;
        </button>
        
        <div className="cert-modal-icon">{cert.icon}</div>
        <div className="cert-modal-title">{cert.title}</div>
        <div className="cert-modal-issuer">{cert.issuer}</div>
        <div className="cert-modal-date">{cert.date}</div>
        <div className="cert-modal-desc">{cert.desc}</div>
        
        <div className="cert-modal-preview">
          <div className="cert-modal-preview-icon">🔒</div>
          <div className="cert-modal-preview-text">
            CERTIFICATE PREVIEW · NO DOWNLOAD
          </div>
        </div>
        
        <div className="cert-modal-actions">
          <button 
            className="btn btn-outline" 
            onClick={onClose}
            style={{ padding: '.6rem 1.4rem' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CertModal;
