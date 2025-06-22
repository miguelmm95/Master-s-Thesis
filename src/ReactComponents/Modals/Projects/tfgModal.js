import React from 'react';

export default function TFGModal({ visible, onClose }) {
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
              <h2 className="title">Bachelor's Thesis - <em>Design and Implementation of an Artificial Intelligence for a Horror Videogame in Unreal Engine 5</em></h2>
              <h3 className="profile-subtitle"><a href="https://github.com/miguelmm95/Bachelor-s-Thesis" target="_blank" rel="noopener noreferrer">Project repository</a> & <a href="https://repositori.uji.es/items/69c879e8-121d-4870-a15c-df00538d965d" target="_blank" rel="noopener noreferrer">Project memory</a></h3>
            </div>
            <div className="text">
              <p> This project marked the culmination of my Bachelor's Degree and focused on developing a complex, 
                adaptive <strong>enemy AI</strong> in <strong>Unreal Engine 5</strong>, inspired by the antagonist 
                <em> Mr. X</em> from <em>Resident Evil 2 Remake</em>. Starting with no prior experience in the engine, 
                I learned Unreal from scratch and focused deeply on mastering AI systems to achieve my goal. 
              </p> 
              <p> 
                The non-playable character (NPC) was designed around a dynamic <strong>Behavior Tree</strong> system that adjusted its logic 
                based on sensory input, particularly vision. The AI could detect the player’s actions and adapt accordingly — for instance, 
                if the player repeatedly hid inside lockers and the NPC witnessed it multiple times, it would learn to anticipate this behavior 
                and actively check hiding spots. 
              </p> 
              <p> 
                To enhance its environmental awareness, I incorporated Unreal's <strong>Environment Query System (EQS)</strong>, 
                enabling the NPC to dynamically select paths and targets based on contextual data. Additionally, 
                the character featured internal state systems such as <strong>hunger and energy levels</strong>.
                When energy was depleted, the AI would begin searching for food throughout the map, intelligently recalling the locations 
                of items it had seen before. 
              </p>
              <p> 
                The project was awarded a <strong>9.5 out of 10</strong> and nominated for <strong>Honors Distinction</strong>, 
                recognizing both its technical ambition and polished execution. 
              </p>
            </div>
            <div className="badge-container">
              <span className="badge">Unreal Engine 5</span>
              <span className="badge">Artificial Intelligence</span>
              <span className="badge">Game Development</span>
              <span className="badge">Behavior Trees</span>
              <span className="badge">Environment Query System (EQS)</span>
              <span className="badge">Programming</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}