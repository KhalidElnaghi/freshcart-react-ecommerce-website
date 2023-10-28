import { useState } from "react";
import { createContext } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider({ children }) {
  let [counter, setCounter] = useState(0);
  const increaseCounter = () => {
    setCounter(++counter);
  };
  const decreaseCounter = () => {
    setCounter(--counter);
  };
  return (
    <CounterContext.Provider
      value={{ counter, setCounter, increaseCounter, decreaseCounter }}
    >
      {children}
    </CounterContext.Provider>
  );
}
