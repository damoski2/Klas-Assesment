import React, { ReactNodeArray, useState, useEffect, useContext } from "react";
import { IUser, ColData } from "../types";
import Row from "./Row";
import styles from "../styles/GridTable.module.css";
import { DataGridContext } from '../context/DataGridContext'
import Pagination from "./Pagination";

interface PropType {
  rows: IUser[];
  columns: ColData[];
  pageSize: number;
}

const DataGrid = ({ columns, rows, pageSize }: PropType) => {

    //Destructure dynamic pagination data among other data from context
    const { totalPages, jumpToPage, currentPage } = useContext(DataGridContext);

    const [pages, setPages] = useState<number[]>([])

    useEffect(()=>{
        let _num: number = totalPages * 3;
        setPages(Array(_num).fill(0).map((_, i) => i + 1))
    },[totalPages])

    console.log(pages);

    const changePage = async(_page: number)=>{
        await jumpToPage(_page);
    }

  return (
    /*   <div className={styles.table}>
      {columns?.map((column: ColData, index: number) => (
        <div key={index} className={styles.table__header}>
          {column.headerName}
        </div>
      ))}
         {rows?.map((row: IUser, index: number) => 
          {columns?.map((column: ColData, index: number) => (
            <div key={index} className={styles.row__data}>
                {row[column?.field]}
            </div>
          ))}
      )}  
    </div> */

    <div>
      <table>
        <thead>
          <tr>
            {columns?.map((column: ColData, index: number) => (
              <th key={index} className={styles.table__header}>
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
            {rows?.map((row: IUser, index: number) => 
               <Row key={index} row={row} index={index} />
            )}
        </tbody>
      </table>
      <div className={styles.pagination}>
      <Pagination className="pagination-bar" siblingCount={1} currentPage={currentPage} totalCount={(totalPages * 3) as number} pageSize={3} onPageChange={changePage} />
      </div>
     
    </div>
  );
};

export default DataGrid;
