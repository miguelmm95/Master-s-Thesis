import React from 'react';
import './studiesModal.css';

export default function ITModal({ visible, onClose }) {
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
              <h2 className="study-title">Higher Technician Degree in Microcomputer Systems and Networks - I.E.S. Sant Vicent Ferrer</h2>
              <h3 className="study-dates">2015 - 2017</h3>
            </div>
            <div className="text">
              <p>
                During this degree, I acquired a solid foundation in <strong>computer systems</strong>, mastering the installation, configuration, and maintenance of computer networks.
                I also learned to manage operating systems, both desktop and server, and to implement security measures to protect information.
              </p>
              <p>
                Additionally, I gained skills in <strong>technical support</strong>, allowing me to assist users with hardware and software issues effectively.
                This training provided me with a comprehensive understanding of IT infrastructure and the ability to troubleshoot and resolve technical problems efficiently.
              </p>
              <p>
                Furthermore, I developed practical expertise in <strong>Windows Server administration</strong> using tools like <strong>Azure</strong> and <strong>Office 365</strong>, which allowed me to manage and deploy networked environments efficiently.
                I also acquired fundamental knowledge in <strong>cybersecurity</strong> and <strong>Python programming</strong>, which enhanced my capabilities in system automation and information protection.
              </p>
            </div>
            <div className="badge-container">
              <span className="badge">Windows Server</span>
              <span className="badge">Azure</span>
              <span className="badge">Office 365</span>
              <span className="badge">Cybersecurity</span>
              <span className="badge">IT Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}