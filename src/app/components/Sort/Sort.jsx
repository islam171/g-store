import {setSort} from "../../../store/actions/filters";
import {setOrderBy} from "../../../store/actions/filters";
import {useDispatch} from "react-redux";

const Sort = () => {
    const dispatch = useDispatch()

    const sortChange = (e) => {
        dispatch(setSort(e.target.options[e.target.options.selectedIndex].value))
    }
    const orderChange = (e) => {
        dispatch(setOrderBy(e.target.options[e.target.options.selectedIndex].value))
    }
//дописать диспачи
    // данные брать из e.target.options[e.target.options.selectedIndex].value
    return <>
        <div className="Sort">
            <select name="" id="" onChange={(e) => sortChange(e)}>
                <option value="title" onClick={() => dispatch(setSort('title'))}>По алфавиту</option>
                <option value="price" onClick={() => dispatch(setSort('price'))}>По цене</option>
            </select>
            <select name="" id="" onChange={(e) => orderChange(e)}>
                <option value="ASC" onClick={() => dispatch(setOrderBy('ASC'))}>По возрастанию</option>
                <option value="DESC" onClick={() => dispatch(setOrderBy('DESC'))}>По убыванию</option>
            </select>
        </div>
    </>
}

export default Sort