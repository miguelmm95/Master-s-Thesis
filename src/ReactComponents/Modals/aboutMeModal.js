import React from 'react';
import './aboutMeModal.css';

export default function AboutMeModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl p-6">
          <div className="modal-header mb-4 flex justify-between items-center">
            <h5 className="modal-title text-2xl font-semibold">About me</h5>
            <button className="btn-close text-2xl" onClick={onClose} aria-label="Close">&times;</button>
          </div>

          <div className="modal-body">
            <div className="modal-header-row">
              <img
                src="/assets/images/profile.jpeg"
                alt="Profile picture"
                className="profile-image"
              />
              <div className="profile-text">
                <h2 className="profile-name">Miguel Martínez Martínez</h2>
                <h3 className="profile-subtitle">Fullstack Developer | Game Designer & Developer | IT Specialist</h3>
                <div className="about-text">
                  <p>
                    Hello! I'm Miguel, a 29-year-old developer from Valencia, Spain, a native <strong>Spanish and Valencian/Catalan speaker</strong> with <strong>professional English fluency</strong>.
                  </p>
                  <p>
                    My passion for technology began in childhood and evolved into expertise across software development, 
                    systems engineering, and game design. I specialize in creating digital experiences that blend technical 
                    precision with creative vision - like this interactive portfolio you're exploring!
                  </p>
                  <p>
                    When I'm not coding, you'll find me playing videogames, reading sci-fi/fantasy novels 
                    or doing some outdoor activity.
                  </p>
                  <div className="badge-container">
                    <span className="badge">Spanish (Native)</span>
                    <span className="badge">Valencian/Catalan (Native)</span>
                    <span className="badge">English (B2)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}