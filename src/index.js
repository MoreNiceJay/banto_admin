import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BuyerApplications from "./views/BuyerApplications.js";
import SalesApplications from "./views/SalesApplications.js";
import StationNeedToSend from "./views/StationNeedToSend.js";
import StationPreregisteration from "./views/StationPreregisteration";
import Station from "./views/Station.js";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={BuyerApplications} />
        <Route exact path="/station" component={Station} />
        <Route exact path="/salesapplications" component={SalesApplications} />
        <Route exact path="/stationneedtosend" component={StationNeedToSend} />
        <Route
          exact
          path="/stationpreregisteration"
          component={StationNeedToSend}
        />
      </Switch>
    </BrowserRouter>
    ,
  </StrictMode>,
  rootElement
);
