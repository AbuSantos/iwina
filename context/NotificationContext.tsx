"use client"
import React, { createContext, useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext(null)
export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
    const showNotification = (message) => {
        toast(message)
    }
    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={9000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                stacked
            />
        </NotificationContext.Provider>
    );
}

// const Notification = () => {
//     return (
//         <ToastContainer
//             position="top-right"
//             autoClose={9000}
//             hideProgressBar={true}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="dark"
//             stacked
//         />
//     )
// }

// export const showNotification = (message) => {
//     toast.success(message)
// }

// export default Notification;
