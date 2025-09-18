import React from 'react';
import '../aboutMeModal.css';

export default function MMMModal({ visible, onClose }) {
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
                src="/assets/images/profile.jpeg"
                alt="Profile picture"
                className="profile-image"
              />
              <div className="profile-text">
                <h2 className="profile-name">Miguel Martínez Martínez</h2>
                <h3 className="profile-subtitle">Game Designer & Developer | Fullstack Developer | IT Specialist</h3>
                <div className="about-text">
                  <p>
                    Hi, I'm Miguel, and this page is my Master's thesis and portfolio! I designed and developed this interactive experience to showcase my skills and projects.
                  </p>
                  <p>
                    If you want to know more about me and haven't played my portfolio yet, I invite you to give it a try!
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