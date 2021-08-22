import { createContext, StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./App";
import { reportWebVitals } from "./reportWebVitals";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "./index.css";

firebase.initializeApp({
  apiKey: "AIzaSyDMYMco0T1svPt2rkG-YtIHQ_sAHDJag2g",
  authDomain: "senior13j-telegram-chat.firebaseapp.com",
  projectId: "senior13j-telegram-chat",
  storageBucket: "senior13j-telegram-chat.appspot.com",
  messagingSenderId: "22626736218",
  appId: "1:22626736218:web:737cb8223f0641c0a62063",
  measurementId: "G-CRD0EB6FGQ",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export const Context = createContext(null);

render(
  <StrictMode>
    <Context.Provider
      value={{
        auth,
        firestore,
      }}
    >
      <App />
    </Context.Provider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
