import {useDispatch, useSelector} from "react-redux";
import styles from "../../components/Post/Post.module.css";
import {Link} from "react-router-dom";
import {clearCart, removeCartItem, setCart, deleteCartItem} from "../../../store/actions/cart";
import axios from "axios";

const Cart = () => {
    const {items} = useSelector(({cart}) => cart)
    const products = Object.keys(items).map(key => {
        return items[key][0]
    })
    const dispatch = useDispatch()
    const user = useSelector(({user}) => user.user)
    const OnClearCart = () => {
        axios.delete(
            `http://localhost:90/api/v1/cart/clear`,
            {headers: {'Authorization': `${user.token}`}}
        ).catch((error) => console.error(error))
        dispatch(clearCart())
    }
    const OnAddProductToCart = (obj) => {
        axios.post(
            `http://localhost:90/api/v1/cart`,
            {"productId": obj.id},
            {headers: {'Authorization': `${user.token}`}}
        ).catch((error) => console.error(error))
        dispatch(setCart(obj))
    }
    const OnDeleteProductToCart = (product) => {
        axios.delete(
            `http://localhost:90/api/v1/cart/id?id=${product.cartId}`,
            {headers: {'Authorization': `${user.token}`}}
        ).catch((error) => console.error(error))
        dispatch(deleteCartItem(product.id))
    }
    const OnRemoveProductToCart = (product) => {
        axios.delete(
            `http://localhost:90/api/v1/cart/productsId?productsId=${product.id}`,
            {headers: {'Authorization': `${user.token}`}}
        ).catch((error) => console.error(error))
        dispatch(removeCartItem(product.id))
    }

    return (
        <>
            <button onClick={OnClearCart}>Очистить корзину</button>
            {products.map(
                product => (
                    <>
                        <div className={styles.games__item} key={product.id}>
                            <div className="product__holder">
                                <div className="product__img"><img src="" alt="product"/></div>
                                <h3><Link to={`post/${product.id}`}>{product.name}</Link></h3>
                                <span className="price">{product.price} тг</span>
                            </div>
                            <div className="product__control">
                                <button onClick={() => OnAddProductToCart(product)}>+</button>
                                <span>{items[product.id].length}</span>
                                <button onClick={() => OnDeleteProductToCart(product)}>-</button>
                                <button onClick={() => OnRemoveProductToCart(product)}>Удалить</button>
                            </div>
                        </div>
                    </>
                )
            )}
        </>
    )
}
export default Cart