import React from 'react';
import './experiencesModal.css';

export default function MindTripsModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl">
          <div className="modal-header">
            <h5 className="modal-title">Mind Trips</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="modal-body">
            <div className="experience-entry">
              <h2 className="experience-title">Videogame prorgammer with Unreal Engine - Mind Trips</h2>
              <h3 className="experience-dates">May 2023 - July 2023</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}