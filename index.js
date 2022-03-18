import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducers/store";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import { Login, Gagal, Finish, Unfinish, Register } from './views'

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/login" component={Login} exact />
        <Route path="/Register" component={Register} exact />
        <Route path="/payment/finish" component={Finish} exact />
        <Route path="/payment/error" component={Gagal} exact />
        <Route path="/payment/unfinish" component={Unfinish} exact />

        <Redirect to="/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
