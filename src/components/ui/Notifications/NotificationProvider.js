import React, { createContext, useReducer } from "react";
import styles from './Notification.module.css'
import Notification from "./Notification";

export const NotificationContext = createContext()

export default function NotificationProvider(props) {
  const [state, notificationDispatch] = useReducer((state, action) => {
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

  // notificationDispatch({
  //   type: 'ADD_NOTE',
  //   id: v4(),
  //   payload: {
  //     message: 'youre message',
  //     status: 'success'
  //   }
  // })

  return (
    <NotificationContext.Provider value={notificationDispatch}>
      <div className={styles.notificationsWrapper}>
        {state.map((note => <Notification key={note.id} {...note} />))}
      </div>
      {props.children}
    </NotificationContext.Provider>
  )
}
