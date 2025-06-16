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
                  <p>¡Hola! Soy un apasionado del desarrollo de videojuegos. Me encanta crear experiencias interactivas que mezclan tecnología y creatividad.</p>
                </div>
              </div>
              
            </div>
            
            
          </div>

        </div>
      </div>
    </div>
  );
}
