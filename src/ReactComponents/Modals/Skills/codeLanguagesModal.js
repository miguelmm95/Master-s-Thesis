import React from 'react';

export default function CodeLanguagesModal({ visible, onClose }) {
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
              <h2 className="title">Code Languages</h2>
            </div>
            <div className="text">
              <p> Throughout my academic journey and professional experiences, 
                I have acquired proficiency in several programming languages, including <strong>C++</strong>, <strong>C#</strong>, 
                <strong> Python</strong>, <strong>Kotlin</strong>, <strong>PHP</strong>, and <strong>JavaScript</strong>. 
                Each language has contributed to my versatility as a developer, allowing me to adapt to different project requirements and 
                environments with ease. 
              </p> 
              <p> 
                These skills have been developed progressively across various projects and studies, 
                giving me a strong foundation in both object-oriented and scripting paradigms. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}