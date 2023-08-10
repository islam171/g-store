import {Link} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteProduct} from "../../../services/Product";


const MyPost = ({item, deleteProduct}) => {
    return <>
        <div className="product__item">
            <div className="product__holder">
                <div className="product__img"><img src="" alt="product"/></div>
                <h3><Link to={`/post/${item._id}`}>{item.title}</Link></h3>
                <span className="price">{item.price} тг</span>
            </div>
            <div className="product__control">
                <Link to={`/EditPost/${item._id}`}><span className="icon-2"><EditIcon/></span></Link>
                <span className="icon-2" onClick={deleteProduct}><DeleteIcon/></span>
            </div>
        </div>
    </>
}

export default MyPost