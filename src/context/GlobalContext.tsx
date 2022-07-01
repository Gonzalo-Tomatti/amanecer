import { createContext } from "react";
import { Building } from "../interfaces";

interface ContextProps {
  darkMode: boolean;
  buildings: Array<Building>;
  changeHeight: (height: number, pos: number) => void;
  buildingsContainer: null;
  changeMode: () => void;
}
export const GlobalContext = createContext<ContextProps>({} as ContextProps);
