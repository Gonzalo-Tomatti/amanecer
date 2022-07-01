import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import sun from "../sun.png";

const Buildings = () => {
  const { buildings, buildingsContainer, sunset, changeHeight } =
    useContext(GlobalContext);

  return (
    <div className={`${!sunset && "dawn"} buildings-scenary`}>
      <div
        className="buildings d-flex align-items-end justify-content-between mx-auto px-1"
        ref={buildingsContainer}
      >
        {buildings.map((b, index) => (
          <div
            key={b.pos}
            className="building d-flex align-items-end justify-content-center mx-2"
          >
            <input
              onChange={(e) => changeHeight(+e.target.value, index)}
              className="input text-center"
              type="text"
              value={b.height}
            />
          </div>
        ))}
      </div>
      <img className="sun" src={sun} alt="sol" />
    </div>
  );
};

export default Buildings;
