import styles from './category.module.scss'
import {useSelector} from "react-redux";

const Category = ({onClickItem, activeCategory}) => {

    const categoryList = useSelector(({filters}) => filters.categoryList)

    return <>
        <div className={styles.Category}>
            <ul>
                <li onClick={() => onClickItem(null)}
                    className={activeCategory == null ? styles.active : ''}>Все
                </li>

                {categoryList.map((category) =>
                    <li key={`${category.name}__${category.id}`} onClick={() => onClickItem(Number(category.id))}
                        className={activeCategory === Number(category.id) ? styles.active : ''}>{category.name}</li>)}
            </ul>
        </div>
    </>
}

export default Category