export const initialState = {
    user: null
};

export const action_type = {
    SET_USER: "SET_USER",REMOVE_USER: "REMOVE_USER"
}
export const reducer = (state,action)=>{

    switch(action.type){
        case action_type.SET_USER :
            return{
                ...state,
                user: action.user
            }
        case action_type.REMOVE_USER : 
            return{ 
                user: null
            }
        default:
            return state

        } 

}