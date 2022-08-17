import React, { useContext } from "react";
import { IUser } from "../types";
import { DataGridContext } from "../context/DataGridContext";

interface PropType {
  row: IUser;
  index: number;
}

let id:string;

const Row = ({ row, index }: PropType) => {
  const { toggleModal, setIdToEdit, deleteItem } = useContext(DataGridContext);

  const handleClick = (): ReturnType<() => void> => {
    toggleModal();
    setIdToEdit(row?._id);
  };

  const handleDeleteClick = (): ReturnType<() => void> => {
    id = row?._id as string;
    deleteItem(id);
  }

  return (
    <tr key={index}>
      <td>{row?._id}</td>
      <td>{row?.name}</td>
      <td>{row?.phone}</td>
      <td>{row?.verified.toString()}</td>
      <td>{row?.country}</td>
      <td>{row?.email}</td>
      <td>
        <button onClick={handleClick}>Edit</button>
        <button onClick={handleDeleteClick} >Delete</button>
      </td>
    </tr>
  );
};

export default Row;
