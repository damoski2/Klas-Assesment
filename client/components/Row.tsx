import React from 'react'
import { IUser } from '../types'

interface PropType {
    row: IUser;
    index: number;
}

const Row = ({ row, index }: PropType) => {
  return (
    <tr key={index} >
    <td>{row?._id}</td>
    <td>{row?.name}</td>
    <td>{row?.phone}</td>
    <td>{row?.verified.toString()}</td>
    <td>{row?.country}</td>
    <td>{row?.email}</td>
    <td>
        <button>Edit</button>
        <button>Delete</button>
    </td>
</tr>
  )
}

export default Row