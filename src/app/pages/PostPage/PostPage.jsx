import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddchartIcon from "@mui/icons-material/Addchart";
import {useDispatch, useSelector} from "react-redux";
import Rating from "../../components/./Rating/Rating";
import {OnAddProductToCart, OnDeleteProductToCart} from "../../../services/Cart";
import {Link} from "react-router-dom";

const PostPage = () => {

    const [item, setItem] = useState({})
    const {id} = useParams()
    const dispatch = useDispatch();
    const user = useSelector(({user}) => user)

    useEffect(() => {

        async function load(setItem) {
            const product = await axios.get(`http://localhost:90/api/v1/product/${id}`)
            setItem(product.data)
        }
        load(setItem)
    }, [id])


    const cart = useSelector(({cart}) => cart)

    return <div className={'PostPage'}>
        <div className="navbar"></div>
        <div className="product">
            <img src="" alt=""/>
            <div className="product__content">
                <h2 className="product__title">{item.title}</h2>
                <div className="rating"></div>
                <Rating quan={3}/>
                <p>{item.desc}</p>
                <div className="product__availability">Наличие: <span>в наличии</span></div>
                <div className="price">{item.price} тг</div>
                <div className="product__control">
                    {user.token ? (
                        <>
                            <div className="cart-counter">
                                <button onClick={() => OnDeleteProductToCart(cart.items[id], user.token, dispatch)}>-</button>
                                <input type="text" placeholder={cart.items[id] ? cart.items[id].count : 0}/>
                                <button  onClick={() => OnAddProductToCart(cart.items[id].product, user.token, dispatch)}>+</button>
                            </div>
                            <button onClick={() => OnAddProductToCart(cart.items[id].product, user.token, dispatch)} className="yellow button">В корзину</button>
                        </>
                        ) : (<Link to="/SignIn"><button className="yellow button">В корзину</button></Link>)}

                    <button><span className="icon-2"><FavoriteBorderIcon/></span></button>
                    <button><span className="icon-2"><AddchartIcon/></span></button>
                </div>
                <button className="product__buy">Купить в 1 клик</button>
            </div>
        </div>
    </div>


}

export default PostPage