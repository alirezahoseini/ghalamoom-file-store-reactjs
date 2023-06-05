import React, { useContext, useEffect, useState } from 'react'
import { TbX } from 'react-icons/tb';
import styles from './Notification.module.css'

// contexts
import { NotificationContext } from './NotificationProvider';

export default function Notification(props) {
    const notificationDispatch = useContext(NotificationContext)
    const [exit, setExit] = useState(false)
    const [width, setWidth] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const handelStartTimer = () => {
        const id = setInterval(() => {
            setWidth(prev => {
                if (prev < 100) {
                    return prev + 0.5
                }

                return prev
            })
        }, 20);

        setIntervalId(id)

    }

    const handlerPuseTimer = () => {
        clearInterval(intervalId)
    }

    const handelCloseNotification = () => {
        handelStartTimer()
        setExit(true)
        setTimeout(() => {
            // remove from state and dom 
            notificationDispatch({
                id: props.id,
                type: 'REMOVE_NOTE'
            })
        }, 400);
    }

    useEffect(() => {
        handelStartTimer()
    }, [])

    useEffect(() => {
        if (width === 100) {
            handelCloseNotification()
        }
    }, [width])
    return (
        <div className={`${styles.notificationItem} ${styles[props.status]} ${exit ? styles.exit : ''}`} onMouseEnter={handlerPuseTimer} onMouseLeave={handelStartTimer}>
            <div className={styles.bar} style={{ width: `${width}%` }} />
            <p> {props.message} </p>
            <button onClick={handelCloseNotification} type='button' className={styles.closeBtn}>
                <TbX/>
            </button>
        </div>
    )
}
