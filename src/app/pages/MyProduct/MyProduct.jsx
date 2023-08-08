import {useDispatch, useSelector} from "react-redux";
import MyPost from "../../components/Post/MyPost";
import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {signOut} from "../../../services/User";
import {addProduct} from "../../../services/Product";

const MyProduct = () => {

    const [isLoaded, setIsLoaded] = useState(true)
    const [product, setProduct] = useState([])
    const user = useSelector(({user}) => user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

            const loadProduct = async () => {
                try {
                    setIsLoaded(false)
                    const items = await axios.get("http://localhost:90/api/v1/product/author", {headers: {"Authorization": user.token}})
                    setProduct(items.data)
                    setIsLoaded(true)
                }catch (e) {
                    if(e.response.status === 403){
                        console.log(403)
                        signOut(dispatch)
                        navigate("SignIn")
                    }
                }
            }
            loadProduct()

    }, [user])

    return <>

        <form action="">
            <input type="text"/>
            <button onClick={() => addProduct(user.token, {},dispatch)} type='button'>create</button>
        </form>

        <div className="product">
            {isLoaded ? product.map((item) => <MyPost key={item._id} item={item}></MyPost>) : (
                <>Загрузка...</>
            )}
        </div>
    </>
}

export default MyProduct