import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { NotificationManager } from "../../components/common/react-notifications";
import { Formik, Form, Field } from "formik";

import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

import logo from "../../assets/img/logo_dian.png";
import constantes from "../../util/Constantes";
import HttpService, { cifrar } from "../../util/HttpService";

import Cookies from "universal-cookie";

export default class Cambio extends Component {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
    this.state = {
      loading: false,
      form: {
        email: localStorage.getItem("email"),
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
    const { password, confirmPassword } = this.state.form;
    if (
      !this.validatePassword(password) ||
      !this.validatePassword(confirmPassword)
    ) {
      if (this.state.form.password === this.state.form.confirmPassword) {
        await HttpService.requestPost(
          constantes.urlServer + constantes.servicios.cambioPassword,
          {
            email: this.state.form.email,
            password: cifrar(this.state.form.password),
          }
        )
          .then(async () => {
            localStorage.removeItem("cambio");
            localStorage.setItem("email",this.state.form.email)
            this.setState({ loading: false });
            await this.props.history.push("/app");
          })
          .catch(() => {
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
              <center>
                <img src={logo} width="200" height="200" />
              </center>
            </div>
            <div className="form-side">
              <CardTitle className="mb-4">
                <IntlMessages id="user.reset-title" />
              </CardTitle>
              <Formik onSubmit={this.handleChangePassword}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Label>{this.state.form.email}</Label>
                    <FormGroup className="form-group has-float-label">
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
                    <FormGroup className="form-group has-float-label">
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
