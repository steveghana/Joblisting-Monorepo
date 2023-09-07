import Image from "next/image";
import React from "react";
import Graphic from "../../assets/illustrasi_header.png";
import patternLeft from '../../assets/Vector_Smart_Object2.png'
import Netflix from "../../assets/netflix.png";
import Slack from "../../assets/slack.png";
import Gitlab from "../../assets/gitlab.png";
import Paypal from "../../assets/paypal.png";
import { Search } from "@mui/icons-material";
const Banner = () => {
  return (
    <div className="banner__container">
      <div className="banner__wrapper">
        <div className="banner__left">
          <div className="banner__left-pattern">
            <Image src={patternLeft} alt="pattern" className="banner__left-pattern-img"/>
          </div>
          <div className="banner__left-top">
            <h1>Find your Job better <br/> and faster</h1>
            <p>
              Find your dream job better and faster with savannah tech
            </p>
            <div className="banner__left-input">
              <input type="text" placeholder="Search by skill, company or jobs" />
              <div className="banner__left-input-search">
              <Search sx={{color:'white'}}/>

              </div>
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
