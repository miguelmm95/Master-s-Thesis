import React from 'react';

export default function MasterModal({ visible, onClose }) {
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
              <h2 className="study-title">Master's Degree in Software Engineering and Computer Systems - UNIR</h2>
              <h3 className="study-dates">2024 - 2025</h3>
            </div>
            <div className="text">
              <p>
                In this master's program, I deepened my knowledge in <strong>software engineering</strong>, focusing on the design and development of complex systems.
                I learned advanced methodologies for software development, including <strong>Agile</strong> and <strong>DevOps</strong>, which enhanced collaboration and efficiency in project management.
              </p>
              <p>
                Additionally, I acquired skills in <strong>cloud computing</strong>, which allowed me to design and deploy scalable applications using platforms like <strong>AWS</strong>.
                This training equipped me with the tools to create robust, maintainable, and high-performance software solutions.
              </p>
              <p>
                The program also included comprehensive training in <strong>full-stack web development</strong>, where I worked with modern technologies such as <strong>React</strong> for frontend development and <strong>Spring</strong> for backend services, enabling me to build dynamic and efficient web applications from end to end.
              </p>
              <p>
                Furthermore, I strengthened my understanding of <strong>cybersecurity</strong> principles, gaining the ability to identify vulnerabilities and implement effective strategies to secure systems and protect sensitive data.
              </p>
            </div>
            <div className="badge-container">
              <span className="badge">Agile</span>
              <span className="badge">DevOps</span>
              <span className="badge">AWS</span>
              <span className="badge">Full-Stack Development</span>
              <span className="badge">React</span>
              <span className="badge">Spring</span>
              <span className="badge">Cybersecurity</span>
              <span className="badge">JavaScript</span>
              <span className="badge">Node.js</span>
              <span className="badge">HTML5 / CSS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}