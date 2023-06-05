import React, { useReducer, createContext } from "react";
import { v4 } from 'uuid'
import styles from './Notification.module.css'
import Notification from "./Notification";

/*-------------------- How use it ------------------*/

//-------- Add notification with dispatch
// notificationDispatch({
//   type: 'ADD_NOTE',
//   id: v4(),
//   payload: {
//     message: 'youre message',
//     status: 'success'
//   }
// })

//-------- Remove notification with dispatch
// notificationDispatch({
//   id: props.id,
//   type: 'REMOVE_NOTE'
// })

export const NotificationContext = createContext();
 

export default function NotificationProvider(props) {
  const initState = [];
  const [state, notificationDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_NOTE':
        action.payload.id = v4()
        return [...state, action.payload];
      case 'REMOVE_NOTE':
        return state.filter(note => note.id !== action.id);
      default:
        return state
    }
  }, initState)


  return (
    <NotificationContext.Provider value={notificationDispatch}>
      <div className={styles.notificationsWrapper}>
        {state.map((note => <Notification key={note.id} {...note} />))}
      </div>
      {props.children}
    </NotificationContext.Provider>
  )
}
