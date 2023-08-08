import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom"
import {getMe, signOut} from "../../../services/User";
import EditIcon from "@mui/icons-material/Edit";
import {useEffect, useState} from 'react'
import axios from "axios";
import {setUser} from "../../../store/actions/user";

const Profile = () => {

    const user = useSelector(({user}) => user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isEditName, setIsEditName] = useState(false)
    const [username, setUsername] = useState('')
    const editName = () => {
        if(isEditName){
            setIsEditName(false)
        }else{
            setIsEditName(true)
        }
    }

    useEffect(() => {
        const isAuth = async () => {
            const userdata = await getMe(user.token, navigate, dispatch)
            userdata && dispatch(setUser(userdata))
        }
        isAuth()

    }, [])

    const editNameHandler = async (name, token) => {
        try {

            const user = await axios.patch('http://localhost:90/api/v1/user', {
                username: name
            }, {headers: {'Authorization': `${token}`}})

        }catch (e){
            console.log(e)
        }
    }

    return <>
        <div className="profile">
            <img src={user.data.avatarURL} alt=""/>
            <div className={`profile__title ${isEditName ? 'edit' : ''}`}>
                <div className={'profile__input'}>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
                    <button onClick={() => editNameHandler(username, user.token)}>ok</button>
                </div>
                <h2>{user.data.username}</h2>
                <button onClick={() => editName()}><EditIcon/></button>
            </div>


            <Link to={"/myProduct"}>Мои Продукты</Link>
        </div>
        <button onClick={() => signOut(dispatch)} className="button">Выйти</button>
    </>
}

export default Profile