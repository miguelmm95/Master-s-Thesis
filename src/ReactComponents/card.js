import React from "react";
import "./card.css";

export default function Card({ flipped, src, onClick }) {
  return (
    <div className="card-container" onClick={onClick}>
      <div className={`card ${flipped ? "flipped" : ""}`}>
        <div className="card-front" src={src} alt="card front"></div>
        <div className="card-back" src="./assets/images/cardBack.png" alt="card back"></div>
      </div>
    </div>
  );
}