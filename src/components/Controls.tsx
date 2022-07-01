import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Controls = () => {
  const {
    randomize,
    reset,
    addBuilding,
    deleteBuilding,
    changeSunset,
    sunset,
  } = useContext(GlobalContext);
  return (
    <div className="mt-3 d-flex flex-wrap justify-content-center">
      <button className="btn btn-success m-2" onClick={reset}>
        Resetear
      </button>
      <button className="btn btn-success m-2" onClick={randomize}>
        Aleatorio
      </button>
      <button className="btn btn-success m-2" onClick={addBuilding}>
        Añadir edificio
      </button>
      <button className="btn btn-success m-2" onClick={deleteBuilding}>
        Eliminar edificio
      </button>
      <button className="btn btn-success m-2" onClick={changeSunset}>
        {sunset ? "Atardecer" : "Amanecer"}
      </button>
    </div>
  );
};

export default Controls;
