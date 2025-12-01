import {useState} from "react";

export const usePagination = (DEFAULT_PAGE_NUMBER: number = 1, DEFAULT_PAGE_SIZE: number = 20) => {
    const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [total, setTotal] = useState(0);

    return {
        page,
        pageSize,
        total,
        setPage,
        setPageSize,
        setTotal
    }
} 