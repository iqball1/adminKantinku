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
import { updateKategori, getDetailKategori } from "actions/KategoriAction";
import DefaultImage from "../../assets/img/default-image.jpg";


class EditKategori extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      imageLama: DefaultImage,
      image: DefaultImage,
      imageToDB: false,
      namaKategori: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getDetailKategori(this.props.match.params.id));
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImage = (event) => {
    if (event.target.files && event.target.files) {
      const gambar = event.target.files;
      this.setState({
        image: URL.createObjectURL(gambar),
        imageToDB: gambar,
      });
    }
  };

  handleSubmit = (event) => {
    const { namaKategori } = this.state;
    event.preventDefault();
    if (namaKategori) {
      //proses lanjut ke action firebase
      this.props.dispatch(updateKategori(this.state));
    } else {
      //alert
      swal("Failed!", "Maaf Nama Kategori harus diisi", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { updateKategoriResult, getDetailKategoriResult } = this.props;

    if (updateKategoriResult && prevProps.updateKategoriResult !== updateKategoriResult) {
      swal("Sukses", "Kategori Sukses Diupdate", "success");
      this.props.history.push("/admin/Kategori");
    }

    if (getDetailKategoriResult && prevProps.getDetailKategoriResult !== getDetailKategoriResult) {
      this.setState({
        image: getDetailKategoriResult.image,
        namaKategori: getDetailKategoriResult.namaKategori,
        imageLama: getDetailKategoriResult.image,
      })
    }
  }

  render() {
    const { image, namaKategori } = this.state;
    const { updateKategoriLoading } = this.props;
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
                <CardTitle tag="h4">Edit Kategori</CardTitle>
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
                      {updateKategoriLoading ? (
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
  updateKategoriLoading: state.KategoriReducer.updateKategoriLoading,
  updateKategoriResult: state.KategoriReducer.updateKategoriResult,
  updateKategoriError: state.KategoriReducer.updateKategoriError,

  getDetailKategoriLoading: state.KategoriReducer.getDetailKategoriLoading,
  getDetailKategoriResult: state.KategoriReducer.getDetailKategoriResult,
  getDetailKategoriError: state.KategoriReducer.getDetailKategoriError,
});

export default connect(mapStateToProps, null)(EditKategori);
