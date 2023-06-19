import styles from "./Post.module.css";
import {Link} from 'react-router-dom'
import {setCart} from "../../../store/actions/cart";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import LoginIcon from '@mui/icons-material/Login';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddchartIcon from '@mui/icons-material/Addchart';
const Post = ({item}) => {

    // const [company, setCompany] = useState('')
    // const [category, setCategory] = useState('')
    //
    // const getCompany = async (id) => {
    //     await axios.get(`http://localhost:90/api/v1/company/id?companyId=${id}`)
    //         .then((res) => setCompany(res.data.products.name))
    //         .catch((error) => console.error(error))
    // }
    //
    // const getCategory = async (id) => {
    //     await axios.get(`http://localhost:90/api/v1/category/id?categoryId=${id}`)
    //         .then((res) => setCategory(res.data.category.name))
    //         .catch((error) => console.error(error))
    // }


    // item.companyId && getCompany(item.companyId)
    // item.categoryId && getCategory(item.categoryId)
    const user = useSelector(({user}) => user.user)
    const dispatch = useDispatch()
    const OnAddProductToCart = (obj) => {
        console.log(obj)
        axios.post(
            `http://localhost:90/api/v1/cart`,
            {"productId": obj.id},
            {headers: {'Authorization': `${user.token}`}}
        ).catch((error) => console.error(error))
        dispatch(setCart(obj))
    }
    return <>
        {/*<div className={styles.games__item} key={item.id}>*/}
        {/*    <h2><Link to={`post/${item.id}`}>{item.name}</Link></h2>*/}
        {/*    <p>{item.price} тг</p>*/}
        {/*    Компания: <span></span><br/>*/}
        {/*    Категория: <span></span>*/}
        {/*    <button onClick={() => OnAddProductToCart(item)}>Submit</button>*/}
        {/*</div>*/}
        <div className="product__item" key={item.id}>
            <div className="product__holder">
                <div className="product__img"><img src="" alt="product"/></div>
                <h3><Link to={`post/${item.id}`}>{item.name}</Link></h3>
                <span className="price">{item.price} тг</span>
            </div>
            <div className="product__control">
                <button onClick={() => OnAddProductToCart(item)} className="yellow button">В корзину</button>
                <button><span className="icon-2"><FavoriteBorderIcon/></span></button>
                <button><span className="icon-2"><AddchartIcon/></span></button>
            </div>
        </div>
    </>
}

export default Post