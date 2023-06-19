import {setSort} from "../../../store/actions/filters";
import {setOrderBy} from "../../../store/actions/filters";
import {useDispatch} from "react-redux";

const Sort = () => {
    const dispatch = useDispatch()
    return <>
        <div>
            <ul>
                <li onClick={() => dispatch(setSort('price'))} >По цене</li>
                <li onClick={() => dispatch(setSort('id'))}>По дате</li>
            </ul>
            <ul>
                <li onClick={() => dispatch(setOrderBy('ASC'))} >По убованию</li>
                <li onClick={() => dispatch(setOrderBy('DESC'))}>По возрастанию</li>
            </ul>
        </div>
    </>
}

export default Sort