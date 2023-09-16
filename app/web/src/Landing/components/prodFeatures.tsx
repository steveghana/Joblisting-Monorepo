import HeaderDescription from "../widgets/header-Description";
import MessagingTab from "../widgets/messagingTabs";
import React from "react";
import { prodFeatdata } from "../data/data";
import graphicImg from "../../assets/Photo.png";
const ProdFeatures = () => {
  return (
    <div className="custom-prodFeat__container">
      <div className="custom-prodFeat__wrapper">
        <HeaderDescription
          classname="prodFeat__header"
          header=""
          description="Keeping your eye on the ball while performing a deep dive on the start-up mentality to  derive convergence on cross-platform integration."
        />
        <div className="custom-prodFeat__box">
          <div className="custom-prodFeat__Tabs">
            {prodFeatdata.map((item) => (
              <MessagingTab
                icons={item.icons}
                head={item.title}
                text={item.description}
                key={item.id}
              />
            ))}
          </div>
          <div className="custom-prodFeat__graphicImg">
            <img src={graphicImg} alt="img" className="custom-prodFeat__img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdFeatures;
