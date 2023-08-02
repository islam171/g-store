export const setCart = (items) => (
    {
        type: 'SET_CART',
        payload: items
    }
)
export const addCart = (items) => (
    {
        type: 'ADD_CART',
        payload: items
    }
)

export const clearCart = () => (
    {
        type: 'CLEAR_CART'
    }
)

export const removeCartItem = (id) => (
    {
        type: 'REMOVE_CART_ITEM',
        payload: id
    }
)
export const deleteCartItem = (id) => (
    {
        type: 'DELETE_ITEM',
        payload: id
    }
)

export const setCartIsLoading = (items) => (
    {
        type: 'SET_CART_LOADING',
        payload: items
    }
)