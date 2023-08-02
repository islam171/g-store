import './App.css';
import './app.scss';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Layout from './app/components/Layout/Layout'
import Home from './app/pages/Home/Home'
import SingUp from "./app/pages/auth/SignUp";
import PostPage from "./app/pages/PostPage/PostPage";
import SingIn from "./app/pages/auth/SignIn";
import Profile from "./app/pages/Profile/Profile";
import Cart from "./app/pages/cart/Cart";
import Catalog from "./app/pages/Catalog/Catalog"
import MyProduct from "./app/pages/MyProduct/MyProduct"
import EditPost from "./app/pages/EditPost/EditPost";
import Favorite from "./app/pages/Favorite/Favorite";
import Contact from "./app/pages/Contact/Contact";
import About from "./app/pages/Contact/About";
import {fetchProducts} from "./services/Product";
import {setAllCategories} from "./services/Category";

function App() {
    const dispatch = useDispatch()
    const {categoryId, sort, orderBy, searchText} = useSelector(({filters}) => filters)

    useEffect(() => {
        fetchProducts(categoryId, sort, orderBy, searchText, dispatch)
    }, [categoryId, sort, orderBy, searchText])
    useEffect(() => {
        setAllCategories(dispatch)
    }, [])

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="signUp" element={<SingUp/>}/>
            <Route path="signIn" element={<SingIn/>}/>
            <Route path="post/:id" element={<PostPage/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="Catalog" element={<Catalog/>}/>
            <Route path="myProduct" element={<MyProduct/>} errorElement={<div>hello</div>}/>
            <Route path="EditPost/:id" element={<EditPost/>}/>
            <Route path="favorite" element={<Favorite/>}/>
            <Route path="contact" element={<Contact/>}/>
            <Route path="about" element={<About/>}/>
        </Route>
    ))

    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App
