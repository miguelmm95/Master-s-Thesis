import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ReactUI from './ReactUI';
import initGame from './initGame';
import './ReactComponents/Modals/modalGlobal.css';
// import './../node_modules/bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('ui'));
root.render(
  <React.StrictMode>
    <ReactUI />
  </React.StrictMode>
);

setTimeout(() => {
  initGame();
}, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
