import styles from './SerachInput.module.css'

const SerachInput = ({handleSubmit, className}) => {
    return <div className={className}>
        <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.search}>
                <input type="search" name='search' placeholder={'поиск'} className={styles.input}/>
                <input type='submit' value='Search' className={styles.button}></input>
            </div>

        </form>
    </div>
}
export default  SerachInput;