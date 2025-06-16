import React from 'react';
import './experiencesModal.css';

export default function OWNModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl">
          <div className="modal-header">
            <h5 className="modal-title">OWN</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="modal-body">
            <div className="experience-entry">
              <h2 className="experience-title">Crew member - OWN Valencia</h2>
              <h3 className="experience-dates">July 2024 - July 2024</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}