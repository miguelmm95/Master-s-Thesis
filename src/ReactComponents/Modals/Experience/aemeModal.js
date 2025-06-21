import React from 'react';
import './experiencesModal.css';

export default function AEMEModal({ visible, onClose }) {
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
              <h2 className="experience-title">Fullstack web developer - <a href="https://www.linkedin.com/company/aeme-group/" target="_blank" rel="noopener noreferrer">AEME Group</a></h2>
              <h3 className="experience-dates">January 2025 - April 2025</h3>
            </div>
            <div className="text">
              <p>
                I worked as a <strong>fullstack web developer</strong> at AEME Group, an R&D company that creates applications for businesses that use <strong>electronic tags</strong>.
                My role involved developing applications that allowed clients to manage and administer the tags in their businesses.
              </p>
              <p>
                During this time, I learned the <strong>Laravel framework</strong> and improved my <strong>JavaScript</strong> skills,
                contributing to the development of robust and efficient web solutions tailored to client needs.
              </p>
            </div>
            <div className="badge-container">
              <span className="badge">Teamwork</span>
              <span className="badge">Communication</span>
              <span className="badge">Problem solving</span>
              <span className="badge">PHP</span>
              <span className="badge">Laravel</span>
              <span className="badge">JavaScript</span>
              <span className="badge">HTML5 / CSS</span>
              <span className="badge">MySQL</span>
              <span className="badge">Git</span>
              <span className="badge">Bootstrap</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}