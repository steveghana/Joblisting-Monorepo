import Image, { StaticImageData } from "next/image";
import React from "react";
import { ArrowRightAlt } from "@mui/icons-material";
const MessagingTab: React.FC<{
  head: string;
  icons: StaticImageData;
  text: string;
}> = (props) => {
  return (
    <div className="messaging__tab">
      <div className="messaging__tab-icon">
        <Image src={props.icons} alt="img" />
      </div>
      <h2>{props.head}</h2>
      <p>{props.text}</p>
      <div className="messaging__tab-link">
        Learn more <ArrowRightAlt />{" "}
      </div>
    </div>
  );
};
export default MessagingTab;
