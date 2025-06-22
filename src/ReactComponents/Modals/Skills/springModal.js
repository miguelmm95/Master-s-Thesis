import React from 'react';

export default function SpringModal({ visible, onClose }) {
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
              <h2 className="title">Spring Framework</h2>
            </div>
            <div className="text">
              <p>
                I was introduced to <strong>Spring Framework</strong> during my Master's studies, where it quickly became a fundamental part of my backend development toolkit. 
                Learning Spring allowed me to understand the architecture and patterns behind <strong>enterprise-level applications</strong>, particularly the use of <strong>Spring Boot</strong> to create robust and scalable REST APIs.
              </p>
              <p>
                Working with Spring gave me hands-on experience with key concepts such as <strong>dependency injection</strong>, <strong>data persistence using JPA</strong>, and secure user authentication via <strong>Spring Security</strong>. 
                It also taught me how to structure clean, modular backends that are easy to maintain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}