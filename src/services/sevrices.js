import axios from "axios";
import {setCart} from "../store/actions/cart";


export const getAllProducts = (token) => {
    axios.get('http://localhost:90/api/v1/cart/user/products', {
        headers: {'Authorization': `${token}`}
    }).then((res) => {
        return res.data.products
    })
}