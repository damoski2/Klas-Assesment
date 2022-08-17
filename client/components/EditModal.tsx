import React, { useContext, useState } from 'react'
import styles from '../styles/modal.module.scss'
import { DataGridContext } from '../context/DataGridContext'
import BackDrops from './BackDrops'
import { EditData } from '../types'

const EditModal = () => {

    const { toggleModal, handleChange, newData, handleEdit } = useContext(DataGridContext)
   

    const { name, phone, country } = newData

    return (
      <div className={styles.container} onClick={toggleModal} >
          <form className={styles.form} onClick={e=>e.stopPropagation()} onSubmit={handleEdit} >
            <div>
                <label>Name</label> 
                <input value={name} onChange={handleChange("name")} type="text" placeholder="Enter new name" />
            </div>
            <div>
                <label>Phone</label> 
                <input value={phone} onChange={handleChange("phone")}  type="text" placeholder="Enter new phone" />
            </div>
            <div>
                <label>Country</label> 
                <input value={country} onChange={handleChange("country")}  type="text" placeholder="Country" />
            </div> 
            <button type="submit" >Submit</button>
        </form>
      </div>
    )
}

export default EditModal
