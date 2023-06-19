import {Link, useMatch} from "react-router-dom";

const CustomLink = ({children, to, ...props}) => {
    const match  = useMatch(to)
    return (
        <Link
            to={to}
            style={{color: match ? 'aqua' : 'black'}}
            {...props}>
            {children}
        </Link>
    )
}

export default CustomLink;