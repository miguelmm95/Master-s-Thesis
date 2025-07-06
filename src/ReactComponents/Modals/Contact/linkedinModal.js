import React from 'react';

export default function LinkedInModal({ visible, onClose }) {
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
              <h2 className="title">My LinkedIn page</h2>
            </div>
            <div className="text">
              <p>
                Want to learn more about my professional journey, skills, and projects? 
                Feel free to check out my <a href="https://www.linkedin.com/in/miguel-martínez-martínez-13a498a5/" target="_blank" rel="noopener noreferrer">LinkedIn</a> profile! There, you’ll find details about my experience, achievements, and shared insights. 
                I’d love to connect for collaborations, opportunities, or just to exchange ideas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}