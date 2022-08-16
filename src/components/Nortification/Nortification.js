import React, { useEffect } from "react";
import "../Nortification/Nortification.css";
import Template from "./Template";
import { getNotifications } from "../../features/Nortification/nortificationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Nortification = () => {
  const dispatch = useDispatch();
  const { nortifications } = useSelector((state) => state.nortification);

  useEffect(() => {
    dispatch(getNotifications());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="nortification">
      <div className="nortification-container">
        {nortifications.map((e) => {
          return <Template text={e.text} key={e._id} />;
        })}
      </div>
    </div>
  );
};

export default Nortification;
