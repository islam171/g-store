import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import styles from "./MyCompany.module.scss"
import postStyles from "./../../components/Post/Post.module.css"
import {setNameCompany} from "../../../store/actions/company";
import {
    createProductsByCompany,
    deleteProducts,
    setLoaded,
    setProductsByCompany
} from "../../../store/actions/products";
import {Link} from "react-router-dom";
import {getAllProducts} from "./../../../services/sevrices.js"
import {getCart, setCart} from "../../../store/actions/cart";

const Modal = ({product, close, func}) => {

    const [productName, setProductName] = useState('')
    const [categoryInput, setCategoryInput] = useState(0)
    const [price, setPrice] = useState(0)
    const {categoryList} = useSelector(({filters}) => filters)

    return (<div className={`${styles.modal} ${styles.active}`}>
        <button className={styles.close} onClick={() => close(false)}></button>
        <form action="">
            <div className="form-group">
                <label>Названия</label>
                <input type="text" onChange={(e) => setProductName(e.target.value)}
                       value={productName ? productName : product.name}/>
            </div>
            <div className="form-group">
                <label>Цена</label>
                <input type="text" onChange={(e) => setPrice(e.target.value)}
                       value={price}/><br/>
            </div>
            <div onChange={(e) => setCategoryInput(Number(e.target.value))}>
                {categoryList.map((category, index) => (<div key={index}>
                    <input type="radio" value={category.id} name='categories'/>
                    <label>{category.name}</label>
                </div>))}
            </div>
            <button onClick={(e) => func(e, productName, price, categoryInput)}>Изменить</button>
        </form>
    </div>)
}
const MyCompany = () => {

    const [productName, setProductName] = useState('')
    const [categoryInput, setCategoryInput] = useState(0)
    const [price, setPrice] = useState(0)
    const [activeModalProduct, setActiveModalProduct] = useState(false)

    // Modal window
    const [companyName, setCompanyName] = useState('')
    const [activeModal, setActiveModal] = useState(false)

    const company = useSelector(({companies}) => companies.company)
    const {categoryList} = useSelector(({filters}) => filters)
    const user = useSelector(({user}) => user.user)

    const products = useSelector(({products}) => products.productsByCompany)
    const dispatch = useDispatch()

    const saveCompanyProducts = (token) => {
        axios.get(`http://localhost:90/api/v1/product/author`, {
            headers: {'Authorization': `${token}`}
        }).then((res) => {
            (res.data.products) && (
                dispatch(setProductsByCompany([...res.data.products]))
            )
        }).catch((error) => console.error(error))
        dispatch(setLoaded(false))
    }

    const createProduct = async (e) => {
        e.preventDefault()
        if(productName === '' || categoryInput === 0 || price === 0){
            console.log('hello')
        }else{

            await axios.post('http://localhost:90/api/v1/product', {
                'name': productName,
                'categoryId': categoryInput,
                'price': price
            }, {
                headers: {'Authorization': `${user.token}`}
            }).catch((error) => {
                console.error(error)
            })
            await axios.get('http://localhost:90/api/v1/cart/user/products', {
                headers: {'Authorization': `${user.token}`}
            }).then((res) => {
                res.data.products && (
                    res.data.products.map(item => {
                        dispatch(getCart({
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
    }

    const OnUpdateCompanyName = (e, name, id) => {
        e.preventDefault()
        axios.post('http://localhost:90/api/v1/companyUp', {
            'id': id, 'name': name,
        }, {
            headers: {'Authorization': `${user.token}`}
        }).catch((error) => {
            console.error(error)
        })
        dispatch(setNameCompany(name))
    }

    const OnUpdateProduct = (e, name, id, price, categoryId) => {
        e.preventDefault()
        axios.post('http://localhost:90/api/v1/productup', {
            'id': id, 'name': name, 'categoryId': categoryId, 'price': price
        }, {
            headers: {'Authorization': `${user.token}`}
        }).catch((error) => {
            console.error(error)
        })
        console.log(user.token)
    }

    const OnDeleteProduct = (e, item) => {
        e.preventDefault()
        axios.delete(`http://localhost:90/api/v1/product/id?productId=${item.id}`, {
                     headers: {'Authorization': `${user.token}`}
                 }).catch((error) => {
                     console.error(error)
                 })
        dispatch(deleteProducts(item))
    }

    const {token} = useSelector(({user}) => user.user)
    useEffect(() => saveCompanyProducts(token),[])


    return <>
        {company.name}
        {/*<input type="text" onChange={(e) => setCompanyName(e.target.value)} value={companyName}/>*/}
        <button onClick={() => setActiveModal(true)}>Редактирование</button>
        <form action="">
            <label>Названия</label> <input type="text" onChange={(e) => setProductName(e.target.value)}
                                           value={productName}/><br/>
            <div onChange={(e) => setCategoryInput(Number(e.target.value))}>
                {categoryList.map((category, index) => (<div key={index}>
                    <input type="radio" value={category.id} name='categories'/>
                    <label>{category.name}</label>
                </div>))}
            </div>
            <label>Цена</label> <input type="text" onChange={(e) => setPrice(e.target.value)} value={price}/><br/>
            <button onClick={createProduct}>Добавить продукт</button>
        </form>

        <div className={postStyles.games}>
            {products.map((item) => <>
                    <div className={postStyles.games__item} key={item.id}>
                        <h2><Link to={`post/${item.id}`}>{item.name}</Link></h2>
                        <p>{item.price} тг</p>
                        Компания: <span></span><br/>
                        Категория: <span></span> <br/>
                        <button onClick={(e) => OnDeleteProduct(e, item)}>delete</button>
                        <button onClick={() => setActiveModalProduct(true)}>update</button>
                        {activeModalProduct && <Modal product={item} close={setActiveModalProduct}
                                                      func={(e, name, price, categoryId) => {
                                                      OnUpdateProduct(e, name, item.id, price, categoryId)}}></Modal>}
                    </div>
                </>
            )}
        </div>

        <div className={`${styles.modal} ${activeModal ? styles.active : ''}`}>
            <button className={styles.close} onClick={() => setActiveModal(false)}></button>
            <form action="">
                <input type="text" onChange={(e) => setCompanyName(e.target.value)} value={companyName}/>
                <button onClick={(e) => OnUpdateCompanyName(e, companyName, company.id)}>Изменить</button>
            </form>
        </div>


    </>
}
export default MyCompany