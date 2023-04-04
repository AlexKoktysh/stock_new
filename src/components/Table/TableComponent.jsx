import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import PaginationComponent from "../Pagination/PaginationComponent";
import { GETdata } from "../../api";

function TableComponent(props) {
    const { rows, columns, totalRecords, fetch } = props;
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

    const navigate = useNavigate();
    const setNavigate = (id) => {
        return navigate(`commodity/${id}`);
    };

    useEffect(() => {
        const item = document.getElementsByClassName("pagination");
        const parent = item[0].parentNode;
        parent.style.width = "100%";
        parent.style.border = "1px solid #e0e0e0";
    }, [rows]);
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
        const fetchData = async () => {
            const data = await GETdata({ filters: columnFilters, sorting, take: pagination.pageSize, globalFilter, skip: pagination.skip });
        };
        fetchData();
    }, [
        pagination,
        sorting,
        columnFilters,
        globalFilter,
    ]);


    return (
        <div style={{ height: 600, width: '100%', overflowY: 'auto' }}>
            <MaterialReactTable
                columns={columns}
                data={rows}
                enableRowSelection={false}
                initialState={{ density: 'compact' }}
                state={{
                    pagination,
                    sorting,
                    columnFilters,
                    globalFilter,
                }}
                onPaginationChange={setPagination}
                onSortingChange={setSorting}
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                rowCount={totalRecords}
                localization={MRT_Localization_RU}
                defaultColumn={{
                    minSize: 40,
                    maxSize: 300,
                    size: 250,
                }}
                muiTablePaginationProps={{
                    rowsPerPageOptions: [5, 10, 20],
                    showFirstButton: false,
                    showLastButton: false,
                    width: "100%",
                    className: "pagination",
                    ActionsComponent: () => PaginationComponent({ setPagination, pagination })
                }}
            />
        </div>
    );
};
  
export default TableComponent;