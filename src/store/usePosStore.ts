import { create } from "zustand";

interface Pos {
  x: number
  y: number
}

interface PosState {
  pos: Pos
  setPos: (value: Pos) => void;
}

export const usePosStore = create<PosState>((set) => ({
  pos: {x: 0, y: 0},
  setPos: (pos) => {
    set({ pos });
  },
}));