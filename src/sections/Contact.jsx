import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

function Contact() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  const sendMessage = () => {
    const name = document.getElementById('fname').value;
    const email = document.getElementById('femail').value;
    const message = document.getElementById('fmsg').value;

    if (!name || !email || !message) {
      alert('Please fill all fields.');
      return;
    }

    alert(`Thanks ${name}! Message received. ✅`);
    document.getElementById('fname').value = '';
    document.getElementById('femail').value = '';
    document.getElementById('fmsg').value = '';
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
          <a href="tel:+923420001396" className="c-link">
            <div className="c-icon">📞</div>
            <div>
              <div className="c-label">PHONE</div>
              <div className="c-val">+92 342 0001396</div>
            </div>
          </a>

          <a href="mailto:saadriaz4555@gmail.com" className="c-link">
            <div className="c-icon">✉️</div>
            <div>
              <div className="c-label">EMAIL</div>
              <div className="c-val">saadriaz4555@gmail.com</div>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/saad-riaz-3b36063" target="_blank" className="c-link">
            <div className="c-icon">💼</div>
            <div>
              <div className="c-label">LINKEDIN</div>
              <div className="c-val">linkedin.com/in/saadriaz</div>
            </div>
          </a>
        </div>

        <div className="reveal">
          <div className="contact-form">
            <div className="form-group">
              <label className="form-label">YOUR NAME</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="John Doe" 
                id="fname"
              />
            </div>

            <div className="form-group">
              <label className="form-label">EMAIL</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="john@example.com" 
                id="femail"
              />
            </div>

            <div className="form-group">
              <label className="form-label">MESSAGE</label>
              <textarea 
                className="form-textarea" 
                placeholder="Tell me about your project..." 
                id="fmsg"
              ></textarea>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={sendMessage}
              style={{ justifyContent: 'center' }}
            >
              ✉ Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
