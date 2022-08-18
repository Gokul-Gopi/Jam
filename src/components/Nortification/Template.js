import React from "react";
import "../Nortification/Nortification.css";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";

const Template = ({ text }) => {
  return (
    <div className="nortification-template">
      {text.includes("liked") ? (
        <AiFillHeart className="icon" />
      ) : (
        <BiCommentDetail className="icon" />
      )}
      <span>{text}</span>
    </div>
  );
};

export default Template;
