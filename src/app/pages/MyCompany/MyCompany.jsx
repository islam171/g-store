import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import styles from "./MyCompany.module.scss"
import {
    createProductsByCompany, deleteProducts, setLoaded, setProductsByCompany, updateProducts
} from "../../../store/actions/products";
import {Link} from "react-router-dom";
import {getCart, setCart} from "../../../store/actions/cart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddchartIcon from "@mui/icons-material/Addchart";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Modal = ({product, close, func}) => {

    const [newName, setNewName] = useState(product.name)
    const [newCategoryId, setNewCategoryId] = useState(product.categoryId)
    const [newPrice, setNewPrice] = useState(Number(product.price))
    const {categoryList} = useSelector(({filters}) => filters)

    return (
        <div className={`${styles.modal} ${styles.active}`}>
        <button className={styles.close} onClick={() => close(false)}></button>
        <form action="">
            <div className="form-group">
                <label>Названия</label>
                <input type="text" onChange={(e) => setNewName(e.target.value)}
                       value={newName}/>
            </div>
            <div className="form-group">
                <label>Цена</label>
                <input type="text" onChange={(e) => setNewPrice(e.target.value)}
                       value={newPrice}/><br/>
            </div>
            <div onChange={(e) => setNewCategoryId(Number(e.target.value))}>
                {categoryList.map((category, index) => (<div key={index}>
                    <input type="radio" value={category.id} name='categories'/>
                    <label>{category.name}</label>
                </div>))}
            </div>
            <button onClick={(e) => func(e, newName, product.id, Number(newPrice), newCategoryId)}>Изменить</button>
        </form>
    </div>)
}
const MyCompany = () => {

    const [productName, setProductName] = useState('')
    const [categoryInput, setCategoryInput] = useState(0)
    const [price, setPrice] = useState(0)
    const [activeModalProduct, setActiveModalProduct] = useState(false)

    const [product1, setProduct1] = useState({})

    const OnClickUpdateProduct = (item) => {
        setProduct1(item)
        setActiveModalProduct(true)
    }

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
            (res.data.products) && (dispatch(setProductsByCompany([...res.data.products])))
        }).catch((error) => console.error(error))
        dispatch(setLoaded(false))
    }

    const createProduct = async (e, productName, categoryInput, price) => {
        e.preventDefault()
        console.log(categoryInput)
        return 0
        if (productName === '' || categoryInput === undefined || price === 0) {
            console.error('invalid data')
        } else {

            await axios.post('http://localhost:90/api/v1/product', {
                'name': productName, 'categoryId': categoryInput, 'price': price
            }, {
                headers: {'Authorization': `${user.token}`}
            }).catch((error) => {
                console.error(error)
            })
            await axios.get('http://localhost:90/api/v1/cart/user/products', {
                headers: {'Authorization': `${user.token}`}
            }).then((res) => {
                res.data.products && (res.data.products.map(item => {
                    dispatch(getCart({
                        'id': item.id,
                        'name': item.name,
                        'companyId': item.companyId,
                        'categoryId': item.categoryId,
                        'price': item.price,
                        'cartId': item.cartId
                    }))
                }))
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
    }

    const OnUpdateProduct = (e, name, id, price, categoryId) => {
        e.preventDefault()
        axios.post('http://localhost:90/api/v1/productup', {
            'id': id, 'name': name, 'categoryId': categoryId, 'price': price
        }, {
            headers: {'Authorization': `${user.token}`}
        }).then(() => dispatch(updateProducts({id, name, categoryId, price}))).catch((error) => {
            console.error(error)
        })
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
    useEffect(() => saveCompanyProducts(token), [])

    return <div>
        {activeModalProduct && <Modal product={product1} close={setActiveModalProduct}
                                      func={OnUpdateProduct}></Modal>}

        <h2>{company.name}</h2>
        <div className="profile__form">
            <form action="" className="form">
                <div className="form__group">
                    <label htmlFor="">Названия</label>
                    <input
                        type="text"
                        onChange={(e) => setProductName(e.target.value)}
                        value={productName}
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="">Цена</label>
                    <input
                        type="text"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        name='price'
                    />
                </div>
                <div>
                    <label htmlFor="">Категории</label>
                    {categoryList.map((category, index) => (
                        <div className="form__radiogroup" key={index}>
                            <input
                                type="radio"
                                value={category.id}
                                onChange={(e) => setCategoryInput(e.target.value)}
                                name='categories'
                            />
                            {categoryInput}
                            <label>{category.x}</label>
                        </div>
                    ))}
                </div>
                <div className="form__bottom">
                    <button className="button yellow" onClick={(e) => createProduct(e,productName, categoryInput, price)} type="button">Добавить продукт</button>
                </div>
            </form>
        </div>

        <div className="product">
            {products.map((item) => <>
                <div className="product__item" key={item.id}>
                    <div className="product__holder">
                        <div className="product__img"><img src="" alt="product"/></div>
                        <h2><Link to={`post/${item.id}`}>{item.name}</Link></h2>
                        <span className="price">{item.price} тг</span>
                    </div>
                    Категория: <span></span> <br/>
                    <div className="product__control">
                        <button onClick={(e) => OnDeleteProduct(e, item)}><span className="icon-2"><DeleteIcon/></span>
                        </button>
                        <button onClick={() => OnClickUpdateProduct(item)}><span className="icon-2"><EditIcon/></span>
                        </button>
                    </div>
                </div>
            </>)}
        </div>

        <div className={`${styles.modal} ${activeModal ? styles.active : ''}`}>
            <button className={styles.close} onClick={() => setActiveModal(false)}></button>
            <form action="">
                <input type="text" onChange={(e) => setCompanyName(e.target.value)} value={companyName}/>
                <button onClick={(e) => OnUpdateCompanyName(e, companyName, company.id)}>Изменить</button>
            </form>
        </div>


    </div>
}
export default MyCompany