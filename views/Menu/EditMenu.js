import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import DefaultImage from "../../assets/img/default-image.jpg";
import {
  getDetailMenu,
  updateMenu,
  uploadMenu,
} from "../../actions/MenusAction";
import { getListKategori } from "../../actions/KategoriAction";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

class EditMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      image1: DefaultImage,
      imageToDB1: false,
      imageLama1: false,
      nama: "",
      harga: 0,
      jenis: "",
      ready: true,
      kategori: "",
      keterangan: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(getListKategori());
    this.props.dispatch(getDetailMenu(this.props.match.params.id));
  }

  componentDidUpdate(prevProps) {
    const { uploadMenuResult, updateMenuResult, getDetailMenuResult } =
      this.props;

    if (uploadMenuResult && prevProps.uploadMenuResult !== uploadMenuResult) {
      this.setState({
        [uploadMenuResult.imageToDB]: uploadMenuResult.gambar,
      });

      swal("Sukses", "Gambar Berhasil di Upload", "success");
    }

    if (updateMenuResult && prevProps.updateMenuResult !== updateMenuResult) {
      swal("Sukses", updateMenuResult, "success");
      this.props.history.push("/admin/Menu");
    }

    if (
      getDetailMenuResult &&
      prevProps.getDetailMenuResult !== getDetailMenuResult
    ) {
      this.setState({
        image1: getDetailMenuResult.gambar,
        imageLama1: getDetailMenuResult.gambar,
        nama: getDetailMenuResult.nama,
        harga: getDetailMenuResult.harga,
        jenis: getDetailMenuResult.jenis,
        ready: getDetailMenuResult.ready,
        kategori: getDetailMenuResult.kategori,
        keterangan: getDetailMenuResult.keterangan,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };



  handleImage = (event, imageToDB) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        [event.target.name]: URL.createObjectURL(gambar),
      });

      this.props.dispatch(uploadMenu(gambar, imageToDB));
    }
  };

  handleSubmit = (event) => {
    const { harga, nama, kategori,keterangan, jenis } = this.state;

    event.preventDefault();

    if (
      harga && 
      nama && 
      kategori && 
      keterangan &&
      jenis
      ){

      //action
      this.props.dispatch(updateMenu(this.state));
    } else {
      swal("Failed", "Maaf semua form wajib diisi", "error");
    }
  };


  render() {
    const {
      harga,
      image1,
      imageToDB1,
      jenis,
      kategori,
      keterangan,
      nama,
      ready,
      imageLama1,
    } = this.state;
    const { getListKategoriResult, updateMenuLoading } = this.props;

    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/Menu" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader tag="h4">Edit Menu</CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col>
                          <img src={image1} width="300" alt="Foto Menu" />
                          <FormGroup>
                            <label>Foto Menu </label>
                            <Input
                              type="file"
                              name="image1"
                              onChange={(event) =>
                                this.handleImage(event, "imageToDB1")
                              }
                            />
                          </FormGroup>
                          {image1 !== imageLama1 ? (
                            //selesai upload / proses upload
                            imageToDB1 ? (
                              <p>
                                <i className="nc-icon nc-check-2"></i> Selesai
                                Upload
                              </p>
                            ) : (
                              <p>
                                <i className="nc-icon nc-user-run"></i> Proses
                                Upload
                              </p>
                            )
                          ) : (
                            //belum upload
                            <p>
                              <i className="nc-icon nc-cloud-upload-94"></i>{" "}
                              Belum Upload
                            </p>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Menu</label>
                        <Input
                          type="text"
                          value={nama}
                          name="nama"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Kategori</label>
                            <Input
                              type="select"
                              name="kategori"
                              value={kategori}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value="">--Pilih--</option>
                              {Object.keys(getListKategoriResult).map((key) => (
                                <option value={key} key={key}>
                                  {getListKategoriResult[key].namaKategori}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Keterangan</label>
                            <Input
                              type="text"
                              value={keterangan}
                              name="keterangan"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Harga (Rp.)</label>
                            <Input
                              type="text"
                              value={harga}
                              name="harga"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Jenis</label>
                            <Input
                              type="text"
                              value={jenis}
                              name="jenis"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Ready</label>
                            <Input
                              type="select"
                              name="ready"
                              value={ready}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value={true}>Ada</option>
                              <option value={false}>Kosong</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {updateMenuLoading ? (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                          disabled
                        >
                          <Spinner size="sm" color="light" /> Loading . . .
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                        >
                          Submit
                        </Button>
                      )}
                    </Col>
                  </Row>
                </form>
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

  uploadMenuLoading: state.MenuReducer.uploadMenuLoading,
  uploadMenuResult: state.MenuReducer.uploadMenuResult,
  uploadMenuError: state.MenuReducer.uploadMenuError,

  getDetailMenuLoading: state.MenuReducer.getDetailMenuLoading,
  getDetailMenuResult: state.MenuReducer.getDetailMenuResult,
  getDetailMenuError: state.MenuReducer.getDetailMenuError,

  updateMenuLoading: state.MenuReducer.updateMenuLoading,
  updateMenuResult: state.MenuReducer.updateMenuResult,
  updateMenuError: state.MenuReducer.updateMenuError,
});

export default connect(mapStateToProps, null)(EditMenu);
