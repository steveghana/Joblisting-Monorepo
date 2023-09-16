import React from 'react';
import Graphic from '../../assets/illustrasi_header.png';
import patternLeft from '../../assets/Vector_Smart_Object2.png';
import Netflix from '../../assets/netflix.png';
import Slack from '../../assets/slack.png';
import Gitlab from '../../assets/gitlab.png';
import Paypal from '../../assets/paypal.png';
import { Search } from '@mui/icons-material';
const Banner = () => {
  return (
    <div className="custom-banner__container">
      <div className="custom-banner__wrapper">
        <div className="custom-banner__left">
          <div className="custom-banner__left-pattern">
            <img
              src={patternLeft}
              alt="pattern"
              className="custom-banner__left-pattern-img"
            />
          </div>
          <div className="custom-banner__left-top">
            <h1>
              Find your Job better <br /> and faster
            </h1>
            <p>Find your dream job better and faster with savannah tech</p>
            <div className="custom-banner__left-input">
              <input
                type="text"
                placeholder="Search by skill, company or jobs"
              />
              <div className="custom-banner__left-input-search">
                <Search sx={{ color: 'white' }} />
              </div>
            </div>
          </div>
        </div>
        <div className="custom-banner__right">
          <img
            className="custom-banner__right-gElement"
            src={Graphic}
            alt="Graphic Element"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
