// CSS
import styles from "./UpdateArticle.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const UpdateArticle = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const getArticle = async() => {
        const res = dbFetch.get("")
    }


    return (
        <div>
            <h1>Atualizar Artigo</h1>
        </div>
    )
}

export default UpdateArticle