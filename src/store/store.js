// src/stores.js
import { writable } from "svelte/store";

const STORE_KEY = "store";

// Function to read the store from localStorage
const readFromLocalStorage = () => {
  const stored = localStorage.getItem(STORE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return null;
};

// Initial state
const initialState = {
  states: Object.freeze({
    IS_FETCHING: "isFetching",
    IS_STALLED: "isStalled",
    IS_FINISHED: "isFinished",
  }),
  cards: [
    {
      id: 0,
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
      id: 1,
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
  ],
  message: "test",
};

// Initialize store with data from localStorage if available
const persistentState = readFromLocalStorage() || initialState;

export const store = writable(persistentState);

// Subscribe to the store and update localStorage whenever it changes
store.subscribe((state) => {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
});

// Optional: Export a function to manually save the store to localStorage (can be used to force a save if needed)
export const saveStore = () => {
  store.update((state) => {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
    return state;
  });
};
