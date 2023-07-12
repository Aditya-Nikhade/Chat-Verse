import React,{createContext,useContext,useReducer} from "react";

//to share something about multiple connected components
export const StateContext = createContext()

//any child component inside the .provider inherits the value without passing props down to it
export const StateProvider = ({reducer,initialState,children})=>(
        <StateContext.Provider value={useReducer(reducer,initialState)}>
            {children}
        </StateContext.Provider>
)
 
export const useStateValue = ()=> useContext(StateContext)