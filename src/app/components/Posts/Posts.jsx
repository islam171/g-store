import styles from "./Posts.module.css";
import Post from "../Post/Post";

const Posts = ({products, isLoaded, activeCategory}) => {
    return <>
        <div className="product">
            {isLoaded ? products.map((item) => <Post key={item.id} item={item}></Post>) : (
                <>Загрузка...</>
            )}
        </div>
    </>
}

export default Posts