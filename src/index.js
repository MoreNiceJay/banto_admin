import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StationPreregisteration from "./views/StationPreregisteration";

import BuyerApplications from "./views/Buyer/BuyerApplications.js";
import BuyerInstallationWatingList from "./views/Buyer/BuyerInstallationWatingList.js";

import BuyerApplicationMaual from "./views/Buyer/BuyerApplicationMaual.js";

import SalesApplications from "./views/Sales/SalesApplications.js";
import StationNeedToSend from "./views/Sales/StationNeedToSend.js";

import StoreApplications from "./views/Store/StoreApplications.js";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/stationpreregisteration"
          component={StationPreregisteration}
        />
        {/* buyer */}
        <Route exact path="/" component={BuyerApplications} />
        <Route
          exact
          path="/buyerapplicationmaual"
          component={BuyerApplicationMaual}
        />
        <Route
          exact
          path="/buyerinstallationwatingList"
          component={BuyerInstallationWatingList}
        />

        {/* Sales */}
        <Route exact path="/salesapplications" component={SalesApplications} />
        <Route exact path="/stationneedtosend" component={StationNeedToSend} />
        {/* store */}
        <Route exact path="/storeapplications" component={StoreApplications} />
      </Switch>
    </BrowserRouter>
    ,
  </StrictMode>,
  rootElement
);
