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
  const [info, setInfo] = useState<string>("");
  const [tallestBuilding, setTallestBuilding] = useState<number>(1);
  const buildingsContainer = useRef(null) as any;
  const [sunset, setSunset] = useState<boolean>(true);

  const changeMode = (): void => {
    setDarkMode(!darkMode);
  };

  const changeSunset = (): void => {
    setSunset(!sunset);
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

  const randomize = (): void => {
    setBuildings(
      buildings.map((b) => {
        return {
          pos: b.pos,
          height: Math.ceil(Math.random() * 10),
        };
      })
    );
  };

  const reset = (): void => {
    setBuildings(
      buildings.map((b) => {
        return {
          pos: b.pos,
          height: 1,
        };
      })
    );
  };

  const addBuilding = (): void => {
    setBuildings((prevBuildings) => [
      ...prevBuildings,
      { pos: prevBuildings.length, height: 1 },
    ]);
  };

  const deleteBuilding = (): void => {
    setBuildings((prevBuildings) => [
      ...prevBuildings.slice(0, prevBuildings.length - 1),
    ]);
  };

  const fetchNumberTrivia = async (number: number): Promise<string> => {
    const res = await fetch(`http://numbersapi.com/${number}`);
    const data = await res.text();
    return data;
  };

  useEffect(() => {
    const chil: Array<HTMLDivElement> = Array.from(
      buildingsContainer.current.children
    );
    chil.forEach((b, index) => {
      b.style.height = `${10 * buildings[index].height}%`;
      // tomamos los edificios anteriores al actual en modo atardecer y los suigientes en amanecer
      const prevSiblings = sunset
        ? buildings.slice(0, index)
        : buildings.slice(index + 1, buildings.length);
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
    const heights = buildings.map((b) => b.height);
    setTallestBuilding(Math.max(...heights));
  }, [buildings, sunset]);

  useEffect(() => {
    fetchNumberTrivia(tallestBuilding).then((trivia) => {
      setInfo(trivia);
    });
  }, [tallestBuilding, buildings]);

  return (
    <GlobalContext.Provider
      value={{
        changeHeight,
        changeMode,
        reset,
        randomize,
        addBuilding,
        deleteBuilding,
        changeSunset,
        buildings,
        darkMode,
        buildingsContainer,
        info,
        sunset,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
