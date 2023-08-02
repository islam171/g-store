import {useParams} from "react-router-dom";
import  {useEffect, useState} from "react";
import {getProduct, updateProduct} from '../../../services/Product'
import {useSelector} from "react-redux";


const EditPost = () => {

    const [product, setProduct] = useState({})
    const {id} = useParams()
    const {categoryList} = useSelector(({filters}) => filters)
    const user = useSelector(({user}) => user)


    const [productTitle, setProductTitle] = useState('')
    const [productDesc, setProductDesc] = useState('')
    const [productPrice, setProductPrice] = useState(0)
    const [productImageUrl, setProductImageUrl] = useState('')
    const [newCategoryId, setNewCategoryId] = useState(product.categoryId)



    useEffect(() => {
        const loadProduct = async () => {
            const item = await getProduct(id)
            setProduct(item.data)
            setProductTitle(item.data.title)
            setProductDesc(item.data.desc)
            setProductPrice(item.data.price)
            setProductImageUrl(item.data.imageURL)
            setNewCategoryId(item.data.categoryId)
        }
        loadProduct()
    }, [id])

    return <div className="page">
        <form action="" className="form">
            <div className="form__group">
                <label htmlFor="">Имя продукта</label>
                <input
                    type="text" name="title" value={productTitle} onChange={(e) => setProductTitle(e.target.value)}/>
            </div>
            <div className="form__group">
                <label htmlFor="">Описания</label>
                <input type='text' name="desc" value={productDesc} onChange={(e) => setProductDesc(e.target.value)}/>
            </div>
            <div className="form__group">
                <label htmlFor="">Цена</label>
                <input type="text" name="price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)}/>
            </div>
             <div className="form__group">
                <label htmlFor="">Фото</label>
                 <input type="file" name="image" onChange={(e) => setProductImageUrl(e.target.value)}/>
            </div>
            <div>
                {categoryList.map((category, index) => (
                    <div key={index} onClick={() => setNewCategoryId(category._id)}>
                        <input type="radio" value={category._id} name='categories' defaultChecked={category._id === newCategoryId}/>
                        <label>{category.name}</label>
                    </div>
                ))}
            </div>
            <div className="form__bottom">
                <button
                    className="button yellow"
                    type='button'
                    onClick={() => updateProduct(id, {
                        title: productTitle,
                        desc: productDesc,
                        price: productPrice,
                        imageURL: productImageUrl,
                        categoryId: newCategoryId
                    }, user.token)}
                >Войти</button>
            </div>
        </form>

    </div>
}

export default EditPost