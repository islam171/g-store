import {useSelector} from "react-redux";
import MyPost from "../../components/Post/MyPost";
import {useState, useEffect} from "react";
import {getProductAuthor} from "../../../services/Product";
import axios from "axios";

const MyProduct = () => {

    const [isLoaded, setIsLoaded] = useState(true)
    const [product, setProduct] = useState([])
    const user = useSelector(({user}) => user)

    useEffect(() => {
        try {
            const loadProduct = async () => {
                setIsLoaded(false)
                const items = await axios.get("http://localhost:90/api/v1/product/author", {headers: {"Authorization": user.token}})
                setProduct(items.data)
                setIsLoaded(true)
            }
            loadProduct()
        }catch (e) {
            console.log("fsdfs")
        }

    }, [user])

    return <>
        <div className="product">
            {isLoaded ? product.map((item) => <MyPost key={item.id} item={item}></MyPost>) : (
                <>Загрузка...</>
            )}
        </div>
    </>
}

export default MyProduct