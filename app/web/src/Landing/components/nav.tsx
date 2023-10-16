import React from "react";
import Logo from "../../assets/Lookscout.png";
import { Link } from "react-router-dom";
// import Link from 'next/link';
const NavBar = () => {
  return (
    <div className="custom-nav__container">
      <ul className="custom-nav__wrapper">
        <li className="custom-nav__item-logo">
          <img src={Logo} alt="Logo" className="custom-logoimage" />
        </li>
        <li className="custom-nav__item">Home</li>
        <li className="custom-nav__item">Jobs</li>
        <li className="custom-nav__item">Career tips</li>
        <li className="custom-nav__item-auth">
          {" "}
          <Link style={{ color: "white" }} to="/management/profile/details">
            Sign in
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
