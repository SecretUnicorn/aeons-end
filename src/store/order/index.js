import { atom } from "recoil";

export const drawDeckAtom = atom({
  key: "drawDeck",
  default: [],
});

export const discardDeckAtom = atom({
  key: "discardDeck",
  default: [],
});

export const playersAtom = atom({
  key: "players",
  default: [
    {
      name: "Player 1",
      health: 10,
      energy: 0,
    },
  ],
});
