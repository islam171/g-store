const defaultState = {
    user: {},
}

const user = (state = defaultState, action) => {
    switch (action.type){
        case "AUTH":
            return {...state, user: action.payload}
        default:
            return state
    }
}

export default user