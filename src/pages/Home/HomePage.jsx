import { useEffect, useState } from "react";
import { getAllProduct } from "../../api";
import TableComponent from "../../components/Table/TableComponent";
import styles from "./HomePage.module.css";

const start_columns = [
  {
    accessorKey: "id",
    header: "№",
  },
  {
    accessorKey: "doc_start_date",
    header: "Дата приходного документа",
  },
  {
    accessorKey: "doc_number",
    header: "Номер приходного документа",
  },
  {
    accessorKey: "doc_type",
    header: "Тип приходного документа",
  },
  {
    accessorKey: "product_name",
    header: "Наименование товара",
  },
  {
    accessorKey: "product_qty",
    header: "Остаток",
  },
  {
    accessorKey: "product_price",
    header: "Цена без НДС (BYN)",
  },
  {
    accessorKey: "doc_link",
    header: "Просмотреть",
  },
];

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState(start_columns);
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

  const fetchProduct = async (params) => {
    setLoading(true);
    const { rows, columns, totalRecords } = await getAllProduct(params);
    setRows(rows);
    setColumns(columns);
    setTotalRecords(totalRecords);
    setLoading(false);
  };

  useEffect(() => {
    setPagination((prev) => {
        return { ...prev, pageCount: Math.ceil(totalRecords / pagination.pageSize) };
    });
  }, [pagination.pageSize, totalRecords]);
  useEffect(() => {
      setPagination((prev) => {
        return { ...prev, skip: pagination.page * pagination.pageSize - pagination.pageSize };
      });
  }, [pagination.page, pagination.pageSize]);
  useEffect(() => {
    fetchProduct({ filters: columnFilters, sorting, take: pagination.pageSize, skip: pagination.skip });
  }, [
    pagination.skip,
    pagination.pageSize,
    sorting,
    columnFilters,
  ]);

  return (
    <div className={styles.container}>
      <div className={`${styles.table} ${styles.item}`}>
        <TableComponent
          rows={rows}
          columns={columns}
          totalRecords={totalRecords}
          pagination={pagination}
          setPagination={setPagination}
          sorting={sorting}
          setSorting={setSorting}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          loading={loading}
        />
      </div>
    </div>
  );
};
  
export default HomePage;