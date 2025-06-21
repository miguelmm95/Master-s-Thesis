import React from 'react';
import './experiencesModal.css';

export default function OWNModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl">
          <div className="modal-header">
            <h5 className="modal-title">Professional Experience</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="modal-body">
            <div className="experience-entry">
              <h2 className="experience-title">Crew member - <a href="https://www.openworldnow.com/" target="_blank" rel="noopener noreferrer">OWN Valencia</a></h2>
              <h3 className="experience-dates">July 2024 - July 2024</h3>
            </div>
            <div className="text">
              <p>
                I participated as a member of the <strong>crew</strong> at the LAN party held at the Feria Valencia in the OWN summer edition of 2024.
                My role consisted of providing <strong>support</strong> and informing visitors about the event's <strong>missions</strong>, where attendees had to complete a series of challenges to earn rewards.
              </p>
              <p>
                I assisted participants throughout the event, ensuring they understood the tasks and helping to resolve any issues they encountered,
                contributing to a smooth and engaging experience for all attendees.
              </p>
            </div>
            <div className="badge-container">
              <span className="badge">Teamwork</span>
              <span className="badge">Communication</span>
              <span className="badge">Event Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}