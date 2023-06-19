import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const SingUp = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(({user}) => user.user)

    const registerHandler = () => {
        axios.post('http://localhost:90/api/v1/SignUp', {
            "username": login, "password": password, "isSalesman": 0
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }


    return <>
        <div className="profile">
            <h2 className="profile__title">Регестрация</h2>
            <div className="profile__form">
                {Object.keys(user).length === 0 ? (
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
                        <div className="form__bottom">
                            <button className="button yellow" onClick={registerHandler} type='button'>Войти</button>
                            <text className="form__links">
                                <Link to="">Восстановить пароль</Link>
                                <Link to="/SignIn">Уже есть аккаунт</Link>
                            </text>
                        </div>
                    </form>
                ) : (<span>Вы авторизованы</span>)}
            </div>
        </div>
    </>
}

export default SingUp;