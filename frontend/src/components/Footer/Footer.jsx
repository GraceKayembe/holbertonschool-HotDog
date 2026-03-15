import React from "react";
import "./Footer.css";
import yellowLogo from "../../assets/logo/hotdog_logo_yellow_background.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

          <img
            src={yellowLogo}
            alt="HotDog Logo"
            className="footer-logo"
          />

        <div className="footer-columns">
          <ul className="footer-links">
            <li className="footer-title">Patient</li>
            <li><Link to="/services">Find a Practice</Link></li>
            <li><Link to="">Dashboard</Link></li>
            <li><a href="/pets">My Pet(s)</a></li>
            <li><Link to="/dashboard">My Account</Link></li>
          </ul>

          <ul className="footer-links">
            <li className="footer-title">Practices</li>
            <li><Link to="/login">Dashboard Login</Link></li>
          </ul>

          <ul className="footer-links">
            <li className="footer-title">HotDog</li>
            <li><Link to="/about">About Us</Link></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

export default Footer;