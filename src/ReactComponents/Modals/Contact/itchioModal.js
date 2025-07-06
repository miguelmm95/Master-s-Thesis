import React from 'react';

export default function ItchioModal({ visible, onClose }) {
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
              <h2 className="title">My Itch.io page</h2>
            </div>
            <div className="text">
              <p>
                On my <a href="https://miguel-mm95.itch.io" target="_blank" rel="noopener noreferrer">itch.io page</a>, you'll find a mix of personal games, prototypes, and game jam entries. 
                Play in browser or download, and share your feedback!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}