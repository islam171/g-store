import Header from "../Header/Header";
import Footer from "./../Footer/Footer"
import {Outlet} from "react-router-dom";

const Layout = () => {

    return <div className={'wrapper'}>
        <Header/>
        <main>
            <div className="__container">
                <div className="main__content">
                    <Outlet/>
                </div>
            </div>
        </main>
        <Footer/>
    </div>

}

export default Layout