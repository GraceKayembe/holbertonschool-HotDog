import React from "react";

function ChooseUs_Card(props) {
  return (
    <div className="sponsor-card">
      {/* description */}
      {props.description && (
        <p className="about-body-text">{props.description}</p>
      )}
      
    </div>
  
  );
}


export default ChooseUs_Card;

