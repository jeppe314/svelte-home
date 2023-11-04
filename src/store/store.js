// src/stores.js
import { writable } from "svelte/store";

const initialState = {
  states: Object.freeze({
    IS_FETCHING: "isFetching",
    IS_STALLED: "isStalled",
    IS_FINISHED: "isFinished",
  }),
  cards: [
    {
      name: "Card 1",
    },
    {
      name: "Card 2",
    },
  ],
};

export const store = writable(initialState);

// generic update component to update any key you want
export const updateStore = (key, newValue) => store.update((state) => ({ ...state, [key]: newValue }));
