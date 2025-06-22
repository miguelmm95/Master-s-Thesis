import React from 'react';

export default function LaravelModal({ visible, onClose }) {
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
            <div className="entry">
              <h2 className="title">Laravel Framework</h2>
            </div>
            <div className="text">
              <p>
                I learned <strong>Laravel</strong> during my master's internship at <strong>AEME Group</strong>, where I had the opportunity to enhance my skills in both <strong>PHP</strong> and <strong>JavaScript</strong>. 
                Throughout my time there, I developed full-stack web applications tailored to client needs, ensuring functionality, efficiency, and clean code across both the front-end and back-end.
              </p>
              <p>
                This hands-on experience with Laravel gave me a deep understanding of its routing, templating, and ORM features, and allowed me to apply best practices in modern web development within a professional setting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}