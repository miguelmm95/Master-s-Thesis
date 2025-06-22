import React from 'react';

export default function AzureModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-xl">
          <div className="modal-header">
            <h5 className="modal-title">Skills</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="modal-body">
            <div className="entry">
              <h2 className="title">Azure</h2>
            </div>
            <div className="text">
              <p>
                I have several years of experience working with <strong>Microsoft Azure</strong>, primarily in conjunction with <strong>Office 365</strong>, within real-world IT administration environments. 
                This included tasks such as configuring virtual networks, managing cloud resources, and administering users and devices across distributed infrastructures.
              </p>
              <p>
                A key part of my experience involved working with <strong>Azure Active Directory</strong>, which allowed me to manage identity and access across the organization efficiently. 
                This hands-on experience gave me a strong understanding of how to implement secure authentication, control permissions, and maintain centralized user management in scalable enterprise systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}