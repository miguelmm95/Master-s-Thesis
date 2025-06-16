import React from 'react';
import './aboutMeModal.css';

export default function AboutMeModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl p-6">
          <div className="modal-header mb-4 flex justify-between items-center">
            <h5 className="modal-title text-2xl font-semibold">About me</h5>
            <button className="btn-close text-2xl" onClick={onClose} aria-label="Cerrar">&times;</button>
          </div>

          <div className="modal-body">
            <div className="modal-header-row">
              <img
                src="/assets/images/profile.jpeg"
                alt="Foto de perfil"
                className="profile-image"
              />
              <div className="profile-text">
                <h2 className="profile-name">Miguel Martínez Martínez</h2>
                <h3 className="profile-subtitle">Fullstack Developer | Videogame Designer & Developer | IT</h3>
                <div className="about-text">
                  <p>
                    Hi, I'm Miguel, a 29-year-old from Valencia, Spain. 
                    I’ve been passionate about technology since I was a child, 
                    and I’ve turned that fascination into a career focused on creating digital experiences that combine creativity with technical skill. 
                    Over the years, I have explored software development, systems engineering, and video game design, 
                    always aiming to deliver innovative and practical solutions.
                  </p>
                  <p>
                    In my free time, I enjoy playing video games, reading, especially fantasy and science fiction. Besides that, 
                    I’m always eager to keep learning and exploring the things I’m passionate about.
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
