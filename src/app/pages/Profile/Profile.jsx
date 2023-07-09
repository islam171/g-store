import {useSelector} from "react-redux";

const Profile = () => {

    const user = useSelector(({user}) => user.data)

    return <>
        <div className="profile">
            <img src={user.avatarURL} alt=""/>
            <h2 className="profile__title">{user.username}</h2>
        </div>

    </>
}

export default Profile