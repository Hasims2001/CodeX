

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
        case "OUTPUT":
            return {
                ...state,
                loading: false,
                error: "",
                clicked: "",
                output: payload
            }
        default:
            return state;
    }
}
export default reducer;