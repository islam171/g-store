import axios from "axios";
import {setAllCategory, setCategory} from "../store/actions/filters";

export const setAllCategories = (dispatch) => {
    axios.get('http://localhost:90/api/v1/category')
        .then((res) => {
            dispatch(setAllCategory([...res.data.category]))
        }).catch((error) => {
        console.error(error)
    })
}

export const categoryHandler = (index, dispatch) => {
    dispatch(setCategory(index))
}