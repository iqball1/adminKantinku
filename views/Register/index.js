import { checkregisterUseer } from "actions/AuthAction";
import { registerUseerUser } from "actions/AuthAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import Logo from "../../assets/img/logoUtama.svg";
import LogoApp from "../../assets/img/logoApp.png";
import { Link } from "react-router-dom";
import { registerUser } from "actions/AuthAction";

class registerUseer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  // componentDidMount() {
  //   this.props.dispatch(registerUser(this.props.history));
  //   }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    if (email && password) {
      const data = {
        email: email,
        status: "admin",
      };
      //action registerUseer
      this.props.dispatch(registerUser(data, password));
    } else {
      swal("Failed", "Maaf Email dan Password Harus Diisi", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { registerUserResult } = this.props;

    if (
      registerUserResult &&
      prevProps.registerUserResult !== registerUserResult
    ) {
      this.props.history.push("/admin/Dashboard");
    }
  }

  render() {
    const { email, password } = this.state;
    const { registerUserLoading } = this.props;
    return (
      <Row className="justify-content-center mt-3">
        <Col md="4">
          <Card>
            <CardHeader tag="h4">Register</CardHeader>
            <CardBody>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <FormGroup>
                  <Label for="email">Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={(event) => this.handleChange(event)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={(event) => this.handleChange(event)}
                  />
                </FormGroup>

                {registerUserLoading ? (
                  <Button color="primary" type="submit" disabled>
                    <Spinner size="sm" color="light" /> Loading
                  </Button>
                ) : (
                  <Button color="primary" type="submit">
                    Register
                  </Button>
                )}
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  registerUserLoading: state.AuthReducer.registerUserLoading,
  registerUserResult: state.AuthReducer.registerUserResult,
  registerUserError: state.AuthReducer.registerUserError,

  checkregisterUserResult: state.AuthReducer.checkregisterUserResult,
});

export default connect(mapStateToProps, null)(registerUseer);
