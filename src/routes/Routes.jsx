import { Route, Routes as Switch } from "react-router-dom";
import CommodityPage from "../pages/Commodity/CommodityPage";
import HomePage from "../pages/Home/HomePage";
import { pathes } from "./pathes";

export const Routes = (props) => {
  const {
    totalRecords,
    setTotalRecords,
    pagination,
    setPagination,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
  } = props;
  return (
    <Switch>
      <Route
        path={pathes.HOME}
        element={
          <HomePage
            totalRecords={totalRecords}
            setTotalRecords={setTotalRecords}
            pagination={pagination}
            setPagination={setPagination}
            sorting={sorting}
            setSorting={setSorting}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        }
      />
      <Route
        path={pathes.COMMODITY}
        element={
          <CommodityPage />
        }
      />
    </Switch>
  );
};