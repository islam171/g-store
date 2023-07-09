const defaultState = {
    items: {},
    totalCount: 0
}

const cart = (state = defaultState, action) => {
    switch (action.type){
        case "GET_CART":
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: [action.payload]
                },
                totalCount: Object.values(state.items).reduce(
                    (accumulator, currentItem) => accumulator + currentItem.length, 1)
            };

        case "SET_CART":
            const itemCount = Object.values(state.items).reduce(
                (accumulator, currentItem) => accumulator + currentItem.length, 1)
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: !state.items[action.payload.id]
                        ? [action.payload]
                        : [...state.items[action.payload.id], action.payload]
                },
                totalCount: itemCount
            };
        case "CLEAR_CART":
            return {
                ...state,
                items: {},
                totalCount: 0
            };
        case "REMOVE_CART_ITEM":
            const newItems = {
                ...state.items
            }
            delete newItems[action.payload]
            return {
                ...state,
                items: newItems,
                totalCount: Object.values(newItems).reduce(
                    (accumulator, currentItem) => accumulator + currentItem.length, 0)
            };
        case "DELETE_ITEM":
            const oldItem = {...state.items}
            const newItem = oldItem[action.payload].length > 1 ? oldItem[action.payload].slice(1) : oldItem[action.payload]

            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload]: newItem
                },
                totalCount: Object.values(state.items).reduce(
                    (accumulator, currentItem) => accumulator + currentItem.length, 0) - 1
            };
        // case "SET_CART_LOADING":
        //     const buildItems = action.payload.reduce((sum, obj) => !sum[obj.productsId] ? obj : [...sum[obj.productsId], obj ])
        //     console.log(buildItems)
            // return {
            //     ...state,
            //     items: buildItems
            // };
        // buildItems[obj.productsId] = !buildItems[obj.productsId] ? obj : [...buildItems[obj.productsId], obj ]
        default:
            return state
    }
}

export default cart