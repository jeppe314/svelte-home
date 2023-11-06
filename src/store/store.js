// src/stores.js
import axios from "axios";
import { writable } from "svelte/store";

const initialState = {
  states: Object.freeze({
    IS_FETCHING: "isFetching",
    IS_STALLED: "isStalled",
    IS_FINISHED: "isFinished",
  }),
  cards: [
    {
      title: "Card 1",
      position: {
        x: 15,
        y: 5,
      },
      dimensions: {
        height: 7,
        width: 7,
      },
    },
    {
      title: "Overlapper",
      position: {
        x: 15,
        y: 5,
      },
      dimensions: {
        height: 7,
        width: 7,
      },
    },
    // {
    //   title: "Card 2",
    // },
  ],
  message: "test",
};

export const store = writable(initialState);

// generic update component to update any key you want
export const updateStore = (key, newValue) => store.update((state) => ({ ...state, [key]: newValue }));

export const moveRight = (title) => {
  console.log("moveRight");
  console.log(title);
  store.update((state) => {
    const cardIndex = state.cards.findIndex((card) => card.title === title);
    if (cardIndex !== -1) {
      state.cards[cardIndex].position.x += 1;
    }
    return { ...state };
  });
};
