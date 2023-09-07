import Image from "next/image";
import React from "react";
import Logo from "../../assets/Lookscout.png";
import Link from "next/link";
const NavBar = () => {
  return (
    <div className="nav__container">
      <ul className="nav__wrapper">
        <li className="nav__item-logo">
          <Image src={Logo} alt="Logo" className="logoimage" />
        </li>
        <li className="nav__item">Home</li>
        <li className="nav__item">Jobs</li>
        <li className="nav__item">Career tips</li>
        <li className="nav__item-auth"> <Link style={{color:'white'}} href="/auth">Sign in</Link></li>
      </ul>
    </div>
  );
};

export default NavBar;
