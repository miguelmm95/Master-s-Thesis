import React from 'react';

export default function AboutMeModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl">
          <div className="modal-header">
            <h5 className="modal-title">About Me</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="modal-body">
            <p>Hi! I'm a passionate game developer with a love for creating immersive experiences.</p>
            <p>In my free time, I enjoy exploring new technologies and working on personal projects.</p>
            <p>Feel free to reach out if you want to collaborate or just chat!</p>
          </div>
        </div>
      </div>
    </div>
  );
}