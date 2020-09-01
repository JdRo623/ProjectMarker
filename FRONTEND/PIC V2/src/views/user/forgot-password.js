import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button,
  Table } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { forgotPassword } from "../../redux/actions";
import { NotificationManager } from "../../components/common/react-notifications";
import { connect } from "react-redux";
import logo from "../../assets/img/estudiando-logo.svg";
import logoDian from "../../assets/img/logo-dian-principal_recortado.png";
import unal from "../../assets/img/unal-logo.png";
import Cookies from "universal-cookie";

import constantes from "../../util/Constantes";
import HttpService from "../../util/HttpService";

const cookies = new Cookies();

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  onForgotPassword = (values) => {
    const email = values.email;
    if (!this.validateEmail(email)) {
      this.setState({ loading: true });
      HttpService.requestPost(
        constantes.urlServer + constantes.servicios.envioCorreo,
        {
          email,
        },
        (response) => {
          if (response.data) {
            this.setState({ loading: false });
            localStorage.clear();

            const cambio_pass = response.data.cambio_pass;
            const email = response.data.email;
            localStorage.setItem("email", email);

            if (cambio_pass) {
              localStorage.setItem("cambio", cambio_pass);
              this.props.history.push("/user/reset");
            }
            /*this.props.loginUser(
              { email: "demo@gogo.com", password: "gogo123" },
              this.props.history
            );*/
            this.setState({ loading: false });
          } else {
            this.setState({ loading: false });
          }
        }
      );
    }
  };

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Por favor, ingrese su correo electronico";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Correo Electronico invalido";
    }
    return error;
  };

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Forgot Password Error",
        3000,
        null,
        null,
        ""
      );
    } else {
      if (!this.props.loading && this.props.forgotUserMail === "success")
        NotificationManager.success(
          "Por favor revisa tu correo",
          "Envio de contraseña maestra exitoso",
          3000,
          null,
          null,
          ""
        );
    }
  }

  render() {
    const { email } = this.state;
    const initialValues = { email };

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
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
              <div >
                <p className="text-default  h2">
                  ¿Necesitas cambiar tu contraseña? Tranquilo{" "}
                </p>
                <p className="text-default  mb-0">
                  Utilice su correo electrónico para restablecer su contraseña{" "}
                </p>
              </div>
              {/* <CardTitle className="mb-4">
                <IntlMessages id="user.forgot-password" />
              </CardTitle> */}

              <Formik
                initialValues={initialValues}
                onSubmit={this.onForgotPassword}
              >
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group">
                      <Label>
                        <IntlMessages id="user.email" />
                      </Label>
                      <Field
                        className="form-control"
                        name="email"
                        placeholder="funcionario@correo.com"
                        validate={this.validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>

                    <div className="d-flex justify-content-between align-items-center">
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${
                          this.props.loading ? "show-spinner" : ""
                        }`}
                        size="lg"
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
  const { forgotUserMail, loading, error } = authUser;
  return { forgotUserMail, loading, error };
};

export default connect(mapStateToProps, {
  forgotPassword,
})(ForgotPassword);
