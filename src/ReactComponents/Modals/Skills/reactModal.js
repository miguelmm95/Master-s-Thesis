import React from 'react';

export default function ReactModal({ visible, onClose }) {
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
              <h2 className="title">React</h2>
            </div>
            <div className="text">
              <p>
                I learned <strong>React</strong> during my studies in the <strong>Master’s Degree in Software Engineering</strong>, where it played a key role in modern web development courses. 
                I gained practical experience building dynamic user interfaces with components, state management, and hooks, while also working with <strong>React Router</strong> for navigation and <strong>Bootstrap</strong> for styling.
              </p>
              <p>
                This page you are on right now has been developed with React! 👀
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}