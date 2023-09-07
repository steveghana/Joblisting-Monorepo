import Image from "next/image";
import React from "react";
import Graphic from "../../assets/illustrasi_header.png";
import patternLeft from '../../assets/Vector_Smart_Object2.png'
import Netflix from "../../assets/netflix.png";
import Slack from "../../assets/slack.png";
import Gitlab from "../../assets/gitlab.png";
import Paypal from "../../assets/paypal.png";
const Banner = () => {
  return (
    <div className="banner__container">
      <div className="banner__wrapper">
        <div className="banner__left">
          <div className="banner__left-pattern">
            <Image src={patternLeft} alt="pattern" className="banner__left-pattern-img"/>
          </div>
          <div className="banner__left-top">
            <h1>Find Jobs better and faster</h1>
            <p>
              Find your dream job better and faster with savannah tech
            </p>
            <button>Get started</button>
          </div>
          <div className="banner__left-bottom">
            <h5>Who supports us</h5>
            <div className="logos">
              <Image src={Gitlab} alt="Gitlab" />
              <Image src={Slack} alt="slack" />
              <Image src={Netflix} alt="netflix" />
              <Image src={Paypal} alt="paypal" />
            </div>
          </div>
        </div>
        <div className="banner__right">
          <Image
            className="banner__right-gElement"
            src={Graphic}
            alt="Graphic Element"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
