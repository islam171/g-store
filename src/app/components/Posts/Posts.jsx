import Post from "../Post/Post";

const Posts = ({products, isLoaded}) => {
    return <>
        <div className="product">
            {isLoaded ? products.map((item, index) => <Post item={item} key={index}></Post>) : (
                <>Загрузка...</>
            )}
        </div>
    </>
}

export default Posts