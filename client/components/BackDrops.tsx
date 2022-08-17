import React, { useContext } from 'react'
import { DataGridContext } from '../context/DataGridContext'
import styles from '../styles/modal.module.scss'


const BackDrops = () => {

    const { showModal, toggleModal } = useContext(DataGridContext)

    return (
        <div onClick={toggleModal} className={styles.back__drop} />
    )
}

export default BackDrops
