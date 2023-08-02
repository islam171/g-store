import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {loginHandler} from "../../../services/User";


const SingIn = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const user = useSelector(({user}) => user)

    return <>
        <div className="profile">
            <h2 className="profile__title">Вход в кабинет покупателя</h2>
            <div className="profile__form">
                {user.token.length === 0 ? (
                    <form action="" className="form">
                        <div className="form__group">
                            <label htmlFor="">Телефон или Email</label>
                            <input type="text" name="login" onChange={(e) => setLogin(e.target.value)} value={login}/>
                        </div>
                        <div className="form__group">
                            <label htmlFor="">Пароль</label>
                            <input type="text" name='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                        </div>
                        <div className="form__bottom">
                            <button className="button yellow" onClick={() => loginHandler(login, password, dispatch)} type='button'>Войти</button>
                            <div className="form__links">
                                <Link to="">Восстановить пароль</Link>
                                <Link to="/SignUp">Зарегистрироватся</Link>
                            </div>
                        </div>
                    </form>
                ) : (<span>Вы авторизованы</span>)}

            </div>
        </div>
    </>
}

export default SingIn;