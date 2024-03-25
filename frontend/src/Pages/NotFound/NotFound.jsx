// CSS
import styles from "./NotFound.module.css"

const NotFound = () => {
    return (
        <div className={styles.not_found}>
            <h1>Pagina Não Encontrada</h1>
            <img src=".././404-image.png" alt="404 image" />
        </div>
    )
}

export default NotFound