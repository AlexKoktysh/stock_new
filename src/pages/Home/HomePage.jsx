import { useEffect, useState } from "react";
import { addToReserve, getAllProduct } from "../../api";
import TableComponent from "../../components/Table/TableComponent";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import UserDialogComponent from "../../components/Dialog/UserDialogComponent";

const start_columns = [
  {
    accessorKey: "id",
    header: "№",
    "muiTableHeadCellProps": {
      "align": 'center',
    },
    "muiTableBodyCellProps": {
        "align": 'center',
    },
    size: 60,
  },
  {
    accessorKey: "doc_start_date",
    header: "Дата приходного документа",
    "muiTableHeadCellProps": {
      "align": 'center',
    },
    "muiTableBodyCellProps": {
        "align": 'center',
    },
    size: 100,
  },
  {
    accessorKey: "doc_number",
    header: "Номер приходного документа",
    "muiTableHeadCellProps": {
      "align": 'center',
    },
    "muiTableBodyCellProps": {
        "align": 'center',
    },
    size: 100,
  },
  {
    accessorKey: "product_name",
    header: "Наименование товара",
    "muiTableHeadCellProps": {
      "align": 'center',
    },
    "muiTableBodyCellProps": {
        "align": 'center',
    },
    size: 100,
  },
  {
    accessorKey: "product_qty",
    header: "Остаток",
    "muiTableHeadCellProps": {
      "align": 'center',
    },
    "muiTableBodyCellProps": {
        "align": 'center',
    },
    size: 60,
  },
  {
    accessorKey: "product_price",
    header: "Цена без НДС (BYN)",
    "muiTableHeadCellProps": {
      "align": 'center',
    },
    "muiTableBodyCellProps": {
        "align": 'center',
    },
    size: 60,
    maxSize: 60,
  },
  {
    accessorKey: "contragent_name",
    enableGlobalFilter: false,
    header: "Наим. контрагента",
    "muiTableHeadCellProps": {
      "align": 'center',
    },
    "muiTableBodyCellProps": {
        "align": 'center',
    },
    size: 100,
  },
  {
    accessorKey: "doc_link",
    header: "Просмотреть",
    enableGlobalFilter: false,
    enableColumnActions: false,
    enableColumnFilter: false,
    enableSorting: false,
    "muiTableHeadCellProps": {
      "align": 'center',
    },
    "muiTableBodyCellProps": {
        "align": 'center',
    },
    size: 100,
  },
  {
    accessorKey: "action",
    header: "Добавить в резерв",
    enableGlobalFilter: false,
    enableColumnActions: false,
    enableColumnFilter: false,
    enableSorting: false,
    "muiTableHeadCellProps": {
      "align": 'center',
    },
    "muiTableBodyCellProps": {
        "align": 'center',
    },
    size: 100,
  },
];

function HomePage(props) {
  const {
    totalRecords,
    setTotalRecords,
    pagination,
    setPagination,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    globalFilter,
    setGlobalFilter,
  } = props;
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState(start_columns);

  const navigate = useNavigate();

  const setNavigate = (id) => {
    return navigate(`/stock_new/commodity/${id}`);
  };

  const fetchProduct = async (params) => {
    setRows([]);
    setLoading(true);
    const { rows, columns, totalRecords } = await getAllProduct(params);
    const custom_rows = rows?.map((row) => {
      return {
        ...row,
        doc_link: <Button variant="contained" sx={{ width: "120px", height: "20px" }} onClick={() => setNavigate(row?.id)}>Просмотреть</Button>,
        action:
          <UserDialogComponent
            openDialogText="Добавить в резерв"
            openedDialogTitle="Добавить в резерв"
            openedDialogMessage="Вы действительно хотите добавить данный товар в резерв?"
            agreeActionText="Да"
            agreeActionFunc={() => addToReserve(row?.add_to_reserve?.product_id)}
          />
      };
    });
    setRows(custom_rows);
    setColumns(columns);
    setTotalRecords(totalRecords);
    setLoading(false);
  };

  useEffect(() => {
    setPagination((prev) => {
        return { ...prev, pageCount: Math.ceil(totalRecords / pagination.pageSize) };
    });
  }, [pagination?.pageSize, totalRecords]);
  useEffect(() => {
      setPagination((prev) => {
        return { ...prev, skip: pagination.page * pagination.pageSize - pagination.pageSize };
      });
  }, [pagination.page, pagination.pageSize]);
  useEffect(() => {
    fetchProduct({ filters: columnFilters, sorting, take: pagination.pageSize, skip: pagination.skip, searchText: globalFilter });
  }, 
  [
    pagination.skip,
    pagination.pageSize,
    sorting,
    columnFilters,
    globalFilter,
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
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
    </div>
  );
};
  
export default HomePage;