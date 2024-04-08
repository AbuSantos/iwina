import React, { createContext, useContext, useReducer } from 'react'


// defining the initial state
const initialState = {
    data: null,
    loading: false,
    error: null
}

// defining the action types
type ActionType = "FETCH_TASKS" | "FETCH_TASKS_SUCCESS" | "FETCH_TASKS_FAILURE"

//define the reducer interface
interface Action {
    type: ActionType,
    payload?: any
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
    }
}