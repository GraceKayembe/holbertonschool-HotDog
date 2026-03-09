import React from "react";

function About_Card(props) {
  return (
    <div className="about-banner-card">
      {/* Left Column: text */}
      <div className="about-banner-text">
        {props.bannerTitle && <h1 className="about-banner-h1">{props.bannerTitle}</h1>}
        {props.description && <p className="about-subheading">{props.description}</p>}
        {props.showButton && (
          <button className="contact-us-to-register-btn">Contact Us to Register!</button>
        )}
      </div>

      {/* Right Column: image */}
      {props.img && (
        <div className="about-banner-image">
          <img src={props.img} alt="Banner" className="about-banner-img" />
        </div>
      )}
    </div>
  );
}

export default About_Card;