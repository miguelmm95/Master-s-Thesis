import React from 'react';
import './skillsModal.css';

export default function UnityModal({ visible, onClose }) {
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
              <h2 className="title">Unity Game Engine</h2>
            </div>
            <div className="text">
            <p>
            During my specialized university training in game development, 
            I achieved comprehensive technical mastery of <strong>Unity</strong> across both <strong>2D</strong> and <strong>3D</strong> workflows. 
            My studies included implementing <strong>advanced AI systems</strong>, particularly using <strong>Behavior Trees</strong> for creating NPCs with complex action patterns, 
            along with <strong>procedural content generation techniques</strong> for dynamic level and environment design.
            </p>

            <ul className="technical-skills">
              <li><strong>Modular AI architectures</strong>: Developed finite state machines and behavior trees for NPC systems with customizable action patterns</li>
              <li><strong>Procedural generation</strong>: Implemented noise-based algorithms for terrain generation and rule-based asset distribution systems</li>
              <li><strong>Autonomous agents</strong>: Designed utility-based decision systems for adaptive NPC behaviors</li>
              <li><strong>System integration</strong>: Successfully bridged AI systems with Unity's physics, animation, and navigation components</li>
            </ul>

            <p>
            This specialization enables me to address complex interactive system design challenges with well-founded technical solutions, always prioritizing <strong>computational efficiency</strong> and <strong>adaptability</strong> to different game contexts.
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}