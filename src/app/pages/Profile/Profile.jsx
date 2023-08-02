import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom"
import {deleteUser} from "../../../store/actions/user";
import {clearCart} from "../../../store/actions/cart";

const Profile = () => {

    const user = useSelector(({user}) => user)
    const dispatch = useDispatch()

    const Userdelete = () => {
        dispatch(deleteUser())
        dispatch(clearCart())
    }

    return <>
        <div className="profile">
            <img src={user.data.avatarURL} alt=""/>
            <h2 className="profile__title">{user.data.username}</h2>
            <Link to={"/myProduct"}>Мои Продукты</Link>
        </div>
        <button onClick={Userdelete} className="button">Выйти</button>
    </>
}

export default Profile