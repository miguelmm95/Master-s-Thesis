import React from 'react';
import './experiencesModal.css';

export default function MindTripsModal({ visible, onClose }) {
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
              <h2 className="experience-title">Videogame prorgammer with Unreal Engine - <a href="https://mind-trips.com/es/" target="_blank" rel="noopener noreferrer">Mind Trips</a></h2>
              <h3 className="experience-dates">May 2023 - July 2023</h3>
            </div>
            <div className="text">
              <p>
                At <strong>Mind Trips</strong>, an innovative <strong>escape room company</strong> transitioning to <strong>game development</strong>, 
                I contributed to their flagship <strong>Unreal Engine 4</strong> horror project. My responsibilities included programming <strong>interactive environments</strong>, designing <strong>jump scare mechanics</strong>, and <strong>refactoring legacy code</strong> from previous developers. 
              </p>
              <p>
                This experience allowed me to develop specialized skills in <strong>horror game design</strong> while working with 
                <strong> blueprint scripting</strong> and <strong>environmental storytelling</strong> techniques specific to immersive experiences.
              </p>
            </div>
            <div className="badge-container">
              <span className="badge">Unreal Engine 4</span>
              <span className="badge">Blueprints</span>
              <span className="badge">Horror Game Design</span>
              <span className="badge">Problem Solving</span>
              <span className="badge">Game Development</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}