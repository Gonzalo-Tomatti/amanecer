import React, { useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import Buildings from "./components/Buildings";
import Controls from "./components/Controls";
import Trivia from "./components/Trivia";
import { GlobalContext } from "./context/GlobalContext";

function App() {
  const { darkMode } = useContext(GlobalContext);
  return (
    <div
      className={`${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      } text-center wrapper`}
    >
      <Header />
      <Buildings />
      <Controls />
      <Trivia />
    </div>
  );
}

export default App;
