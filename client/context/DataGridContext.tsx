import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../types";

const API_URL: string = "http://localhost:8000/api";

type ContextProp = {
  children: JSX.Element;
};

type QueryType = {
  skip: number;
  limit: number;
  order: number;
  sortBy: string;
};

type EditData = {
  name?: string;
  phone?: string;
  verified?: boolean | null;
};

export const DataGridContext: React.Context<any> = createContext<null>(null);

export const DataGridProvider: React.FC<ContextProp> = ({
  children,
}): JSX.Element => {
  const [users, setUsers] = useState<IUser | []>([]);
  const [query, setQuery] = useState<QueryType>({
    skip: 0,
    limit: 3,
    order: 1,
    sortBy: "_id",
  });
  const [newData, setNewData] = useState<{
    [key: string]: string | boolean | null;
  }>({
    name: "",
    phone: "",
    verified: null,
  });

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { skip, limit, order, sortBy } = query;

  const fetchUsers = async (): Promise<void> => {
    try {
      let { data } = await axios.post(
        `${API_URL}/filter/fetch?page=${currentPage}&limit=${limit}&order=${order}&sortBy=${sortBy}`
      );
      setTotalPages(data?.pages);
      setCurrentPage(data?.pageNumber);
      setUsers(data?.data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const prevPageFetch = async (): Promise<void> => {
    try {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
        let _page = currentPage - 1;
        console.log(_page);
        let { data } = await axios.post(
          `${API_URL}/filter/fetch?page=${_page}`
        );
        setUsers(data?.data);
        setCurrentPage(data?.pageNumber);
        setTotalPages(data?.pages);
        console.log(data);
      } else {
        alert("First page");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const nextPageFetch = async (): Promise<void> => {
    try {
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
        let _page = currentPage + 1;
        let { data } = await axios.post(
          `${API_URL}/filter/fetch?page=${_page}`
        );
        setUsers(data?.data);
        setCurrentPage(data?.pageNumber);
        setTotalPages(data?.pages);
        console.log(data);
      } else {
        alert("No more pages");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const jumpToPage = async (page: number): Promise<void> => {
    try {
      setCurrentPage(page);
      let { data } = await axios.post(`${API_URL}/filter/fetch?page=${page}`);
      setUsers(data?.data);
      setCurrentPage(data?.pageNumber);
      setTotalPages(data?.pages);
      console.log(data);
    } catch (e) {
        console.log(e)
    }
  };

  const deleteItem = async (id: string): Promise<void> => {
    try {
      let { data } = await axios.delete(`${API_URL}/delete/${id}`);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange =
    (name: string) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setNewData((prev) => ({ ...prev, [name]: value }));
    };

  const handleEdit = async (id: string): Promise<void> => {
    try {
      let post = {} as any;
      for (let key in newData) {
        if (newData[key] !== "") {
          post[key] = newData[key];
        }
      }
      let { data } = await axios.put(`${API_URL}/edit/${id}`, {
        ...post,
        id: id,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <DataGridContext.Provider
      value={{
        users,
        totalPages,
        currentPage,
        nextPageFetch,
        prevPageFetch,
        jumpToPage,
        deleteItem,
        handleChange,
        handleEdit,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
};
