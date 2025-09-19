import React from 'react';
import '../aboutMeModal.css';

export default function JMMModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl p-6">
          <div className="modal-header mb-4 flex justify-between items-center">
            <h5 className="modal-title text-2xl font-semibold">Credits</h5>
            <button className="btn-close text-2xl" onClick={onClose} aria-label="Close">&times;</button>
          </div>

          <div className="modal-body">
            <div className="modal-header-row">
              <img
                src="/assets/images/Javier-Machin-1024x1009.png"
                alt="Profile picture"
                className="profile-image"
              />
              <div className="profile-text">
                <h2 className="profile-name">Javier Machin Mourelle</h2>
                <h3 className="profile-subtitle">Digital Artist</h3>
                <div className="about-text">
                  <p>
                    Javi is a digital artist with several years of experience. He was in charge of creating all the artwork in this portfolio.
                    If you want to see more of his work, you can visit his <a href="https://x.com/GatlingArt" target="_blank" rel="noopener noreferrer">Twitter</a> or <a href="https://www.instagram.com/gatlingart" target="_blank" rel="noopener noreferrer">Instagram</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}