import Image from "next/image";
import React from "react";
import Graphic from "../../assets/Graphic elements.png";
import Netflix from "../../assets/netflix.png";
import Slack from "../../assets/slack.png";
import Gitlab from "../../assets/gitlab.png";
import Paypal from "../../assets/paypal.png";
const Banner = () => {
  return (
    <div className="banner__container">
      <div className="banner__wrapper">
        <div className="banner__left">
          <div className="banner__left-top">
            <h1>Your Supercharged Design Workflow.</h1>
            <p>
              We’ve been told it is not possible to overachieve our customers’
              expectations. We have not reinvented the wheel, we decided to
              build upon it.
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
