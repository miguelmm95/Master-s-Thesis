import React from 'react';

export default function SH2Modal({ visible, onClose }) {
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
              <h2 className="title">Silent Hill 2 (2001) - No hit tool</h2>
              <h3 className="profile-subtitle"><a href="https://github.com/miguelmm95/Silent_Hill_2_No_Hit_Tool" target="_blank" rel="noopener noreferrer">Project repository</a></h3>
            </div>
            <div className="text">
              <p> 
                This project is a custom-built <strong>C# application</strong> designed to assist the <strong>No Hit community</strong> of 
                <em>Silent Hill 2 (2001)</em> — players who complete the game without taking any damage. 
                The tool reads and displays key in-game statistics in real time, including the player’s health, in-game time, and weapon ammunition.
              </p> 
              <p> 
                Developed in <strong>Visual Studio</strong>, the tool leverages <strong>reverse engineering techniques</strong> 
                using Cheat Engine to identify and read the relevant memory addresses of the game. Once configured, 
                it provides a clean and live interface that allows players or streamers to monitor critical values during gameplay, 
                making it easier to track progress and identify potential runs.
              </p> 
              <p> 
                This project allowed me to dive deeper into <strong>low-level memory manipulation</strong> and game internals, 
                as well as to create a real utility tailored for a niche yet dedicated gaming community. 
              </p>
            </div>
            <div className="badge-container">
              <span className="badge">C#</span>
              <span className="badge">Reverse Engineering</span>
              <span className="badge">Game Development</span>
              <span className="badge">Game Tools</span>
              <span className="badge">Cheat Engine</span>
              <span className="badge">Programming</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}