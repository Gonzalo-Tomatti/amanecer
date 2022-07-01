import { useEffect, useState, useRef } from "react";
import { GlobalContext } from "./GlobalContext";
import { Building } from "../interfaces";

const trivia: string[][] = [
  [
    "1 is the loneliest number.",
    "1 is the number of moons orbiting Earth.",
    "1 is the number of Gods in monotheism.",
  ],
  [
    "2 is the first magic number in physics.",
    "2 is the price in cents per acre the USA bought Alaska from Russia.",
    "2 is the number of polynucleotide strands in a DNA double helix.",
  ],
  [
    "3 is the cost in cents to make a $1 bill in the United States.",
    "3 is the number of notes in a triad, the basic form of any chord.",
    "3 is cans of Spam consumed every second in the United States.",
  ],
  [
    "4 is the maximal number of horses in one row for carriage.",
    "4 is the number of chambers the mammalian heart consists of.",
    "4 is the number of nucleobase types in DNA and RNA – adenine, guanine, cytosine, thymine (uracil in RNA).",
  ],
  [
    "5 is the holy number of Discordianism, as dictated by the Law of Fives.",
    "5 is the number of babies born in a quintuplet.",
    "5 is the most common number of gears for automobiles with manual transmission.",
  ],
  [
    "6 is the number of ponies in the main cast of My Little Pony: Friendship is Magic.",
    "6 is the number of feet below ground level a coffin is traditionally buried.",
    "6 is the number of points on a Star of David.",
  ],
  [
    "7 is the number of types of viruses according to the Baltimore classification.",
    "7 is the number of SI base units.",
    "7 is the number of colors of the rainbow.",
  ],
  [
    "8 is the number of principles of Yong in Chinese calligraphy.",
    "8 is the number of furlongs in a mile.",
    "8 is the number of legs that arachnids have.",
  ],
  [
    "9 is the number of innings in a regulation, non-tied game of baseball.",
    "9 is the number of circles of Hell in Dante's Divine Comedy.",
  ],
  [
    "10 is the highest score possible in Olympics gymnastics competitions.",
    "10 is the number of hydrogen atoms in butane, a hydrocarbon.",
    "10 is the number of official inkblots in the Rorschach inkblot test.",
  ],
];
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

  //al tener numbersAPI el protocolo http y no htpps salta un mensaje de error de mixed content diciendo que no se puede traer contenido http a una página https
  // const fetchNumberTrivia = async (number: number): Promise<string> => {
  //   const res = await fetch(`http://numbersapi.com/${number}`);
  //   const data = await res.text();
  //   return data;
  // };

  useEffect(() => {
    const chil: Array<HTMLDivElement> = Array.from(
      buildingsContainer.current.children
    );
    chil.forEach((b, index) => {
      b.style.height = `${10 * buildings[index].height}%`;
      // tomamos los edificios anteriores al actual en modo atardecer y los suigientes en amanecer
      const prevSiblings: Building[] = sunset
        ? buildings.slice(0, index)
        : buildings.slice(index + 1, buildings.length);
      //vemos si todos los anteriores son más bajos que el actual
      const higherThanPrevious: boolean = prevSiblings.every(
        (s) => s.height < buildings[index].height
      );
      if (higherThanPrevious) {
        b.style.backgroundColor = "green";
      } else {
        b.style.backgroundColor = "gray";
      }
    });
    const heights: number[] = buildings.map((b) => b.height);
    setTallestBuilding(Math.max(...heights));
  }, [buildings, sunset]);

  useEffect(() => {
    // fetchNumberTrivia(tallestBuilding).then((trivia) => {
    //   setInfo(trivia);
    // });
    setInfo(
      trivia[tallestBuilding - 1][
        Math.floor(Math.random() * trivia[tallestBuilding - 1].length)
      ]
    );
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
