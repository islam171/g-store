import {Link} from 'react-router-dom'
import {useSelector} from "react-redux";
import LoginIcon from '@mui/icons-material/Login';
import Person2Icon from '@mui/icons-material/Person2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddchartIcon from '@mui/icons-material/Addchart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchInput from "../SearchInput/SearchInput";

const Header = () => {

    const user = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)

    return <>
        <header>
            <div className="__container">
                <div className="header-top">
                    <div className="header-top__burger">
                        <div className="burger"><span></span></div>
                    </div>
                    <div className="logo"><Link to="/">G-store</Link></div>
                    <div className="button yellow kotalog-button active">
                        <div className="burger"><span></span></div>
                        <Link to="/Catalog">
                            Каталог
                        </Link>
                        <div className="popup">
                            <div className="popup__body">
                                <div className="popup__content">
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    </div>
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa qui
                                            molestias
                                            numquam ut voluptates quaerat, sequi similique, accusamus quod esse
                                            ullam
                                            vero veritatis ducimus dignissimos fugiat atque nisi.</p>
                                    </div>
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    </div>
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    </div>
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    </div>
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    </div>
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    </div>
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    </div>
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    </div>
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    </div>
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    </div>
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    </div>
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    </div>
                                    <div className="popup__item">
                                        <img src="" alt=""/>
                                        <h3>Обои</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    {/*<div className="search">*/}
                    {/*    <input type="text" placeholder="Поиск"/>*/}
                    {/*    <button className="search__button">*/}
                    {/*        <SearchIcon/>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    <SearchInput/>
                    <nav>
                        <Link to="">
                            <FavoriteBorderIcon/>
                        </Link>
                        <Link to="">
                            <AddchartIcon/>
                        </Link>
                        {Object.keys(user.data).length === 0 ? (<>
                            <Link to="/SignUp">
                                <div className="button">
                                    <LoginIcon/>
                                    <span>SignUp</span>
                                </div>
                            </Link>
                            <Link to="/SignIn">
                                <div className="button">
                                    <LoginIcon/>
                                    <span>SignIn</span>
                                </div>
                            </Link>
                        </>) : (<>
                            <Link to={'/profile'}>
                                <div className="button profile">
                                    <span>{user.username}</span>
                                    <Person2Icon/>
                                </div>
                            </Link>
                            <Link to={'/cart'}>
                                <div className="button-cart">
                                    <div className="button button-cart__content">
                                        <ShoppingCartOutlinedIcon/>
                                        <span>Корзина</span>
                                    </div>
                                    <div className="button-cart__count yellow">{cart.totalCount}</div>
                                </div>
                            </Link>
                        </>)}


                    </nav>
                </div>
                <div className="header-bottom">
                    <nav>
                        <a href="">О нас</a>
                        <a href="">Оплата</a>
                        <a href="">Доставка</a>
                        <a href="">Контакты</a>
                    </nav>
                    <div className="header-bottom__contact">
                        <div className="language">
                            <button>RU</button>
                            <span className="arrow"></span>
                            <div className="widget">
                                <ul>
                                    <li>EN</li>
                                    <li>RU</li>
                                </ul>
                            </div>

                        </div>
                        <a href="">+7(800) 800-80-80</a>
                    </div>
                </div>

            </div>
        </header>
    </>
}

export default Header;