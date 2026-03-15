import React from "react";

function ChooseUs_Card(props) {
  if (!props.description) return null;

  return <p className="about-body-text">{props.description}</p>;
}


export default ChooseUs_Card;

