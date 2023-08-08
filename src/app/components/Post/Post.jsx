import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddchartIcon from '@mui/icons-material/Addchart';
import {OnAddProductToCart} from "../../../services/Cart";

import {ErrorBoundary} from "react-error-boundaries";


const Post = ({item}) => {
    const navigate = useNavigate();
    const user = useSelector(({user}) => user)
    const dispatch = useDispatch()

    return (
        <div className="product__item">
            <div className="product__holder">
                <div className="product__img"><img src="" alt="product"/></div>
                <h3><Link to={`/post/${item._id}`}>{item.title}</Link></h3>
                <span className="price">{item.price} тг</span>
            </div>
                <div className="product__control">
                    <button onClick={() => OnAddProductToCart(item, user.token, dispatch, navigate)} className="yellow button">В
                        корзину
                    </button>
                    <button><span className="icon-2"><FavoriteBorderIcon/></span></button>
                    <button><span className="icon-2"><AddchartIcon/></span></button>
                </div>
        </div>
    )
}

export default Post