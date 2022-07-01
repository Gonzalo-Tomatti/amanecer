import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Header = () => {
  const { darkMode, changeMode } = useContext(GlobalContext);
  return (
    <div className="pt-2 container">
      <h1>Atardecer</h1>
      <div className="d-flex align-items-center btn-container">
        {darkMode ? "dark" : "light"}
        <button
          onClick={changeMode}
          className={`${darkMode && "slide"} switch-btn ms-1`}
        >
          <span className="switch"></span>
        </button>
      </div>
      <p>
        Introduce números (1-10) para cambiar la altura de los edificios. Los
        edificios que tengan vista del atardecer se volverán verdes.
      </p>
    </div>
  );
};

export default Header;
