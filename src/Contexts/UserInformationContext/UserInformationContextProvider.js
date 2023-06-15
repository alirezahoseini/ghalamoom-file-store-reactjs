import React, { createContext, useEffect, useState, useContext } from 'react'
import { v4 } from "uuid"

/* User info example */
// {
//     isLoaded: null, ===> null = loading in progress ---- true = success ---- false = error 
//     userInfo: {
//         email: null,
//         name: null,
//         bio: null,
//         age: null,
//         avatar: {
//             bgColor: {
//                 id: null,
//                 color: null
//             },
//             avatar: {
//                 id: null,
//                 imag: null
//             }
//         },
//         id: null
//     }
// }
/* User info example */

// Contexts
import {NotificationContext} from "../Notifications/NotificationProvider"

// hooks
import useAxiosGet from '../../hooks/axios/useAxiosGet'

// links
import { apiLinks } from '../../data/links'

// utils
import { getCooki } from '../../utils/cookis'



// Created context
const UserInformationContext = createContext()

function UserInformationContextProvider(props) {
    const { axiosGetResult, axiosGetError, setAxiosGetUrl } = useAxiosGet();
    const [userInfoContext, setUserInfoContext] = useState({
        isLoaded: null,
        userInfo: {
            email: "",
            name: "",
            bio: "",
            age: "",
            avatar: {
                bgColor: {
                    id: 1,
                    color: "#fff"
                },
                avatar: {
                    id: 1,
                    imag: ""
                }
            },
            id: ""
        }
    });
    const notificationDispatch = useContext(NotificationContext);


    // send request to server
    useEffect(() => {
        const userId = getCooki('userid')
        setAxiosGetUrl(`${apiLinks.users}/${userId}`)
    }, [])

    // set user info from server to context
    useEffect(() => {
        if (axiosGetResult !== null) {
            const { password, ...userInfo } = axiosGetResult;
            setUserInfoContext({
                isLoaded: true,
                userInfo
            })
        }
        if (axiosGetError !== null) {
            setUserInfoContext({
                isLoaded: false,
                userInfo: {
                    isLoaded: null,
                    userInfo: {
                        email: "",
                        name: "",
                        bio: "",
                        age: "",
                        avatar: {
                            bgColor: {
                                id: 1,
                                color: "#fff"
                            },
                            avatar: {
                                id: 1,
                                imag: ""
                            }
                        },
                        id: ""
                    }
                }
            })
            notificationDispatch({
                type: 'ADD_NOTE',
                id: v4(),
                payload: {
                    message: 'اطلاعت حساب کاربری بارگزاری نشد',
                    status: 'error'
                }
            })
            console.log(axiosGetError)
        }
    }, [axiosGetError, axiosGetResult]);


    return (
        <UserInformationContext.Provider value={{ userInfoContext, setUserInfoContext }}>
            {props.children}
        </UserInformationContext.Provider>
    )
}


export default UserInformationContextProvider
export { UserInformationContext }