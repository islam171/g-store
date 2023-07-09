import Category from "../../components/Category/Category";
import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "../../../store/actions/filters";
import Posts from "../../components/Posts/Posts";
import Sort from "./../../components/Sort/Sort";

const Catalog = () => {

    const dispatch = useDispatch()
    const products = useSelector(({products}) => products.items)
    const isLoaded = useSelector(({products}) => products.isLoaded)
    const {categoryId} = useSelector(({filters}) => filters)

    const categoryHandler = (index) => {
        dispatch(setCategory(index))
    }

    return <>
        <div className="catalog">
            <h2 className="catalog__title">Каталог</h2>
            <Category onClickItem={(index) => categoryHandler(index)} activeCategory={categoryId}/>
            <Sort/>
            <Posts products={products} isLoaded={isLoaded} activeCategory={categoryId}/>
        </div>
    </>
}

export default Catalog