import { tambahKategori } from "actions/KategoriAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import DefaultImage from "../../assets/img/default-image.jpg";

class TambahKategori extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: DefaultImage,
      imageToDB: false,
      namaKategori: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(gambar),
        imageToDB: gambar,
      });
    }
  };

  handleSubmit = (event) => {
    const { imageToDB, namaKategori } = this.state;
    event.preventDefault();
    if (imageToDB && namaKategori) {
      //proses lanjut ke action firebase
      this.props.dispatch(tambahKategori(this.state));
    } else {
      //alert
      swal(
        "Failed!",
        "Maaf Nama Kategori dan Logo Kategori harus diisi",
        "error"
      );
    }
  };

  componentDidUpdate(prevProps) {
    const { tambahKategoriResult } = this.props;

    if (
      tambahKategoriResult &&
      prevProps.tambahKategoriResult !== tambahKategoriResult
    ) {
      swal("Sukses", "Kategori Sukses Dibuat", "success");
      this.props.history.push("/admin/Kategori");
    }
  }

  render() {
    const { image, namaKategori } = this.state;
    const { tambahKategoriLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/Kategori" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Tambah Kategori</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <img src={image} width="200" alt="Logo Kategori" />
                  </Col>
                </Row>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Logo Kategori</label>
                        <Input
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Kategori</label>
                        <Input
                          type="text"
                          value={namaKategori}
                          name="namaKategori"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {tambahKategoriLoading ? (
                        <Button color="primary" type="submit" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <Button color="primary" type="submit">
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
  tambahKategoriLoading: state.KategoriReducer.tambahKategoriLoading,
  tambahKategoriResult: state.KategoriReducer.tambahKategoriResult,
  tambahKategoriError: state.KategoriReducer.tambahKategoriError,
});

export default connect(mapStateToProps, null)(TambahKategori);
