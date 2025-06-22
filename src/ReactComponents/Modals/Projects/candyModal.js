import React from 'react';

export default function CandyModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl">
          <div className="modal-header">
            <h5 className="modal-title">Projects</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="modal-body">
            <div className="entry">
              <h2 className="title">Candy Route</h2>
              <h3 className="profile-subtitle"><a href="https://droxdev.itch.io/candy-route" target="_blank" rel="noopener noreferrer">Itchio page of the game</a></h3>
            </div>
            <div className="text">
              <p> <strong>Candy Route</strong> is a short narrative-driven game developed during a 48-hour Halloween-themed <strong>game jam</strong>. 
              Built in <strong>Unity 2D</strong>, it presents a light-hearted visual novel experience where the player takes on the role of a child 
              going door-to-door in their neighborhood on Halloween night, encountering a variety of quirky characters while playing trick-or-treat. 
            </p> 
            <p> 
              The entire team contributed to the <strong>game design</strong>, working together to shape the tone, story, 
              and structure of the experience. My specific role was as the <strong>programmer</strong>, where I was responsible for implementing the 
              core systems, including dialogue management and scene transitions. 
            </p> 
            <p> 
              The tight time frame of the jam required rapid decision-making and efficient teamwork. The project helped strengthen my ability 
              to <strong>prototype quickly</strong>, collaborate under pressure, and deliver a complete and functional game within a constrained 
              deadline. 
            </p>
            </div>
            <div className="badge-container">
              <span className="badge">Unity 2D</span>
              <span className="badge">C#</span>
              <span className="badge">Game Development</span>
              <span className="badge">Game Design</span>
              <span className="badge">Game Jam</span>
              <span className="badge">Teamwork</span>
              <span className="badge">Programming</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}