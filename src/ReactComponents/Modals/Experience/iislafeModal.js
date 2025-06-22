import React from 'react';
import './experiencesModal.css';

export default function IISLAFEModal({ visible, onClose }) {
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
              <h2 className="experience-title">Computer Systems Administration Technician - <a href="https://www.iislafe.es/es/" target="_blank" rel="noopener noreferrer">La Fe Health Research Institute | IISLAFE</a></h2>
              <h3 className="experience-dates">March 2017 - September 2018</h3>
            </div>
            <div className="text">
              <p>
              As an <strong>IT support technician</strong> at the Health Research Institute of <strong>La Fe Hospital</strong> in Valencia, 
              my role involved providing <strong>technical assistance</strong> to users by <strong>troubleshooting</strong> <strong>hardware</strong>,
              <strong> software</strong>, and <strong>connectivity issues</strong>. 
              </p>
              <p>
              Additionally, I was part of the team responsible for 
              administering and maintaining the <strong>corporate network</strong>, where we managed <strong>servers</strong>, implemented 
              <strong> backup solutions</strong>, and ensured the proper functioning of <strong>cloud infrastructure</strong> using tools like 
              <strong> Microsoft Azure</strong> and <strong>Office 365</strong>. 
              </p>
              <p>
              Working in a <strong>medical research environment</strong>, I developed key 
              skills for solving <strong>technical problems under pressure</strong> while keeping <strong>critical systems</strong> operational 
              for research projects.
              </p>
            </div>
            <div className="badge-container">
              <span className="badge">IT Support</span>
              <span className="badge">Troubleshooting</span>
              <span className="badge">Hardware</span>
              <span className="badge">Software</span>
              <span className="badge">Microsoft Azure</span>
              <span className="badge">Office 365</span>
              <span className="badge">Problem Solving</span>
              <span className="badge">Cloud Infrastructure</span>
              <span className="badge">Network Administration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}