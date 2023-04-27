import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes/Routes";
import { useState } from "react";

function App() {
  const [totalRecords, setTotalRecords] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    page: 1,
    pageSize: 10,
    pageCount: Math.ceil(totalRecords / 10) || 0,
    skip: 0,
  });
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <BrowserRouter>
      <Routes
        totalRecords={totalRecords}
        setTotalRecords={setTotalRecords}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      ></Routes>
    </BrowserRouter>
  );
}

export default App;