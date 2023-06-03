import React, { createContext, useReducer } from "react";
import styles from './Notification.module.css'
import Notification from "./Notification";

export const NotificationContext = createContext()

export default function NotificationProvider(props) {
  const [state, despatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_NOTE':
        return [...state, action.payload];
      case 'REMOVE_NOTE':
        return state.filter(note => note.id !== action.id);
      default:
        return state
    }
  },
    []
  )

  // despatch({
  //   type: 'ADD_NOTE',
  //   id: v4(),
  //   payload: {
  //     message: 'youre message',
  //     status: 'success'
  //   }
  // })

  return (
    <NotificationContext.Provider value={despatch}>
      <div className={styles.notificationsWrapper}>
        {state.map((note => <Notification despatch={despatch} key={note.id} {...note} />))}
      </div>
      {props.children}
    </NotificationContext.Provider>
  )
}
