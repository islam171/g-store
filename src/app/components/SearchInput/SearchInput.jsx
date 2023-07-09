import {useDispatch} from "react-redux";
import {setSearch} from "../../../store/actions/filters";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from "react";

const SearchInput = () => {

    const dispatch = useDispatch()
    const [searchInputText, setSearchInputText] = useState('')

    const searchHandler = (text) => {
        dispatch(setSearch(text))
    }

    return <div className="search">
        <input type="text" placeholder="Поиск" onChange={(e) => setSearchInputText(e.target.value)} value={searchInputText}/>
        <button className="search__button" onClick={() => searchHandler(searchInputText)}>
            <SearchIcon/>
        </button>
    </div>
}
export default SearchInput;