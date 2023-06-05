/* eslint-disable react/prop-types */
import { onValue } from "firebase/database";
import { createContext, useEffect, useState } from "react";
import { listsEnDB, remindersEnDB } from "./firebase";

export const MyListsContext = createContext();
export const MyRemindersContext = createContext();

// Contexto de Listas
export function ListsContext({ children }) {
  const [listsState, setListsState] = useState([]);

  useEffect(() => {
    const cancelOnValue = onValue(listsEnDB, function (snapshot) {
      if (snapshot.val()) {
        setListsState(Object.entries(snapshot.val()));
      } else {
        setListsState([]);
      }
    });

    return cancelOnValue;
  }, []);

  return (
    <MyListsContext.Provider value={listsState}>
      {children}
    </MyListsContext.Provider>
  );
}

//  Contexto de Reminders
export function RemindersContext({ children }) {
  const [remindersState, setRemindersState] = useState([]);

  useEffect(() => {
    const cancelOnValue = onValue(remindersEnDB, function (snapshot) {
      if (snapshot.val()) {
        setRemindersState(Object.entries(snapshot.val()));
      } else {
        setRemindersState([]);
      }
    });
    return cancelOnValue;
  }, []);

  return (
    <MyRemindersContext.Provider value={remindersState}>
      {children}
    </MyRemindersContext.Provider>
  );
}
