import React from 'react';
import './experiencesModal.css';

export default function CanteraModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl">
          <div className="modal-header">
            <h5 className="modal-title">Cantera de empresas</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="modal-body">
            <div className="experience-entry">
              <h2 className="experience-title">Programming Teacher - Cantera de Empresas</h2>
              <h3 className="experience-dates">February 2024 - April 2024</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}