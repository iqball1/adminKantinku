/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import LogoApp from "../../src/assets/img/LogoKantin.png";
import LogoApk from '../../src/assets/img/SedukanLogo.png'


class Dashboard extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Col className="justify-content-center">
            <CardTitle tag="h2" align="center">
              Selamat Datang di Admin Kantinku
            </CardTitle>
            <img
              src={LogoApp}
              className="rounded mx-auto d-block"
              alt="logo"
              width="400"
            />
          </Col>
        </div>
      </>
    );
  }
}

export default Dashboard;
