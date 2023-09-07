import Image from "next/image";
import React from "react";
import Logo from "../../assets/Lookscout.png";
const NavBar = () => {
  return (
    <div className="nav__container">
      <ul className="nav__wrapper">
        <li className="nav__item-logo">
          <Image src={Logo} alt="Logo" />
        </li>
        <li className="nav__item">Home</li>
        <li className="nav__item">Our Product</li>
        <li className="nav__item">Resources</li>
        <li className="nav__item">Contact</li>
        <li className="nav__item-auth">Login</li>
        <li className="nav__item_auth">Sign up</li>
      </ul>
    </div>
  );
};

export default NavBar;
