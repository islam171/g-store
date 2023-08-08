import axios from "axios";
import {createProduct, setLoaded, setProducts} from "../store/actions/products";

export const getProduct = async (id) => {
    return await axios.get(`http://localhost:90/api/v1/product/${id}`).catch((error) => console.error(error))
}

export const updateProduct = async (id, data, token) => {
    return await axios.patch(
        `http://localhost:90/api/v1/product/${id}`,
        data,
        {headers: {"Authorization": token}}).catch((error) => console.error(error))
}

export const fetchProducts = (categoryId, sort, orderBy, searchText, dispatch) => {
    dispatch(setLoaded(false))
    axios.get(`http://localhost:90/api/v1/product?${categoryId !== null ? `_category=${categoryId}` : '_category='}&_sort=${sort}&_order=${orderBy}&_search=${searchText !== null ? `${searchText}` : ''}`)
        .then(res => {
            dispatch(setProducts([...res.data]))
        }).catch((error) => {console.error(error)})
}

export const getProductAuthor = async (token) => {
    const items = await axios.get("http://localhost:90/api/v1/product/author",
        {headers: {"Authorization": token}}).catch((error) => console.error(error))
    console.log(items)
}

export const addProduct = async (token, data, dispatch) => {
    try{
        const product = await axios.post('http://localhost:90/api/v1/product', data,{headers: {'Authorization': `${token}`}})
        dispatch(createProduct(product))
    }catch (e) {
        console.log(e)
    }
}