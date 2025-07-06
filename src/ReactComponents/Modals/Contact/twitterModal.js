import React from 'react';

export default function TwitterModal({ visible, onClose }) {
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
              <h2 className="title">My Twitter page</h2>
            </div>
            <div className="text">
              <p>
              On my <a href="https://x.com/miguelGameDev_" target="_blank" rel="noopener noreferrer">Twitter</a> profile, I share updates on my software and game design and development projects, 
              diving deep into the technical challenges and creative breakthroughs along the way. 
              You'll also find me geeking out about topics I'm truly passionate!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}