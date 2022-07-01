import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Buildings = () => {
  const { buildings, buildingsContainer, changeHeight } =
    useContext(GlobalContext);

  return (
    <div
      className="buildings d-flex align-items-end justify-content-center"
      ref={buildingsContainer}
    >
      {buildings.map((b, index) => (
        <div key={b.pos} className="building d-flex align-items-end mx-2">
          <input
            onChange={(e) => changeHeight(+e.target.value, index)}
            className="input text-center"
            type="text"
            value={b.height}
          />
        </div>
      ))}
    </div>
  );
};

export default Buildings;
