const defaultState = {
    company: {},
}

const companies = (state = defaultState, action) => {
    switch (action.type){
        case "COMPANY":
            return {...state, company: action.payload}
        case "SET_NAME_COMPANY":
            return {...state, company: {
                    'id': state.company.id,
                    'name': action.payload,
                    'OwnerId': state.company.OwnerId
                }}
        default:
            return state
    }
}

export default  companies