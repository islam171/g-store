import {Link} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';


const MyPost = ({item}) => {

    return <>
        <div className="product__item">
            <div className="product__holder">
                <div className="product__img"><img src="" alt="product"/></div>
                <h3><Link to={`/post/${item._id}`}>{item.title}</Link></h3>
                <span className="price">{item.price} тг</span>
            </div>
            <div className="product__control">
                <Link to={`/EditPost/${item._id}`}><span className="icon-2"><EditIcon/></span></Link>
            </div>
        </div>
    </>
}

export default MyPost