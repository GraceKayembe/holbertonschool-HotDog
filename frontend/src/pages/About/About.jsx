import React from "react";
import WhatWeDo_Card from "./WhatWeDo_Card.jsx";
import whatwedo_Data from "./whatwedo_Data.js";
import Sponsored_Card from "./Sponsored_Card.jsx";
import sponsored_Data from "./sponsored_Data.js";
import ChooseUs_Card from "./ChooseUs_Card.jsx";
import chooseUs_Card_Data from "./chooseUs_Card_Data.js";
import About_Card from "./About_Card.jsx";
import about_Data from "./about_Data.js";
import PracticeTestimonials_Card from "./PracticeTestimonials_Card.jsx";
import practicetestimonials_Data from "./practicetestimonials_Data.js";
import AvatarImages from "../../components/AvatarImages/AvatarImages.jsx";
import "./aboutStyle.css";
import "../../components/AvatarImages/avatarStyle.css";


// Function for main banner
function aboutCard(props) {
  return (
    <About_Card
    key={props.id}
    img={props.img}
    bannerTitle={props.bannerTitle}
    description={props.description}
    showButton={props.showButton}
    />
  );
}

// Function what to do
function slideShow(props) {
  return (
    <WhatWeDo_Card
    key={props.id}
    img={props.img}
    title={props.title}
    description={props.description}
    />
  );
}

// Function choose us
function chooseUsCard(props) {
  return (
    <ChooseUs_Card
    key={props.id}
    description={props.description}
    />
  );
}

// Function what to do
function sponsorCard(props) {
  return (
    <Sponsored_Card
    key={props.id}
    img={props.img}
    description={props.description}
    />
  );
}

// Function practice testimonials
function practiceTestimonalsCard(props) {
  return (
    <PracticeTestimonials_Card
    key={props.id}
    img={props.img}
    name={props.name}
    companyName={props.companyName}
    description={props.description}
    />
  );
}


function About() {
  return (
    <div className="about-container">

      {/* Banner Section (100vw) */}
      <div className="about-wide-section">
        <div className="about-banner-parent">
          <div className="about-banner-container">
            {about_Data.map(aboutCard)}
          </div>
        </div>
      </div>

      {/* Centered Content */}
      <div className="about-content">

        <div className="using-hotDog-container">
          <h1 className="about-heading">Our Story</h1>

        {/* Subheading */}
        <p className="about-body-text">
          HotDog simplifies how pet owners and service providers connect. We believe booking care for your pet should be easy, reliable, and stress-free.
        </p>
        <p className="about-body-text">
          With booking, scheduling, and communication in one place, HotDog helps providers manage their services while giving pet owners a simple way to book the care their pets need.
        </p>
        </div>

        {/* What we do */}
        <div className="whatwedo_parentcontainer">
          <h1 className="about-heading">What we do for you</h1>
          <p className="whatwedo-subheading">
            HotDog makes it easier for pet owners to find, book, and return to your practice.
          </p>

          <div className="whatwedo-showcontainer">
            {whatwedo_Data.map(slideShow)}
          </div>
        </div>

        {/* Provider section */}
        <div className="using-hotDog-container">
          <h1 className="about-heading">
            Are you a provider interested <br /> in our platform?
          </h1>

          {chooseUs_Card_Data.map(chooseUsCard)}
        </div>

      </div>

      {/* Testimonials FULL WIDTH */}
      <div className="businesstesi-section">
          <h2 className="testimonial-heading" style={{textAlign: "center", width: "100%"}}>
              Testimonials of businesses we work with
          </h2>
        <div className="businesstesi_parentcontainer">      
          <div className="businesstesi-showcontainer">
            {practicetestimonials_Data.map(practiceTestimonalsCard)}
          </div>
        </div>
      </div>

      {/* Sponsor Section */}
      <div className="about-content">
        <div className="sponsor-container">
          {sponsored_Data.map(sponsorCard)}
        </div>
      </div>

    </div>
  );
}


export default About;
