import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Spinner,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import {
  getListUser,
  deleteUsers,
  getDetailUser,
} from "../../actions/AuthAction";
import swal from "sweetalert";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { updateStatus, updateStatusAktif } from "../../actions/DataUser";

class ListUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: "",
      email: "",
      nohp: "",
      alamat: "",
      kelas: "",
      avatar: false,
      status: true,
    };
  }
  componentDidMount() {
    this.props.dispatch(getListUser());
    this.props.dispatch(getDetailUser(this.props.match.params.uid));
  }
  componentDidUpdate(prevProps) {
    const { updateStatusResult, updateStatusAktifResult } = this.props;

    if (
      updateStatusResult &&
      prevProps.updateStatusResult !== updateStatusResult
    ) {
      swal("Sukses!", updateStatusResult, "success");
      this.props.dispatch(getListUser());
    }
    if (
      updateStatusAktifResult &&
      prevProps.updateStatusAktifResult !== updateStatusAktifResult
    ) {
      swal("Sukses!", updateStatusAktifResult, "success");
      this.props.dispatch(getListUser());
    }
  }
  updateStatus = (key) => {
    this.props.dispatch(updateStatus(key));
  };
  updateStatusAktif = (key) => {
    this.props.dispatch(updateStatusAktif(key));
  };

  removeData = (key) => {
    this.props.dispatch(deleteUsers(key));
  };

  render() {
    const { getListUserError, getListUserLoading, getListUserResult } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/DataUser" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">List Detail User</CardTitle>
                <ReactHTMLTableToExcel
                  id="test-table-xlsx-button"
                  className="btn btn-primary"
                  table="table-to-xlsx"
                  filename="DataUserKantinku"
                  sheet="tablexlsx"
                  buttonText="Cetak Data"
                  Icons="document-text-outline"
                />
              </CardHeader>
              <CardBody>
                <Table id="table-to-xlsx">
                  <thead className="text-primary">
                    <tr align="center">
                      <th>Foto</th>
                      <th>Nama</th>
                      <th>Email</th>
                      <th>NoHp</th>
                      <th>Alamat</th>
                      <th>Kelas</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody align="center">
                    {getListUserResult ? (
                      Object.keys(getListUserResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getListUserResult[key].avatar}
                              width="100"
                              height="100"
                              alt={getListUserResult[key].nama}
                            />
                          </td>
                          <td>{getListUserResult[key].nama} </td>
                          <td>{getListUserResult[key].email} </td>
                          <td>{getListUserResult[key].nohp} </td>
                          <td>{getListUserResult[key].alamat} </td>
                          <td>{getListUserResult[key].kelas} </td>
                          <td>{getListUserResult[key].status} </td>
                        </tr>
                      ))
                    ) : getListUserLoading ? (
                      <tr>
                        <td colSpan="6" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListUserError ? (
                      <tr>
                        <td colSpan="6" align="center">
                          {getListUserError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="6" align="center">
                          Data Kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getListUserLoading: state.AuthReducer.getListUserLoading,
  getListUserResult: state.AuthReducer.getListUserResult,
  getListUserError: state.AuthReducer.getListUserError,

  getDatailUserLoading: state.AuthReducer.getDatailUserLoading,
  getDatailUserResult: state.AuthReducer.getDatailUserResult,
  getDatailUserError: state.AuthReducer.getDatailUserError,

  updateStatusLoading: state.AuthReducer.updateStatusLoading,
  updateStatusResult: state.AuthReducer.updateStatusResult,
  updateStatusError: state.AuthReducer.updateStatusError,

  updateStatusAktifLoading: state.AuthReducer.updateStatusAktifLoading,
  updateStatusAktifResult: state.AuthReducer.updateStatusAktifResult,
  updateStatusAktifError: state.AuthReducer.updateStatusAktifError,
});

export default connect(mapStateToProps, null)(ListUser);
