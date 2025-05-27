import React from 'react';

export default function UnityModal({ visible, onClose }) {
    if (!visible) return null; // No renderizar si no es visible
    
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Unity Engine</h2>
                <p>I know how to use Unity jaja saludos</p>
            </div>
        </div>
    );
}