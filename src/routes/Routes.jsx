import { Route, Routes as Switch } from "react-router-dom";
import CommodityPage from "../pages/Commodity/CommodityPage";
import HomePage from "../pages/Home/HomePage";
import { pathes } from "./pathes";

export const Routes = () => {
  return (
    <Switch>
      <Route
        path={pathes.HOME}
        element={
          <HomePage/>
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