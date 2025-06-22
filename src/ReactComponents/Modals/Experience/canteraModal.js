import React from 'react';
import './experiencesModal.css';

export default function CanteraModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl">
          <div className="modal-header">
            <h5 className="modal-title">Professional Experience</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="modal-body">
            <div className="experience-entry">
              <h2 className="experience-title">Programming Teacher - <a href="https://canteradeempresas.com" target="_blank" rel="noopener noreferrer">Cantera de Empresas</a></h2>
              <h3 className="experience-dates">February 2024 - April 2024</h3>
            </div>
            <div className="text">
              <p>
                I worked at <strong>Cantera de Empresas</strong>, a technology academy focused on teaching <strong>robotics</strong>, <strong>programming</strong>, and <strong>emerging technologies</strong> to children and teenagers.
              </p>
              <p>
                My role involved teaching programming concepts to children using <strong>Minecraft Education</strong>, and guiding teenagers through the process of <strong>mobile app development</strong>, helping them bring their own projects to life.
              </p>
            </div>
            <div className="badge-container">
              <span className="badge">Teaching</span>
              <span className="badge">Communication</span>
              <span className="badge">Minecraft Education</span>
              <span className="badge">Mobile App Development</span>
              <span className="badge">Problem Solving</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}