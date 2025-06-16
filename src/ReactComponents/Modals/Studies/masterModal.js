import React from 'react';

export default function MasterModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl">
          <div className="modal-header">
            <h5 className="modal-title">Studies</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="modal-body">
            <div className="study-entry">
              <h2 className="study-title">Master's Degree in Software Engineering and Computer Systems</h2>
              <h3 className="study-dates">2024 - 2025</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}