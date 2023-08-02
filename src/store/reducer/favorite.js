const defaultState = {
    items: []
}

const favorite = (state = defaultState, action) => {
    switch (action.type){
        case "SET_FAVORITE":
            // res: {product}
            return{
                ...state,
                items: action.payload
            }
    }
}