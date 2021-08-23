import React from "react";
import logo from "../../assets/images/dmu-logo-yellow.svg.svg";
import "./Logo.css" 

const Logo = () => {
  return (
    <div className="logo">
        <img height={200} src={logo} alt="logo" />
    </div>
  );
};

export default Logo;
