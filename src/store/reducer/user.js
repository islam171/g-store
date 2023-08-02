const defaultState = {
    token: '',
    data: {},
    products: [],
    isLoaded: false
}

const user = (state = defaultState, action) => {
    switch (action.type){
        case "SET_TOKEN":
            return {...state, token: action.payload}
        case "SET_USER":
            return {...state, data: action.payload}
        case "DELETE_USER":
            return {
                token: '',
                data: {},
                products: [],
                isLoaded: false
            }
        default:
            return state
    }
}

export default user