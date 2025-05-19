import { useState } from "react";

const usePagination = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return [page, limit, total, handlePageChange];
};

export default usePagination;
