import { useEffect } from "react";
import { useState } from "react";
import { getAllProduct } from "../../api";
import TableComponent from "../../components/Table/TableComponent";
import styles from "./HomePage.module.css";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

function HomePage() {
  const [loading_allProduct, setLoading_allProduct] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchProduct = async (params) => {
    debugger;
    setLoading_allProduct(true);
    const { rows, columns, totalRecords } = await getAllProduct();
    setRows(rows);
    setColumns(columns);
    setTotalRecords(totalRecords);
    setLoading_allProduct(false);
  };

  useEffect(() => {
    const fetch = async () => {
      return await fetchProduct();
    };
    fetch();
  }, []);

  return (
    <div className={styles.container}>
      {!loading_allProduct &&
        <div className={`${styles.table} ${styles.item}`}>
          <TableComponent rows={rows} columns={columns} totalRecords={totalRecords} />
        </div>
      }
      {loading_allProduct &&
        <Box className={`${styles.table} ${styles.item}`}>
            <CircularProgress />
        </Box>
      }
    </div>
  );
};
  
export default HomePage;