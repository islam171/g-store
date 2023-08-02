import AddchartTwoToneIcon from '@mui/icons-material/AddchartTwoTone';
import Icon from '../../components/Icon/Icon'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {categoryHandler} from "../../../services/Category";

const Home = () => {

    const dispatch = useDispatch()
    let {categoryList} = useSelector(({filters}) => filters)
    if(categoryList.lenght > 9){
        categoryList = categoryList.slice(9)
    }else{
        categoryList = categoryList
    }


    return <>
        <section className="block-heading">
            <div className="sidebar">
                {categoryList.map((category) => (
                    <Link to="/Catalog" key={category._id}>
                    <div className="sidebar__item"  onClick={() => categoryHandler(category._id, dispatch)}>
                        <div className="middle-icon">
                            <Icon>
                                <AddchartTwoToneIcon/>
                            </Icon>
                        </div>
                        <h3>{category.name}</h3>
                    </div>
                    </Link>
                ))}
                <div className="sidebar__flex"></div>
                <div className="sidebar__item allcategories">
                    <div className="yellow middle-icon">
                        <div></div>
                    </div>
                    <h3>Все категории</h3>
                </div>
            </div>
            <div className="scrollbar"></div>
            <div className="slider">
                <div className="slider__inner">
                    <div className="slider__button"></div>
                    <div className="slider__item">
                        <div className="slider__img">
                            <img src="" alt=""/>
                        </div>
                        <div className="slider__content">
                            <div className="slider__text">
                                <h2>Выгодно сегодня</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet
                                    asperiores, debitis eaque earum error facilis illo labore molestiae
                                    pariatur possimus provident quia quis, quod, temporibus vel
                                    voluptatibus!</p>
                            </div>
                            <div className="slider__column">
                                <Link to="/Catalog"><button>Все товары</button></Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Home;