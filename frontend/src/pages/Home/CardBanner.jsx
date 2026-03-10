import React from "react";

function CardBanner(props) {
  return (
    <div className="home-banner-card">
      {/* heading*/}
      {props.bannerTitle && (
        <>
          <h2 className="home-banner-h1">{props.bannerTitle}</h2>
          {props.showButton && (
          <button 
            className="home-banner-btn"
            onClick={props.onButtonClick}
          >
            Find a Provider!
          </button>
          )}
        </>
      )}

      {/* banner image */}
      {props.img && (
        <img
          src={props.img}
          alt="Banner"
          className="home-banner-img"
        />
      )}
    </div>
  );
}

export default CardBanner;


