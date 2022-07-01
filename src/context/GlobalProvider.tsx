import { useEffect, useState, useRef } from "react";
import { GlobalContext } from "./GlobalContext";
import { Building } from "../interfaces";

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const GlobalProvider = ({ children }: ProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [buildings, setBuildings] = useState<Array<Building>>([
    { pos: 0, height: 1 },
    { pos: 1, height: 1 },
    { pos: 2, height: 1 },
    { pos: 3, height: 1 },
    { pos: 4, height: 1 },
    { pos: 5, height: 1 },
    { pos: 6, height: 1 },
    { pos: 7, height: 1 },
  ]);
  const buildingsContainer = useRef(null) as any;

  const changeMode = (): void => {
    setDarkMode(!darkMode);
  };

  const changeHeight = (height: number, pos: number): void => {
    if (height < 11 && height > 0) {
      setBuildings((prevBuildings) =>
        prevBuildings.map((b) => {
          return b.pos != pos ? b : { pos, height };
        })
      );
    }
  };

  useEffect(() => {
    const chil: Array<HTMLDivElement> = Array.from(
      buildingsContainer.current.children
    );
    chil.forEach((b, index) => {
      b.style.height = `${10 * buildings[index].height}%`;
      // tomamos los edificios anteriores al actual
      const prevSiblings = buildings.slice(0, index);
      //vemos si todos los anteriores son más bajos que el actual
      const higherThanPrevious = prevSiblings.every(
        (s) => s.height < buildings[index].height
      );
      if (higherThanPrevious) {
        b.style.backgroundColor = "green";
      } else {
        b.style.backgroundColor = "gray";
      }
    });
  }, [buildings]);

  return (
    <GlobalContext.Provider
      value={{
        darkMode,
        buildings,
        changeHeight,
        changeMode,
        buildingsContainer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
