import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ReactUI from './ReactUI';
import initGame from './initGame';
import './ReactComponents/Modals/modalGlobal.css';

const root = ReactDOM.createRoot(document.getElementById('ui'));
root.render(
  <React.StrictMode>
    <ReactUI />
  </React.StrictMode>
);

setTimeout(() => {
  initGame();
}, 1000);
