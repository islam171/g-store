import {useDispatch, useSelector} from "react-redux";
import MyPost from "../../components/Post/MyPost";
import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {signOut} from "../../../services/User";
import {addProduct, deleteProduct} from "../../../services/Product";
import {setProductsByCompany} from "../../../store/actions/products";

const MyProduct = () => {

    const [isLoaded, setIsLoaded] = useState(true)
    const [product, setProduct] = useState([])
    const user = useSelector(({user}) => user)
    const {categoryList} = useSelector(({filters}) => filters)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const [categoryId, setCategoryId] = useState(0)

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setIsLoaded(false)
                const items = await axios.get("http://localhost:90/api/v1/product/author", {headers: {"Authorization": user.token}})
                setProduct(items.data)
                setProductsByCompany(items.data)
                setIsLoaded(true)
            } catch (e) {
                if (e.response.status === 403) {
                    console.log(403)
                    signOut(dispatch)
                    navigate("SignIn")
                }
            }
        }
        loadProduct()

    }, [user])

    return <>

        <form action="" className="form">
            <div className="form__group">
                <label htmlFor="">Названия</label>
                <input type="text" name={"title"} value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="form__group">
                <label htmlFor="">Описание</label>
                <input type="text" name={"desc"} value={desc} onChange={(e) => setDesc(e.target.value)}/>
            </div>
            <div className="form__group">
                <label htmlFor="">Цена</label>
                <input type="number" name={"price"} value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div className="form__group">
                <label htmlFor="">Категория</label>
                {categoryList.map(category =>
                    <div className="form__radiogroup" key={category._id}>
                        <input type="radio" name={"category"} value={category._id} onChange={(e) => setCategoryId(e.target.value)} checked={categoryId === category._id}/>
                        <label htmlFor="">{category.name}</label>
                    </div>
                )}
            </div>

            <div className="form__group">
                <label htmlFor="">Изображения</label>
                <input type="file" name={"image"} value={image} onChange={(e) => setImage(e.target.value)}/>
            </div>
            <button onClick={() => addProduct(user.token, {title, desc, price, image, categoryId}, dispatch)} type='button'>create</button>
        </form>

        <div className="product">
            {isLoaded ? product.map((item) => <MyPost key={item._id} item={item} deleteProduct={() => deleteProduct(user.token, item._id,dispatch)}></MyPost>) : (
                <>Загрузка...</>
            )}
        </div>

    </>
}

export default MyProduct