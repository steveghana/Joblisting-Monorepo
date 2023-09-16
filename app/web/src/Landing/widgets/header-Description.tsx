import React from "react";
interface IHeaderDescr {
  classname: string;
  header: string;
  description: string;
}
const HeaderDescription: React.FC<IHeaderDescr> = (props) => {
  return (
    <div className={props.classname}>
      <h1>{props.header}</h1>
      <p>{props.description}</p>
    </div>
  );
};
export default HeaderDescription;
