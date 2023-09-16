import React from "react";
import MessagingTab from "../../widgets/messagingTabs";
import { messagedata } from "../data/data";
import HeaderDescription from "../../widgets/header-Description";
const Messaging = () => {
  return (
    <div className="custom-messaging__container">
      <div className="custom-messaging__wrapper">
        <HeaderDescription
          classname="messaging__header"
          header="Message for all"
          description="   User generated content in real-time will have multiple touchpoints
            for offshoring"
        />
        <div className="custom-messaging__Tabs">
          {messagedata.map((item) => (
            <MessagingTab
              icons={item.icons}
              head={item.title}
              text={item.description}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messaging;
