import React from 'react';

export default function BachelorModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl">
          <div className="modal-header">
            <h5 className="modal-title">Studies</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="modal-body">
            <div className="study-entry">
              <h2 className="study-title">Bachelor's Degree in Video Game Design and Development - Jaume I University</h2>
              <h3 className="study-dates">2018 - 2023</h3>
            </div>
            <div className="text">
              <p>
              During this degree, I developed a comprehensive understanding of <strong>programming</strong>, mastering fundamental and advanced concepts essential for game development.
              In addition to programming, I explored multiple branches of <strong>game design</strong>, including <strong>visual art</strong>, and <strong>narrative construction</strong>, allowing me to approach projects from a multidisciplinary perspective.</p>
            <p>
              A significant part of my studies involved mastering the <strong>Unity game engine</strong>, which enabled me to create interactive and immersive experiences efficiently.</p>
            <p>
              Moreover, I acquired knowledge in <strong>artificial intelligence</strong>, where I learned to implement intelligent behaviors and decision-making algorithms for NPCs.
              I also gained a solid foundation in <strong>algorithms and data structures</strong>, equipping me with the tools to optimize game performance and solve complex programming challenges.
            </p>
            </div>
            <div className="badge-container">
              <span className="badge">Unity(2D/3D)</span>
              <span className="badge">C#</span>
              <span className="badge">C++</span>
              <span className="badge">Python</span>
              <span className="badge">Krita</span>
              <span className="badge">WebGL</span>
              <span className="badge">AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}