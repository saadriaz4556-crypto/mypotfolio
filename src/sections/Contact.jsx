import { useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { supabase } from '../lib/supabase';

function Contact() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const linkedinRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMouseMove = (e, cardRef) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    card.style.animationPlayState = 'paused, running';
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
  };

  const handleMouseLeave = (cardRef) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.animationPlayState = 'running, running';
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert('Please fill all fields.');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{ name, email, message }]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef}>
      <div className="sec-label reveal">GET IN TOUCH</div>
      <h2 className="contact-animated-heading reveal">
        Let's Build<br />Something Great
      </h2>
      <p className="sec-desc reveal">
        Have a project idea? I'm always open to new opportunities.
      </p>

      <div className="contact-grid">
        <div className="contact-info reveal">
          <a href="tel:+923420001396" className="c-link c-link-phone" ref={phoneRef} onMouseMove={(e) => handleMouseMove(e, phoneRef)} onMouseLeave={() => handleMouseLeave(phoneRef)}>
            <div className="c-icon">📞</div>
            <div>
              <div className="c-label">PHONE</div>
              <div className="c-val">+92 342 0001396</div>
            </div>
          </a>

          <a href="mailto:saadriaz4555@gmail.com" className="c-link c-link-email" ref={emailRef} onMouseMove={(e) => handleMouseMove(e, emailRef)} onMouseLeave={() => handleMouseLeave(emailRef)}>
            <div className="c-icon">✉️</div>
            <div>
              <div className="c-label">EMAIL</div>
              <div className="c-val">saadriaz4555@gmail.com</div>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/saad-riaz-3b3606379/" target="_blank" rel="noopener noreferrer" className="c-link c-link-linkedin" ref={linkedinRef} onMouseMove={(e) => handleMouseMove(e, linkedinRef)} onMouseLeave={() => handleMouseLeave(linkedinRef)}>
            <div className="c-icon">💼</div>
            <div>
              <div className="c-label">LINKEDIN</div>
              <div className="c-val">linkedin.com/in/saadriaz</div>
            </div>
          </a>
        </div>

        <div className="reveal">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">YOUR NAME</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">EMAIL</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">MESSAGE</label>
              <textarea
                name="message"
                className="form-textarea"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ justifyContent: 'center' }}
            >
              {loading ? 'Sending...' : '✉ Send Message'}
            </button>

            {status === 'success' && (
              <p style={{ color: '#22C55E', marginTop: '8px' }}>
                ✅ Message sent successfully!
              </p>
            )}
            {status === 'error' && (
              <p style={{ color: 'red', marginTop: '8px' }}>
                ❌ Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
