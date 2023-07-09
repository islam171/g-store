const defaultState = {
    items: [],
    productsByCompany: [],
    isLoaded: false
}

const products = (state = defaultState, action) => {
    switch (action.type){
        case "SET_PRODUCTS":
            return {...state, items: action.payload, isLoaded: true}
        case "SET_PRODUCTS_BY_COMPANY":
            return {...state, productsByCompany: action.payload, isLoaded: true}
        case "CREATE_PRODUCTS_BY_COMPANY":
            return {
                ...state,
                productsByCompany: state.productsByCompany ? [...state.productsByCompany, action.payload] : [action.payload],
                items: state.items ? [...state.items, action.payload] : [action.payload],
                isLoaded: true}
        case "SET_LOADED":
            return {...state, isLoaded: action.payload}
        case "UPDATE_PRODUCT":
            const newItem = [
                ...state.items
            ]
            for (let i in newItem){
                if(newItem[i]['id'] === action.payload.id){
                    newItem[i]['id'] = action.payload.id
                    newItem[i]['name'] = action.payload.name
                    newItem[i]['categoryId'] = action.payload.categoryId
                    newItem[i]['price'] = action.payload.price
                }
            }

            // newItem.map((item) => {
            //     if(item['id'] === action.payload.id) {
            //         item['id'] = action.payload.id
            //         item['name'] = action.payload.name
            //         item['categoryId'] = action.payload.categoryId
            //         item['price'] = action.payload.price
            //     }
            // })

            return {
                ...state,
                items: newItem
            }


        case "REMOVE_PRODUCT":
            const newItems = [
                ...state.items
            ]
            const newItemsCom= [
                ...state.productsByCompany
            ]
            delete newItems[action.payload]
            delete newItemsCom[action.payload]
            //
            // console.log(
            //     {
            //         items: state.items.filter(item => item.id !== action.payload.id),
            //         productsByCompany: state.productsByCompany.filter(item => item !== action.payload),
            //     }
            // )

            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
                productsByCompany: state.productsByCompany.filter(item => item !== action.payload),
            };
        default:
            return state
    }
}

export default products