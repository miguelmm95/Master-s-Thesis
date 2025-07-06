import React from 'react';

export default function EmailModal({ visible, onClose }) {
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
              <h2 className="title">Send me an Email!</h2>
            </div>
            <div className="text">
              <p>

              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}