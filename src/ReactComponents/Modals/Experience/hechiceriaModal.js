import React from 'react';
import './experiencesModal.css';

export default function HechiceriaModal({ visible, onClose }) {
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
              <h2 className="experience-title">Software developer with Unreal Engine - <a href="https://hechicer-ia.com" target="_blank" rel="noopener noreferrer">Hechicer.ia</a></h2>
              <h3 className="experience-dates">April 2025 - July 2025</h3>
            </div>
            <div className="text">
              <p>
                I worked at <strong>Hechicer.ia</strong>, a startup focused on <strong>artificial intelligence</strong> for image and video generation. I collaborated with the team on the development of a new video generation tool using <strong>Unreal Engine 5</strong>.
              </p>
              <p>
                During my time at the company, I developed several key features, including <strong>procedural terrain generation</strong> using Unreal’s <strong>PCG plugin</strong>, 
                and <strong>fully customizable liquid simulations</strong> with the <strong>Niagara particle system</strong>. I also contributed to the project’s 
                backend by programming various utilities of the tool.
              </p>
            </div>
            <div className="badge-container">
              <span className="badge">Unreal Engine 5</span>
              <span className="badge">Artificial Intelligence</span>
              <span className="badge">Problem Solving</span>
              <span className="badge">Procedural Generation</span>
              <span className="badge">Niagara</span>
              <span className="badge">PCG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}