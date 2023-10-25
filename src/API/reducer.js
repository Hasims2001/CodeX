

function reducer(state, {type, payload}){
    switch(type){
        case "LOADING":
            return{
                ...state,
                loading: true,
                clicked: payload
            }
        case "ERROR":
            return{
                ...state,
                loading:false,
                error: payload
            }
        default:
            return state;
    }
}
export default reducer;