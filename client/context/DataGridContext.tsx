import axios, { AxiosRequestConfig } from "axios";
import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../types";
import { NextRouter, useRouter } from "next/router";

const API_URL: string | undefined = process.env.NODE_ENV === "development"? process.env.development_url : process.env.production_url;

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

  const router: NextRouter = useRouter()

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [idtoEdit, setIdToEdit] = useState<string>("");

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  const { skip, limit, order, sortBy } = query;

  const fetchUsers = async (): Promise<void> => {
    try {
      let { data } = await axios.post(
        `${API_URL}/filter/fetch?page=${currentPage}&limit=${limit}&order=${order}&sortBy=${sortBy}`
      );
      setTotalPages(data?.pages);
      setCurrentPage(data?.pageNumber);
      setUsers(data?.data);
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
          `${API_URL}/filter/fetch?page=${_page}&limit=${limit}&order=${order}&sortBy=${sortBy}`
        );
        setUsers(data?.data);
        setCurrentPage(data?.pageNumber);
        setTotalPages(data?.pages);
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
          `${API_URL}/filter/fetch?page=${_page}&limit=${limit}&order=${order}&sortBy=${sortBy}`
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
      let { data } = await axios.post(
        `${API_URL}/filter/fetch?page=${page}&limit=${limit}&order=${order}&sortBy=${sortBy}`
      );
      setUsers(data?.data);
      setCurrentPage(data?.pageNumber);
      setTotalPages(data?.pages);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async (id: string): Promise<void> => {
    try {
      let { data } = await axios.delete(`${API_URL}/delete`, { data: { id: id } });
      alert(data.msg)
      router.reload()
      await fetchUsers();
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

  const handleSortChange = (_order: number, _sortBy: string) => {
    console.log(_order, _sortBy);
    setQuery((prev) => ({ ...prev, order: _order, sortBy: _sortBy }));
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      let formData = {} as any;
      for (let key in newData) {
        if (newData[key] !== "" && newData[key] !== null) {
          formData[key] = newData[key];
        }
      }

      let { data } = await axios.put(
        `${API_URL}/edit`,
        {
          formData,
          id: idtoEdit,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(data.msg)
      router.reload()
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [query]);

  return (
    <DataGridContext.Provider
      value={{
        users,
        totalPages,
        currentPage,
        query,
        showModal,
        newData,
        toggleModal,
        nextPageFetch,
        prevPageFetch,
        jumpToPage,
        deleteItem,
        handleChange,
        handleEdit,
        handleSortChange,
        setIdToEdit,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
};
