import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StationPreregisteration from "./views/StationPreregisteration";

import BuyerApplications from "./views/Buyer/BuyerApplications.js";
import BuyerApplicationMaual from "./views/Buyer/BuyerApplicationMaual.js";

import SalesApplications from "./views/Sales/SalesApplications.js";
import StationNeedToSend from "./views/Sales/StationNeedToSend.js";

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
        <Route exact path="/" component={BuyerApplications} />
        <Route
          exact
          path="/buyerapplicationmaual"
          component={BuyerApplicationMaual}
        />
        <Route exact path="/salesapplications" component={SalesApplications} />
        <Route exact path="/stationneedtosend" component={StationNeedToSend} />
      </Switch>
    </BrowserRouter>
    ,
  </StrictMode>,
  rootElement
);
