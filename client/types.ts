export interface IUser {
    _id?: String,
    name: string;
    email: string;
    phone: String;
    verified: boolean;
    country: String;
}




export interface ColData {
    field: string;
    headerName: string;
    width: number;
    sortable: boolean;
}


export interface usePaginationProps {
    totalCount: number;
    pageSize: number;
    siblingCount: number;
    currentPage: number;
    onPageChange?: (page: number) => void;
    className?: string;
}

export interface EditData {
    name: string;
    phone: string;
    country: string;
}