import {useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setCart, setCartIsLoading} from "../../../store/actions/cart";
import {Link} from "react-router-dom";
import {setToken, setUser} from "../../../store/actions/user";


const SingIn = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const user = useSelector(({user}) => user)

    const saveState = (token) => {
        axios.get('http://localhost:90/api/v1/cart', {
            headers: {'Authorization': `${token}`}
        }).then((res) => {
            res.data.products && (
                res.data.products.map(item => {
                    dispatch(setCart({
                        'id': item.id,
                        'name': item.name,
                        'companyId': item.companyId,
                        'categoryId': item.categoryId,
                        'price': item.price,
                        'cartId': item.cartId
                    }))
                })
            )
        })
    }

    const loginHandler = async () => {
        await axios.post('http://localhost:90/api/v1/auth/SignIn', {
            "username": login, "password": password
        })
            .then(function (res) {
                const {token, ...userData} = res.data
                dispatch(setToken(token))
                dispatch(setUser(userData))
                saveState(token)
            })
            .catch(function (error) {
                console.error(error);
            });
    }

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
                            <button className="button yellow" onClick={loginHandler} type='button'>Войти</button>
                            <text className="form__links">
                                <Link href="">Восстановить пароль</Link>
                                <Link to="/SignUp">Зарегистрироватся</Link>
                            </text>
                        </div>
                    </form>
                ) : (<span>Вы авторизованы</span>)}

            </div>
        </div>
    </>
}

export default SingIn;