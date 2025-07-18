import React from 'react';

export default function GithubModal({ visible, onClose }) {
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
              <h2 className="title">My GitHub page</h2>
            </div>
            <div className="text">
              <p>
                On my GitHub profile (<a href="https://github.com/miguelmm95" target="_blank" rel="noopener noreferrer">@miguelmm95</a>), you’ll find personal projects showcasing my technical skills, 
                along with academic assignments that highlight my growth. Each repository offers a glimpse into my creative process and journey 
                as a developer. Feel free to explore!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}