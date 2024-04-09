"use client"
import React, { createContext, useContext, useReducer } from 'react'
import { Action } from './types'

// defining the initial state
const initialState = {
    data: null,
    loading: false,
    error: null
}

//lets define the reducr function
const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case "FETCH_TASKS":
            return { ...state, loading: true };
        case "FETCH_TASKS_SUCCESS":
            return { ...state, loading: false, data: action.payload, error: null };
        case "FETCH_TASKS_FAILURE":
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

//create the task context
const TaskContext = createContext<any>(null)

// Defining the task Provider
export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //fetch task
    const fetchTasks = async (method: string, endpoint: string, body?: any) => {
        try {
            dispatch({ type: "FETCH_TASKS" });
            const options: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body ? JSON.stringify(body) : undefined,
            }

            const res = await fetch(endpoint, options)
            if (res.ok) {
                const data = await res.json()
                dispatch({
                    type: 'FETCH_TASKS_SUCCESS', payload: data
                })
            } else {
                throw new Error('Failed to fetch tasks');
            }
        } catch (error) {
            dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
        }
    }

    return (
        <TaskContext.Provider value={{ state, fetchTasks }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTaskContext = () => useContext(TaskContext);
