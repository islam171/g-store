import {useDispatch} from "react-redux";
import {setSearch} from "../../../store/actions/filters";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from "react";
import {Link} from "react-router-dom";

const SearchInput = () => {

    const dispatch = useDispatch()
    const [searchInputText, setSearchInputText] = useState('')

    const searchHandler = (text) => {
        dispatch(setSearch(text))
    }

    return <div className="search">
        <input type="text" placeholder="Поиск" onChange={(e) => setSearchInputText(e.target.value)} value={searchInputText}/>
        <Link to={"/Catalog"}>
            <button className="search__button" onClick={() => searchHandler(searchInputText)}>
                <SearchIcon/>
            </button>
        </Link>
    </div>
}
export default SearchInput;