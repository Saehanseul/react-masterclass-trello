import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: ITodo[];
}
export const toDoState = atom<IToDoState>({
  key: "toDoState",
  default: {
    ToDo: [],
    Doing: [],
    Done: []
  }
});
