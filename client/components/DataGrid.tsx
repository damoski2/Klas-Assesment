import React, { ReactNodeArray, useState, useEffect, useContext } from "react";
import { IUser, ColData } from "../types";
import Row from "./Row";
import styles from "../styles/GridTable.module.css";
import { DataGridContext } from "../context/DataGridContext";
import Pagination from "./Pagination";
import BackDrops from "./BackDrops";
import EditModal from "./EditModal";

interface PropType {
  rows: IUser[];
  columns: ColData[];
  pageSize: number;
}

const DataGrid = ({ columns, rows, pageSize }: PropType) => {
  //Destructure dynamic pagination data among other data from context
  const {
    totalPages,
    jumpToPage,
    currentPage,
    query,
    handleSortChange,
    showModal,
  } = useContext(DataGridContext);

  const { sortBy, order } = query;

  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    let _num: number = totalPages * 3;
    setPages(
      Array(_num)
        .fill(0)
        .map((_, i) => i + 1)
    );
  }, [totalPages]);

  const changePage = async (_page: number) => {
    await jumpToPage(_page);
  };

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

    <div style={{ padding: "0 30px" }}>
      {showModal && (
        <>
          <EditModal />
        </>
      )}
      <table>
        <thead>
          <tr>
            {columns?.map((column: ColData, index: number) => (
              <th key={index}>
                <span
                  style={{
                    color: column.field === sortBy ? "blue    " : "black",
                  }}
                >
                  {column.headerName}
                </span>

                {column.sortable && (
                  <>
                    <div
                      style={{
                        width: "fit-content",
                        fontSize: "10px",
                        cursor: "pointer",
                        marginTop: "10px",
                        marginBottom: "10px",
                        color:
                          order === 1 && column.field === sortBy
                            ? "blue    "
                            : "black",
                      }}
                      onClick={() => handleSortChange(1, column.field)}
                    >
                      &#8593; sort Ascending order
                    </div>
                    <div
                      style={{
                        width: "fit-content",
                        fontSize: "10px",
                        cursor: "pointer",
                        color:
                          order === -1 && column.field === sortBy
                            ? "blue    "
                            : "black",
                      }}
                      onClick={() => handleSortChange(-1, column.field)}
                    >
                      &#8595; sort Descending order
                    </div>
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows?.map((row: IUser, index: number) => (
            <Row key={index} row={row} index={index} />
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <Pagination
          className="pagination-bar"
          siblingCount={1}
          currentPage={currentPage}
          totalCount={(totalPages * 3) as number}
          pageSize={3}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};

export default DataGrid;
