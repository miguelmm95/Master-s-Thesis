import React from 'react';

export default function ThumusModal({ visible, onClose }) {
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
              <h2 className="title">El glifo de Thumus</h2>
              <h3 className="profile-subtitle"><a href="https://miguel-mm95.itch.io/el-glifo-de-thumus" target="_blank" rel="noopener noreferrer">Itchio page of the game</a></h3>
            </div>
            <div className="text">
              <p> <strong>El glifo de Thumus</strong> is a 2D point-and-click adventure game developed during the third year of my 
              Bachelor's Degree in Video Game Design and Development. The project was part of a multidisciplinary assignment that brought 
              together three subjects—<em>Game Concept Design</em>, <em>Game Art</em>, and <em>Game Software Development</em>—with the goal of 
              producing the first level of a game based on a theme provided by our professors. 
            </p> 
            <p> 
              The player controls <strong>Abigail</strong>, an apprentice alchemist who must uncover the strange events occurring in her village 
              and prevent the spread of a mysterious darkness threatening to consume it. The game was developed in <strong>Unity 2D</strong>, 
              combining narrative depth with classic adventure gameplay mechanics.
            </p>
            <p> 
              Within the team, I took on the roles of <strong>programmer</strong> and <strong>game designer</strong>, implementing core gameplay 
              systems and contributing to the overall design of the experience. I also participated in the visual development, 
              creating three of the background scenes and several in-game assets to support the game's visual identity. 
            </p> 
            <p> 
              This project was a formative experience that allowed me to engage in the full creative and technical process of making a game, 
              from initial concept to a playable prototype, while collaborating closely with a multidisciplinary team. 
            </p>
            </div>
            <div className="badge-container">
              <span className="badge">Unity 2D</span>
              <span className="badge">C#</span>
              <span className="badge">Game Development</span>
              <span className="badge">Game Design</span>
              <span className="badge">Game Concept Design</span>
              <span className="badge">Teamwork</span>
              <span className="badge">Programming</span>
              <span className="badge">Game Art</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}