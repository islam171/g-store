import axios from "axios";
import {addCart, clearCart, deleteCartItem, removeCartItem} from "../store/actions/cart";

export const OnClearCart = (token, dispatch) => {
    axios.delete(
        `http://localhost:90/api/v1/cart/clear`,
        {headers: {'Authorization': `${token}`}}
    ).catch((error) => console.error(error))
    dispatch(clearCart())
}
export const OnAddProductToCart = async (item, token, dispatch, navigate) => {
    try {
        const cart = await axios.post(
            `http://localhost:90/api/v1/cart`,
            {"productId": item._id},
            {headers: {'Authorization': `${token}`}}
        )
        const newCart = {id: cart.data._id, product: cart.data.productId}
        dispatch(addCart(newCart))
    }catch (e) {
        navigate("/SignIn")
        console.error(e)
    }

}
export const OnDeleteProductToCart = (item, token, dispatch) => {
    axios.patch(
        `http://localhost:90/api/v1/cart/${item.product._id}`,
        {},
        {headers: {'Authorization': `${token}`}}
    ).catch((error) => console.error(error))
    dispatch(deleteCartItem(item))
}
export const OnRemoveCart = (item, token, dispatch) => {
    axios.delete(
        `http://localhost:90/api/v1/cart/${item.product._id}`,
        {headers: {'Authorization': `${token}`}}
    ).catch((error) => console.error(error))
    dispatch(removeCartItem(item.id))
}