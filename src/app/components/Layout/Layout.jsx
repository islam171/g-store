import Header from "../Header/Header";
import Footer from "./../Footer/Footer"

const Layout = ({children}) => {

    return <div className={'wrapper'}>
        <Header/>
        <main>
            <div className="__container">
                <div className="main__content">
                    {children}
                </div>
            </div>
        </main>
        <Footer/>
    </div>

}

export default Layout