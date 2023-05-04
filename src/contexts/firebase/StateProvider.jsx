import React, { createContext, useContext, useReducer } from 'react';

function StateProvider({ reducer, initialState, children }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)} >
        {children}
    </StateContext.Provider>
  )
}

export default StateProvider;

export const StateContext = createContext();
export const useStateValue = () => useContext(StateContext);
