const defaultState = {
    categoryId: null,
    sort: 'id',
    orderBy: 'ASC',
    categoryList: [],
    searchText: ''
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
        case "SET_SEARCH":
            return {...state, searchText: action.payload}
        default:
            return state
    }
}

export default filters