import { useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { DataGridContext } from "../context/DataGridContext";
import { DataGrid } from '../components/imports'
import { ColData } from "../types";

const Home: NextPage = () => {

  const columns : ColData[] = [
    { field: "_id", headerName: "ID", width: 70, sortable: true },
    { field: "name", headerName: "Name", width: 130, sortable: true },
    { field: "phone", headerName: "Phone", width: 130, sortable: true },
    { field: "verified", headerName: "Verified", width: 130, sortable: true },
    {field: "country", headerName: "Country", width: 130, sortable: true},
    {field: "email", headerName: "Email", width: 200, sortable: true},
    {field: "action", headerName: "Action", width: 130, sortable: false},
  ]


  // Get Data From Context
  const { nextPageFetch, prevPageFetch, users } = useContext<any>(DataGridContext);

  return (
    <div className={styles.container}>

    <h1 className={styles.h1} >Re Usable DataGrid</h1>
    <h3 className={styles.h3} >Click On Column header to sort by it</h3>

    <DataGrid columns={columns} rows={users} pageSize={3} />

    {/*   <div style={{ display: "flex" }}>
        <button style={{ padding: "20px" }} onClick={prevPageFetch} >prev page</button>
        <button style={{ padding: "20px" }} onClick={nextPageFetch}  >next page</button>
      </div> */}
    </div>
  );
};

export default Home;
