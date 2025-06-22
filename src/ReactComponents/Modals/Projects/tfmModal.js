import React from 'react';

export default function TFMModal({ visible, onClose }) {
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
            <div className="experience-entry">
              <h2 className="title">Master's Thesis - Design and development of a interactive portfolio in web video game format</h2>
            </div>
            <div className="text">
              <p>
                Hey! It's the page where you are right now!
              </p>
              <p> 
                This project consists of creating an <strong>interactive portfolio</strong> presented as a web video game. 
                The player navigates through multiple levels, each representing different sections of the portfolio, where the core gameplay 
                 involves finding matching pairs of cards. 
              </p> 
              <p> 
                Upon successfully matching a pair, a modal window appears displaying detailed information about that particular section, 
                combining both gameplay and portfolio content in a seamless experience. 
              </p> 
              <p> 
                The project is primarily developed using <strong>JavaScript</strong>, alongside <strong>HTML5</strong> and <strong>CSS</strong>. 
                It utilizes <strong>React</strong> and leverages the <strong>Kaplay framework</strong> to manage the game’s structure and 
                interactivity, showcasing my proficiency in modern web development and gamification techniques. 
              </p>
            </div>
            <div className="badge-container">
              <span className="badge">JavaScript</span>
              <span className="badge">React</span>
              <span className="badge">Kaplay</span>
              <span className="badge">HTML5</span>
              <span className="badge">CSS</span>
              <span className="badge">Web Development</span>
              <span className="badge">Gamification</span>
              <span className="badge">Game Design</span>
              <span className="badge">Game Development</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}