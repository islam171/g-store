import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Post from "../../components/Post/Post";
import axios from "axios";

const PostPage = () => {

    const [items, setItems] = useState({})
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:90/api/v1/product/id?productId=${id}`)
            .then((res) => setItems(res.data.product))
            .catch((error) => console.error(error))
    }, [id])


    return <>
        <Post item={items}></Post>
    </>


}

export default PostPage