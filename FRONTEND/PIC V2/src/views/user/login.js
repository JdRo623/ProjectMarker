import React, { Component } from "react";
import {
  Row,
  Card,
  CardTitle,
  Label,
  FormGroup,
  Button,
  Table,
  Col,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { NotificationManager } from "../../components/common/react-notifications";
import { Formik, Form, Field } from "formik";

import { loginUser } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

import logo from "../../assets/img/estudiando-logo.svg";
import logoDian from "../../assets/img/logo-dian-principal_recortado.png";
import unal from "../../assets/img/unal-logo.png";

import constantes from "../../util/Constantes";
import HttpService from "../../util/HttpService";

import Cookies from "universal-cookie";

const cookies = new Cookies();
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      form: {
        email: "",
        password: "",
      },
    };
  }

  onUserLogin = async () => {
    const { email, password } = this.state.form;
    if (!this.validateEmail(email) || !this.validatePassword(password)) {
      this.setState({ loading: true });
      await HttpService.requestPost(
        constantes.urlServer + constantes.servicios.login,
        {
          email,
          password,
        },
        (response) => {
          if (response.data) {
            this.setState({ loading: false });
            localStorage.clear();
            const { token, cambio_pass, email, rol } = response.data;
            localStorage.setItem("email", email);
            if (rol) {
              localStorage.setItem("rol", rol);
            } else {
              localStorage.setItem("rol", 0);
            }
            if (cambio_pass) {
              localStorage.setItem("cambio", cambio_pass);
              this.props.history.push('/user/reset');
            }else{
              cookies.set("token", token, { path: "/" });
              this.props.loginUser(
                { email: "demo@gogo.com", password: "gogo123" },
                this.props.history
              );
            }

            this.setState({ loading: false });
          } else {
            this.setState({ loading: false });
          }
        }
      );
    }
  };

  validateEmail = (value) => {
    let error = null;
    if (!value) {
      error = "Por favor, ingrese su correo electronico";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Correo Electronico invalido";
    }
    return error;
  };

  validatePassword = (value) => {
    let error = null;
    if (!value) {
      error = "Por favor, ingrese su contraseña";
    } else if (value.length < 4) {
      error = "La contraseña debe tener al menos 3 caracteres";
    }
    return error;
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Login Error",
        3000,
        null,
        null,
        ""
      );
    }
  }

  render() {
    return (
      <Row className="h-100">
        <Colxx xxs="15" md="10" className="mx-auto my-auto ">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <Table style={{ height: "100%" }}>
                <tbody>
                  {" "}
                  <tr>
                    {" "}
                    <td className="align-middle">
                      <center>
                        {" "}
                        <img src={logoDian} width="205" height="75" />{" "}
                      </center>
                    </td>{" "}
                  </tr>{" "}
                  <tr>
                    {" "}
                    <td className="align-middle">
                      <center>
                        {" "}
                        <img src={unal} width="200" height="85" />
                      </center>{" "}
                    </td>{" "}
                  </tr>{" "}
                  <tr>
                    {" "}
                    <td className="align-middle">
                      <center>
                        {" "}
                        <img src={logo} width="120" height="120" />
                      </center>{" "}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="form-side">
              <Table style={{ height: "100%" }}>
                <tbody>
                  <tr>
                    <td className="align-middle">
                      {/* <CardTitle className="mb-4">
                        <IntlMessages id="user.login-title" />
                      </CardTitle> */}
                      <Formik onSubmit={this.onUserLogin}>
                        {({ errors, touched }) => (
                          <Form className="av-tooltip tooltip-label-bottom">
                            <FormGroup className="form-group">
                              <Label>
                                <IntlMessages id="user.email" />
                              </Label>
                              <Field
                                className="form-control"
                                name="email"
                                onChange={this.handleChange}
                                value={this.state.form.email}
                              />
                              {errors.email && touched.email && (
                                <div className="invalid-feedback d-block">
                                  {errors.email}
                                </div>
                              )}
                            </FormGroup>
                            <FormGroup className="form-group">
                              <Label>
                                <IntlMessages id="user.password" />
                              </Label>
                              <Field
                                className="form-control"
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.form.password}
                              />
                              {errors.password && touched.password && (
                                <div className="invalid-feedback d-block">
                                  {errors.password}
                                </div>
                              )}
                            </FormGroup>
                            <div className="d-flex justify-content-between align-items-center">
                              <NavLink to={`/user/reset`}>
                                <IntlMessages
                                  id="user.forgot-password-question"
                                  className="text-muted"
                                />
                              </NavLink>
                              <Button
                                color="primary"
                                className={`btn-shadow btn-multiple-state ${
                                  this.state.loading ? "show-spinner" : ""
                                }`}
                                size="lg"
                              >
                                <span className="spinner d-inline-block">
                                  <span className="bounce1" />
                                  <span className="bounce2" />
                                  <span className="bounce3" />
                                </span>
                                <span className="label">
                                  <IntlMessages id="user.login-button" />
                                </span>
                              </Button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser;
  return { user, loading, error };
};

export default connect(mapStateToProps, {
  loginUser,
})(Login);
