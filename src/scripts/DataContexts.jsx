/* eslint-disable react/prop-types */
import { onValue, ref as refDB } from "firebase/database";
import { createContext, useEffect, useState, useContext, useMemo } from "react";
import { db } from "./firebase";

export const MyListsContext = createContext();
export const MyRemindersContext = createContext();
export const MyUserUIDContext = createContext();

// Contexto de UID de usuario
export function UserUID({ children }) {
  const [userUID, setUserUID] = useState("");

  // Usar useMemo hook here becouse we are passing an object as value
  const value = useMemo(() => ({ userUID, setUserUID }), [userUID]);

  return (
    <MyUserUIDContext.Provider value={value}>
      {children}
    </MyUserUIDContext.Provider>
  );
}

// Contexto de Listas
export function ListsContext({ children }) {
  const [listsState, setListsState] = useState([]);
  const { userUID } = useContext(MyUserUIDContext);

  useEffect(() => {
    const cancelOnValue = onValue(
      refDB(db, `/listas/${userUID}`),
      function (snapshot) {
        if (snapshot.val()) {
          setListsState(Object.entries(snapshot.val()));
        } else {
          setListsState([]);
        }
      }
    );

    return cancelOnValue;
  }, [userUID]);

  return (
    <MyListsContext.Provider value={listsState}>
      {children}
    </MyListsContext.Provider>
  );
}

//  Contexto de Reminders
export function RemindersContext({ children }) {
  const [remindersState, setRemindersState] = useState([]);
  const { userUID } = useContext(MyUserUIDContext);

  useEffect(() => {
    const cancelOnValue = onValue(
      refDB(db, `/reminders/${userUID}`),
      function (snapshot) {
        if (snapshot.val()) {
          setRemindersState(Object.entries(snapshot.val()));
        } else {
          setRemindersState([]);
        }
      }
    );
    return cancelOnValue;
  }, [userUID]);

  return (
    <MyRemindersContext.Provider value={remindersState}>
      {children}
    </MyRemindersContext.Provider>
  );
}
