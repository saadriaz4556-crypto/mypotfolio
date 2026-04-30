import { useEffect } from 'react';

function PdfModal({ isOpen, pdfUrl, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="pdf-close-btn" onClick={onClose}>✕</button>
        <iframe 
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
          title="Certificate PDF" 
          className="pdf-iframe"
        />
      </div>
    </div>
  );
}

export default PdfModal;
