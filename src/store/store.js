// src/stores.js
import { writable } from "svelte/store";
import axios from "axios";

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
  backgroundImgSrc: null,
  geoData: null,
  weather: null,
  cards: [
    {
      id: 0,
      component: "Time",
      title: "Card 1",
      position: {
        x: 15,
        y: 5,
      },
    },
    // {
    //   id: 1,
    //   component: "Time",
    //   title: "Overlapper",
    //   position: {
    //     x: 15,
    //     y: 5,
    //   },
    // },
  ],
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

function updateCardById(cards, id, newProperties) {
  return cards.map((card) => {
    if (card.id === id) {
      return { ...card, ...newProperties };
    }
    return card;
  });
}

export const updateCardPosition = (id, x, y) => {
  store.update((currentState) => {
    return {
      ...currentState,
      cards: updateCardById(currentState.cards, id, { position: { x, y } }),
    };
  });
};

export const getCityFromIp = async () => {
  const { data } = await axios.get("https://ipapi.co/json/");
  store.update((currentState) => {
    return {
      ...currentState,
      geoData: data,
    };
  });
  return data;
};

export const getCurrentWeather = async (city) => {
  const accessKey = import.meta.env.VITE_WEATHERAPI_API_ACCESS;
  const { data } = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${accessKey}&q=${city}&aqi=no`);
  store.update((currentState) => ({ ...currentState, weather: data }));

  return data;
};

export const getImage = async (weather) => {
  try {
    console.log("🚀 ~ file: store.js:104 ~ getImage ~ weather:", weather);
    // TODO: Activate this later, leave commented out when dev because rate limit 50/h
    // imgSrc="https://images.unsplash.com/photo-1506202687253-52e1b29d3527?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    // imgSrc =
    //   "https://images.unsplash.com/photo-1445964047600-cdbdb873673d?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    // const {response} = await unsplash.photos.getRandom({ query: 'landscape', count: 1, orientation: 'landscape', featured: true });
    // imgSrc = response[0].urls.regular;
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};
