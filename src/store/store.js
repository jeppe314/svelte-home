// src/stores.js
import { writable } from "svelte/store";

const initialState = {
  states: Object.freeze({
    IS_FETCHING: "isFetching",
    IS_STALLED: "isStalled",
    IS_FINISHED: "isFinished",
  }),
  message: "Hello world!",
};

export const store = writable(initialState);

export const updateMessage = (newMessage) => store.update((currentState) => ({ ...currentState, message: newMessage }));
