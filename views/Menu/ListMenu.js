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
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import { deleteMenu, getListMenu } from "../../actions/MenusAction";
import swal from "sweetalert";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

class ListMenu extends Component {
  componentDidMount() {
    this.props.dispatch(getListMenu());
  }

  componentDidUpdate(prevProps) {
    const { deleteMenuResult } = this.props;

    if (deleteMenuResult && prevProps.deleteMenuResult !== deleteMenuResult) {
      swal("Sukses!", deleteMenuResult, "success");
      this.props.dispatch(getListMenu());
    }
  }

  removeData = (images, key) => {
    this.props.dispatch(deleteMenu(images, key));
  };

  render() {
    const { getListMenuError, getListMenuLoading, getListMenuResult } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Menu</CardTitle>
                <Link
                  to="/admin/Menu/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Menu
                </Link>
              </CardHeader>
              <CardBody>
                <Table >
                  <thead className="text-primary">
                    <tr align="center">
                      <th>Foto</th>
                      <th>Nama Menu</th>
                      <th>Harga</th>
                      <th>Jenis</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody align="center">
                    {getListMenuResult ? (
                      Object.keys(getListMenuResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getListMenuResult[key].gambar}
                              width="100"
                              alt={getListMenuResult[key].nama}
                            />
                          </td>
                          <td>{getListMenuResult[key].nama}</td>
                          <td>Rp. {getListMenuResult[key].harga}</td>
                          <td>{getListMenuResult[key].jenis} </td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/Menu/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>

                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() =>
                                this.removeData(
                                  getListMenuResult[key].gambar,
                                  key
                                )
                              }
                            >
                              <i className="nc-icon nc-basket"></i> Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getListMenuLoading ? (
                      <tr>
                        <td colSpan="6" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListMenuError ? (
                      <tr>
                        <td colSpan="6" align="center">
                          {getListMenuError}
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
  getListMenuLoading: state.MenuReducer.getListMenuLoading,
  getListMenuResult: state.MenuReducer.getListMenuResult,
  getListMenuError: state.MenuReducer.getListMenuError,

  deleteMenuLoading: state.MenuReducer.deleteMenuLoading,
  deleteMenuResult: state.MenuReducer.deleteMenuResult,
  deleteMenuError: state.MenuReducer.deleteMenuError,
});

export default connect(mapStateToProps, null)(ListMenu);
