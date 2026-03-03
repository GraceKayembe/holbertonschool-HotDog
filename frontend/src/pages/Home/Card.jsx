import React from "react";

function Card({ img, title, linktoApptPage }) {
  return (
    <div
      className="topsearchs-card"
      onClick={props.onClick}
      style={{
<<<<<<< HEAD
        backgroundImage: `url(${img})`,
        cursor: "pointer"
=======
        backgroundImage: `url(${props.img})`,
        cursor: "pointer",
>>>>>>> d2ba4548a21f4d648414b5a269bbe245c3682f30
      }}
      onClick={linktoApptPage}
    >
      <div className="topsearchs-overlay">
        <p className="topsearchs-servicestitle">{title}</p>
      </div>
    </div>
  );
}

export default Card;

