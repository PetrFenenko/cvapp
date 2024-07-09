import { createSlice } from "@reduxjs/toolkit";

const templates = {
  experience: {
    title: "",
    location: "",
    duration: "",
    description: "",
  },

  technologies: "",

  projects: {
    title: "",
    duration: "",
    description: "",
  },

  education: {
    institutionName: "",
    duration: "",
    degree: "",
  },
};

const initialState = {
  name: "Vova Zatonsky",
  contacts: ["Kyiv, Ukraine", "sneg@gmail.com"],
  technologies: [
    "Python(Flask/Django), JS/TS, React/Next, CSS3&HTML5, PHP5/7",
    "MySQL/PostgreSQL (RAW/SQLAlchemy/DjangoORM), Memcached, Redis, git ",
    "Data structure and algorithms, designing, engineering best practice ",
  ],
  experience: [
    {
      title: "Full-stack Software Engineer",
      location: "Freelance, remote",
      duration: "Aug 2022 – May 2023",
      description:
        "Task solver E-Commerce web application. It’s about freelance platform, there are people who can create tasks and other accept it. The app deep bonded to the Mapbox functionality. Work with geo related open source API. Direct and reverse geocoding, data parsing and saving, live filtering. Also create custom design and make css layout of it.Stack: Python/Django, PostgreSQL(Postgis)/DjangoORM, GeoDjango, JS, Fetch API, Mapbox API, geo APIs.",
    },
  ],
  projects: [
    {
      title: "Messenger",
      duration: "Dec 2020 – present",
      description:
        "The goal is to train some field new to me personally such as WebSocket/Socket.IO, aiohttp and async paradigm.",
    },
  ],
  education: [
    {
      institutionName: "KemSU",
      duration: "2008-2015",
      degree: "Master’s degree in Law",
    },
  ],
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
     updateFieldValue: (state, action) => {
      const { field, value } = action.payload;
      const fieldPath = field.split(".");
      let currentState = state;

      for (let i = 0; i < fieldPath.length - 1; i++) {
        currentState = currentState[fieldPath[i]];
      }

      currentState[fieldPath[fieldPath.length - 1]] = value;
    },
    addEntry: (state, action) => {
      const field = action.payload;
      state[field][state[field].length] = templates[field];
    },
    removeEntry: (state, action) => {
      const { field, key } = action.payload;
      console.log(action.payload);
      state[field].splice(key, 1);
    },
  },
});

export default documentSlice.reducer;
export const { updateFieldValue, addEntry, removeEntry } =
  documentSlice.actions;
