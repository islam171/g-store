import styles from './Profile.module.scss'
import {useSelector} from "react-redux";
import { useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const Profile = () => {

    const user = useSelector(({user}) => user.user)
    const company = useSelector(({companies}) => companies.company)

    const [username, setUsername] = useState('')

    const createCompany = (e) => {
        e.preventDefault()
        axios.post('http://localhost:90/api/v1/company', {
            'username': username
        }, {
            headers: {'Authorization': `${user.token}`}
        })
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    // useEffect(() => {
    //     axios.get('http://localhost:90/api/v1/companyByUser', {
    //         headers: {'Authorization': `${user.token}`}
    //     }).then((res) => {
    //         setCompany(res.data.company)
    //     })
    //         .catch((error) => {
    //             console.error(error)
    //         })
    // }, [user.token])




    return <>
        <div className={styles.Profile}>
            <form>
                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
                <button onClick={createCompany}>Создать</button>
            </form>
            {company &&
                <Link to={'/my-company'}>{company.name}</Link>
            }

            {/*<Posts/>*/}
        </div>

    </>
}

export default Profile