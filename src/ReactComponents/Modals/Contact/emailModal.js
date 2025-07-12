import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './emailModal.css';

export default function EmailModal({ visible, onClose }) {

    const form = useRef();
    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState(null);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);

        emailjs
            .sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                form.current,
                { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY }
            )
            .then(
                () => {
                console.log('SUCCESS!');
                setSendStatus('success');
                form.current.reset();
                },
                (error) => {
                console.log('FAILED...', error.text);
                setSendStatus('error');
                }
            )
            .finally(() => {
                setIsSending(false);
                setTimeout(() => setSendStatus(null), 5000);
            });
        };

  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl">
          <div className="modal-header">
            <h5 className="modal-title">RRSS / Contact</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="modal-body">
            <div className="entry">
              <h2 className="title">Send me an Email!</h2>
            </div>
            <form ref={form} onSubmit={sendEmail} className="email-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name / Company Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="user_name" 
                    required 
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="user_email" 
                    required 
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">CC</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="cc" 
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    required 
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    required 
                    className="form-control"
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSending}
                  >
                    {isSending ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {sendStatus === 'success' && (
                    <div className="alert alert-success mt-3">
                      Message sent successfully!
                    </div>
                  )}
                  
                  {sendStatus === 'error' && (
                    <div className="alert alert-error mt-3">
                      Failed to send. Please try again.
                    </div>
                  )}
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}