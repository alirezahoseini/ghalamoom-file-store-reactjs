import React, { createContext, useState } from 'react'

/* User info example */
// {
//     name: null,
//     email: null,
//     userId: null,
//     image: {
//         bgColor: '#a7e7e1',
//         avatar: {
//             id: 1,
//             image: '/images/avatars/Avatar-1.webp'
//         }
//     },
//     token: null
// }
/* User info example */


const UserInformationContext = createContext()

function UserInformationContextProvider(props) {
    const [userInfo, setUserInfo] = useState(
        {
            name: null,
            email: null,
            userId: null,
            image: {
                bgColor: '#a7e7e1',
                avatar: {
                    id: 1,
                    image: '/images/avatars/Avatar-1.webp'
                }
            },
            token: null
        }
    )
    return (
        <UserInformationContext.Provider value={{userInfo, setUserInfo}}>
            {props.children}
        </UserInformationContext.Provider>
    )
}


export default UserInformationContextProvider
export {UserInformationContext}