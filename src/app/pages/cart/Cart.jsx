import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {
    OnClearCart, OnAddProductToCart, OnDeleteProductToCart, OnRemoveCart
} from "../../../services/Cart"

const Cart = () => {
    const {items} = useSelector(({cart}) => cart)

    const carts = Object.keys(items).map(key => {
        return items[key]
    })

    const user = useSelector(({user}) => user)
    const dispatch = useDispatch()

    return (<>
        <div>
            <div className="cart">
                <h1>Корзина</h1>
                <div className="cart__content">
                    <button onClick={() => OnClearCart(user.token, dispatch)}>Очистить корзину</button>
                    <div className="cart__items">
                        {carts.map(cart =>
                            <div className="cart__item item-cart" key={cart.id}>
                                <img src="" alt=""/>
                                <div className="item-cart__content">
                                    <div className="item-cart__title">
                                        <Link to={`post/${cart}`}>{cart.product.title}</Link>
                                    </div>
                                    <div className="margin"></div>
                                    <div className="item-cart__price">{cart.product.price} тг</div>
                                    <div className="item-cart__counter">
                                        <button onClick={() => OnDeleteProductToCart(cart, user.token, dispatch)}>-
                                        </button>
                                        <span>{items[cart.product._id].count}</span>
                                        <button
                                            onClick={() => OnAddProductToCart(cart.product, user.token, dispatch)}>+
                                        </button>
                                    </div>
                                    <div className="item-cart__total">8270.00 руб</div>
                                </div>
                                <div className="cart__delete"
                                     onClick={() => OnRemoveCart(cart, user.token, dispatch)}></div>
                            </div>
                        )}
                    </div>
                    <div className="cart__buttom">
                        <div className="cart__promo"><input type="text" placeholder="Промо код"/>
                            <button
                                className="yellow button">Применить
                            </button>
                        </div>
                        <div className="cart__controls controls-cart">
                            <div className="controls-cart__price">
                                <div className="controls-cart__title">Итого:</div>
                                <div className="controls-cart__text">27400.00 руб</div>
                            </div>

                            <button className="button yellow">Оформить заказ</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Cart