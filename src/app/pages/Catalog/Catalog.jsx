import Category from "../../components/Category/Category";
import {useDispatch, useSelector} from "react-redux";
import Posts from "../../components/Posts/Posts";
import Sort from "./../../components/Sort/Sort";
import {categoryHandler} from "../../../services/Category";

const Catalog = () => {

    const dispatch = useDispatch()
    const products = useSelector(({products}) => products.items)
    const isLoaded = useSelector(({products}) => products.isLoaded)
    const {categoryId} = useSelector(({filters}) => filters)

    return <>
        <div className="catalog">
            <h2 className="catalog__title">Каталог</h2>
            <Category onClickItem={(index) => categoryHandler(index, dispatch)} activeCategory={categoryId}/>
            <Sort/>
            <Posts products={products} isLoaded={isLoaded}/>
        </div>
    </>
}

export default Catalog