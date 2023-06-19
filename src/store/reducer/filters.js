const defaultState = {
    categoryId: null,
    sort: 'id',
    orderBy: 'ASC',
    categoryList: []
}

const filters = (state = defaultState, action) => {
    switch (action.type){
        case "SET_CATEGORY":
            return {...state, categoryId: action.payload}
        case "SET_ALL_CATEGORY":
            return {...state, categoryList: action.payload}
        case "SET_SORT":
            return {...state, sort: action.payload}
        case "SET_ORDER_BY":
            return {...state, orderBy: action.payload}
        default:
            return state
    }
}

export default filters