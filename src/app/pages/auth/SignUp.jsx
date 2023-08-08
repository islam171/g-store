import {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {registerHandler} from "../../../services/User";

const SingUp = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const user = useSelector(({user}) => user)

    return <>
        <div className="profile">
            <h2 className="profile__title">Регестрация</h2>
            <div className="profile__form">
                {Object.keys(user.data).length === 0 ? (
                    <form action="" className="form">
                        <div className="form__group">
                            <label htmlFor="">Телефон или Email</label>
                            <input type="text" name="login" onChange={(e) => setLogin(e.target.value)} value={login}/>
                        </div>
                        <div className="form__group">
                            <label htmlFor="">Пароль</label>
                            <input type="text" name='password' onChange={(e) => setPassword(e.target.value)}
                                   value={password}/>
                        </div>
                        <div className="form__group">
                            <label htmlFor="">Пароль</label>
                            <input type="file" name='password' onChange={(e) => setImage(e.target.value)}
                                   value={image}/>
                        </div>
                        <div className="form__bottom">
                            <button className="button yellow" onClick={() => registerHandler(login, password, image)} type='button'>Войти</button>
                            <div className="form__links">
                                <Link to="">Восстановить пароль</Link>
                                <Link to="/SignIn">Уже есть аккаунт</Link>
                            </div>
                        </div>
                    </form>
                ) : (<span>Вы авторизованы</span>)}
            </div>
        </div>
    </>
}

export default SingUp;