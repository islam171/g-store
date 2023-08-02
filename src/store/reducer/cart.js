const defaultState = {
    items: {},
    totalCount: 0
}

const cart = (state = defaultState, action) => {
    switch (action.type){
        case "SET_CART":
            let newCar = {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.product._id]: action.payload
                }
            }
            const itemCount = Object.values(newCar.items).reduce(
                (accumulator, currentItem) => accumulator + currentItem.count, 0)

            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.product._id]: action.payload
                },
                totalCount: itemCount
            };

        case "ADD_CART":
            const newCart = !state.items[action.payload.product._id] ? {...action.payload, ["count"]:1} : {...state.items[action.payload.product._id], ["count"]: state.items[action.payload.product._id].count + 1}
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.product._id]: newCart
                },
                totalCount: state.totalCount + 1
            }

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
            delete newItems[action.payload.product._id]
            return {
                ...state,
                items: newItems,
                totalCount: Object.values(newItems).reduce(
                    (accumulator, currentItem) => accumulator + currentItem.length, 0)
            };
        case "DELETE_ITEM":

            // console.log(Object.values(state.items).reduce(
            //     (accumulator, currentItem) => accumulator + currentItem.count, 0))
            if(state.items[action.payload.product._id].count <= 1){
                const newItems = {
                    ...state.items
                }
                delete newItems[action.payload.product._id]
                return {
                    ...state,
                    items: newItems,
                    totalCount: Object.values(newItems).reduce(
                        (accumulator, currentItem) => accumulator + currentItem.length, 0)
                };
            }
            const newItem = {...state.items[action.payload.product._id], count: state.items[action.payload.product._id].count - 1}
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.product._id]: newItem
                },
                totalCount: state.totalCount - 1
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