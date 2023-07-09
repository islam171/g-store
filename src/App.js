import './App.css';
import './app.scss';
import {Routes, Route} from 'react-router-dom';
import Home from './app/pages/Home/Home'
import SingUp from "./app/pages/auth/Register";
import Layout from './app/components/Layout/Layout'
import PostPage from "./app/pages/PostPage/PostPage";
import SingIn from "./app/pages/auth/SignIn";
import Profile from "./app/pages/Profile/Profile";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setAllCategory} from "./store/actions/filters";
import {setLoaded, setProducts} from "./store/actions/products";
import Cart from "./app/pages/cart/Cart";
import Catalog from "./app/pages/Catalog/Catalog"

function App() {
    const dispatch = useDispatch()
    const {categoryId, sort, orderBy, searchText} = useSelector(({filters}) => filters)

    // const saveCompanyProducts = (token) => {
    //     dispatch(setLoaded(false))
    //     axios.get(`http://localhost:90/api/v1/product/author`, {
    //         headers: {'Authorization': `${token}`}
    //     }).then((res) => {
    //         dispatch(setProductsByCompany([...res.data.products]))
    //     }).catch((error) => {
    //         dispatch({type: 'SET_PRODUCTS_BY_COMPANY'})
    //     })
    // }

    useEffect(() => {
        fetchProducts()
    }, [categoryId, sort, orderBy, searchText])
    useEffect(() => {
        setCategories()
    }, [])

    const setCategories = () => {
        axios.get('http://localhost:90/api/v1/category')
            .then((res) => {
                dispatch(setAllCategory([...res.data.category]))
            }).catch((error) => {
            console.error(error)
        })
    }

    const fetchProducts = () => {
        dispatch(setLoaded(false))
        axios.get(`http://localhost:90/api/v1/product?${categoryId !== null ? `_category=${categoryId}` : '_category='}&_sort=${sort}&_order=${orderBy}&_search=${searchText}`)
            .then(res => {
                dispatch(setProducts([...res.data]))
            }).catch((error) => {
            console.error(error)
        })
    }

    return (<div className="App">
        <Layout>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/signUp"} element={<SingUp/>}/>
                <Route path={"/signIn"} element={<SingIn/>}/>
                <Route path={"/post/:id"} element={<PostPage/>}/>
                <Route path={"/profile"} element={<Profile/>}/>
                <Route path={"/cart"} element={<Cart/>}/>
                <Route path={"/catalog"} element={<Catalog/>}/>
            </Routes>
        </Layout>
    </div>);
}

export default App;
