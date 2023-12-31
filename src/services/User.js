import axios from "axios";
import {deleteUser, setToken, setUser} from "../store/actions/user";
import {clearCart, setCart} from "../store/actions/cart";
import {clearMyProducts, deleteMyProducts} from "../store/actions/products";

export const registerHandler = (login, password, image) => {
    axios.post('http://localhost:90/api/v1/auth/SignUp', {
        "username": login, "password": password, "imageURL": image
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
}

const saveState = (token, dispatch) => {
    axios.get('http://localhost:90/api/v1/cart', {
        headers: {'Authorization': `${token}`}
    }).then((res) => {
        res.data && (
            res.data.map(item => {
                dispatch(setCart({
                    'id': item._id,
                    'product': item.productId,
                    'count': item.count
                }))
            })
        )
    }).catch((error) => console.error(error))
}


export const loginHandler = async (login, password, dispatch) => {
    await axios.post('http://localhost:90/api/v1/auth/SignIn', {
        "username": login, "password": password
    })
        .then(function (res) {
            const {token, ...userData} = res.data
            dispatch(setToken(token))
            dispatch(setUser(userData))
            saveState(token, dispatch)
        })
        .catch(function (error) {
            console.error(error);
        });
}

export const signOut = async (dispatch) => {
    dispatch(deleteUser())
    dispatch(clearCart())
    dispatch(clearMyProducts())
}

export const getMe =  (token, navigate, dispatch) => {
    const user = axios.get('http://localhost:90/api/v1/auth/me', {headers: {'Authorization': `${token}`}})
        .then(res => {return res.data})
        .catch((e) => {
            if(e.response.status === 403){
                signOut(dispatch)
                navigate("/SignIn")
            }
        })
    return user
}