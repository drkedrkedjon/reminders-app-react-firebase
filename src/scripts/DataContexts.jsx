/* eslint-disable react/prop-types */
import { onValue, ref as refDB } from "firebase/database";
import { createContext, useEffect, useState, useContext, useMemo } from "react";
import { db } from "./firebase";

export const MyListsContext = createContext();
export const MyRemindersContext = createContext();
export const MyUserUIDContext = createContext();
export const HomeDisplayTypeContext = createContext();
export const MyColorUIContext = createContext();

// Contexto de Dark Mode
export function MyColorUI({ children }) {
  const [colorUI, setColorUI] = useState("dark");

  const value = useMemo(() => ({ colorUI, setColorUI }), [colorUI]);
  return (
    <MyColorUIContext.Provider value={value}>
      {children}
    </MyColorUIContext.Provider>
  );
}

//  Contexto de Home display type
export function MyHomeDisplayTypeContext({ children }) {
  // lists, reminders, flagged, today, next3days
  const [homeType, setHomeType] = useState("lists");
  const value = useMemo(() => ({ homeType, setHomeType }), [homeType]);
  return (
    <HomeDisplayTypeContext.Provider value={value}>
      {children}
    </HomeDisplayTypeContext.Provider>
  );
}

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
