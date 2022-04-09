import React from 'react';
import "./LandingPage.css";
import landing from "../../assets/images/landing.png"
const Landing = () => {
  return (
    <div className="landing__page__container">
      <div className="landing__page--text">
        <div className="landing__page__logo--text">Notesy</div>
        <div className="landing__page__heading">
          <div className="landing__page__heading--text">Take Notes,</div>
          <div className="landing__page__heading--text">The Modern Way</div>
          <div className="landing__page__description--text">
            Manage your daily tasks with ease and boost your efficency
          </div>
        </div>

        <div className="landing__page__auth">
          <div className="landing__page--login button  p-4 txt-2xl txt-bold bg--success rounded-m">
            Get Started
          </div>
          <div className="landing__page--signup">
            Don't have an account? <span className="signup"> Signup</span>
          </div>
        </div>
      </div>
      <div className="landing__page--image">
        <img src={landing} alt=""className="image--pen" />
      </div>
    </div>
  );
}

export default Landing