import {useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setCompany} from "../../../store/actions/company";
import {setCart, setCartIsLoading} from "../../../store/actions/cart";
import {setLoaded, setProductsByCompany} from "../../../store/actions/products";
import {Link} from "react-router-dom";


const SingIn = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const user = useSelector(({user}) => user.user)

    const saveState = (data, token) => {
        dispatch({type: 'AUTH', payload: {...data.user, 'token': token}})

        axios.get('http://localhost:90/api/v1/companyByUser', {
            headers: {'Authorization': `${token}`}
        }).then((res) => {
            dispatch(setCompany({...res.data.company}))
        }).catch((error) => {
            dispatch({type: 'COMPANY'})
        })

        axios.get('http://localhost:90/api/v1/cart/user/products', {
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

    const Auth = (data) => {
        axios.get('http://localhost:90/api/v1/profile', {
            headers: {
                'Authorization': `${data.token}`
            }
        }).then((res) => {
            saveState(res.data, data.token)
        }).catch((error) => {
            console.error(error)
        })
    }

    const loginHandler = async () => {
        await axios.post('http://localhost:90/api/v1/SignIn', {
            "username": login, "password": password
        })
            .then(function (response) {
                Auth(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }


    return <>
        <div className="profile">
            <h2 className="profile__title">Вход в кабинет покупателя</h2>
            <div className="profile__form">
                {Object.keys(user).length === 0 ? (
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