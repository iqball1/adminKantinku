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
  Button,
  Spinner,
} from "reactstrap";
import { getListKategori, deleteKategori } from "actions/KategoriAction";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class ListKategori extends Component {
  componentDidMount() {
    this.props.dispatch(getListKategori());
  }

  removeData = (image, id) => {
    //akses ke action
    this.props.dispatch(deleteKategori(image, id));
  };

  componentDidUpdate(prevProps) {
    const { deleteKategoriResult } = this.props;

    if (
      deleteKategoriResult &&
      prevProps.deleteKategoriResult !== deleteKategoriResult
    ) {
      swal("Sukses!", deleteKategoriResult, "success");
      this.props.dispatch(getListKategori());
    }
  }

  render() {
    const {
      getListKategoriError,
      getListKategoriLoading,
      getListKategoriResult,
    } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Kategori</CardTitle>
                <Link
                  to="/admin/Kategori/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Kategori
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr align="center">
                      <th>Logo</th>
                      <th>Nama Kategori</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody align="center">
                    {getListKategoriResult ? (
                      Object.keys(getListKategoriResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getListKategoriResult[key].image}
                              width="100"
                              alt={getListKategoriResult[key].namaKategori}
                            />
                          </td>
                          <td>{getListKategoriResult[key].namaKategori}</td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/Kategori/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>

                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() =>
                                this.removeData(
                                  getListKategoriResult[key].image,
                                  key
                                )
                              }
                            >
                              <i className="nc-icon nc-basket"></i> Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getListKategoriLoading ? (
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListKategoriError ? (
                      <tr>
                        <td colSpan="3" align="center">
                          {getListKategoriError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="3" align="center">
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
  getListKategoriLoading: state.KategoriReducer.getListKategoriLoading,
  getListKategoriResult: state.KategoriReducer.getListKategoriResult,
  getListKategoriError: state.KategoriReducer.getListKategoriError,

  deleteKategoriLoading: state.KategoriReducer.deleteKategoriLoading,
  deleteKategoriResult: state.KategoriReducer.deleteKategoriResult,
  deleteKategoriError: state.KategoriReducer.deleteKategoriError,
});

export default connect(mapStateToProps, null)(ListKategori);
