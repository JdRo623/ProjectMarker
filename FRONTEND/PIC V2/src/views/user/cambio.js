import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button,   Table
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { NotificationManager } from "../../components/common/react-notifications";
import { Formik, Form, Field } from "formik";

import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { loginUser } from "../../redux/actions";

import constantes from "../../util/Constantes";
import HttpService, { cifrar } from "../../util/HttpService";

import logo from "../../assets/img/estudiando-logo.svg";
import logoDian from "../../assets/img/logo-dian-principal_recortado.png";
import unal from "../../assets/img/unal-logo.png";

import Cookies from "universal-cookie";

class Cambio extends Component {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
    this.state = {
      loading: false,
      form: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
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
  handleChangePassword = async () => {
    this.setState({ loading: true });
    const { email, password, confirmPassword, secretPassword } = this.state.form;

    if (
      !this.validatePassword(password) ||
      !this.validatePassword(confirmPassword) ||
      !this.validatePassword(email) ||
      !this.validatePassword(secretPassword)
    ) {
      if (this.state.form.password === this.state.form.confirmPassword) {
        await HttpService.requestPost(
          constantes.urlServer + constantes.servicios.cambioPassword,
          {
            email: this.state.form.email,
            password: cifrar(this.state.form.password),
            contrasena_maestra: cifrar(this.state.form.secretPassword),
          },
          (response) => {
            if (response.data) {
              if (response.data.correcto) {
                localStorage.removeItem("cambio");
                localStorage.setItem("email", this.state.form.email);
                localStorage.setItem("rol", 0);
                this.setState({ loading: false });
                this.props.loginUser(
                  { email: "demo@gogo.com", password: "gogo123" },
                  this.props.history
                );
                this.props.history.push("/app");
              }
              this.setState({ loading: false });
            } else {
              this.setState({ loading: false });
            }
          }
        )
          .then(async (response) => {})
          .catch(() => {
            console.log("Error");

            this.setState({ loading: false });
          });
      } else {
        NotificationManager.error(
          "La contraseña y la confirmación no coinciden, por favor verifique",
          "Error",
          5000,
          () => {},
          null,
          "filled"
        );
        this.setState({ loading: false });
      }
    } else {
      NotificationManager.error(
        "Valide que los campos de contraseña tengan el formato correcto, por favor",
        "Error",
        5000,
        () => {},
        null,
        "filled"
      );
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="8" className="mx-auto my-auto">
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
              <CardTitle className="mb-4">
                <IntlMessages id="user.reset-title" />
              </CardTitle>
              <Formik onSubmit={this.handleChangePassword}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <h3>!Ya no es necesario utilizar tu contraseña maestra!</h3>
                    <h3> Ingresa solo con tu documento de identidad</h3>
                    <FormGroup className="form-group">
                      <Label>
                        <IntlMessages id="user.email" />
                      </Label>
                      <Field
                        className="form-control"
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.form.email}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group">
                      <Label>
                        <IntlMessages id="user.id-password" />
                      </Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="secretPassword"
                        onChange={this.handleChange}
                        value={this.state.form.secretPassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
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
                    <FormGroup className="form-group">
                      <Label>
                        <IntlMessages id="user.repeat-password" />
                      </Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="confirmPassword"
                        onChange={this.handleChange}
                        value={this.state.form.confirmPassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${
                          this.state.loading ? "show-spinner" : ""
                        }`}
                        size="lg"
                        type="submit"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="user.reset-password-button" />
                        </span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
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
})(Cambio);
