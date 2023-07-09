import {useSelector} from "react-redux";

const Category = ({onClickItem, activeCategory}) => {

    const categoryList = useSelector(({filters}) => filters.categoryList)

    return <>
        <div className="Category">
            <ul>
                <li onClick={() => onClickItem(null)}
                    className={activeCategory == null ? "active" : ''}>Все
                </li>
                <ul>
                    {categoryList.map((category) =>
                        <li
                            key={`${category.name}__${category._id}`}
                            onClick={() => onClickItem(category._id)}
                            className={activeCategory === category._id ? "active" : ''}
                        >{category.name}</li>)}
                </ul>
            </ul>
        </div>
    </>
}

export default Category