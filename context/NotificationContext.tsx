"use client"
import React, { createContext, useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext(null)
export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
    return (
        <NotificationContext.Provider value={toast}>
            {children}
        </NotificationContext.Provider>
    );
}