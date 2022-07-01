import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Trivia = () => {
  const { info } = useContext(GlobalContext);
  return (
    <div className="py-4">
      <p> Dato curioso sobre el número del edificio más alto:</p>
      <p> {info}</p>
    </div>
  );
};

export default Trivia;
