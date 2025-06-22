import React from 'react';

export default function UEModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl">
          <div className="modal-header">
            <h5 className="modal-title">Skills</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="modal-body">
            <div className="experience-entry">
              <h2 className="title">Unreal Engine 5</h2>
            </div>
            <div className="text">
              <p>
                I began learning <strong>Unreal Engine</strong> while working on my Bachelor's Thesis project, where I needed to create a functional prototype using this engine. 
                Through intensive self-study and hands-on practice (guided in part by the courses of <strong>Carlos Coronado</strong>, a key reference in the field) I gained a solid understanding 
                of the engine’s core systems, especially the <strong>visual scripting language Blueprint</strong>, which I used to develop interactive mechanics and core gameplay without relying 
                on traditional code. 
              </p>
              <p>
                This process not only allowed me to bring my thesis to life, but also laid the foundation for my later work with Unreal during my internship at <strong>Mind Trips</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}