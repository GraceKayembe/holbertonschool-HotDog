import React from "react";
import AvatarImages from "../../components/AvatarImages/AvatarImages.jsx";

function WhatWeDo_Card(props) {
  return (
    <div className="about-bannershow-card">
      {/* icons */}
      {props.img && (
        <img src={props.img} className="icon-whatwedo" />
      )}

      {/* Banner slide show */}
      {props.title && props.description && (
        <>
          <p className="about-banner-title">{props.title}</p>
          <p className="about-banner-description">{props.description}</p>
        </>
      )}
      
    </div>
  
  );
}


export default WhatWeDo_Card;

