import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { NotificationManager } from "../../components/common/react-notifications";
import { Formik, Form, Field } from "formik";
import HttpUtil from '../../util/HttpService.js';
import constantes from "../../util/Constantes.js"
import { loginUser } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onUserLogin = (values) => {
    const infoLogin = {
      correo : values.email,
      secret : values.secret
  }
    if (!this.props.loading) {
      if (values.email !== "" && values.password !== "") {
          const url = constantes.urlServer + constantes.servicios.autenticarAgente;
          HttpUtil.requestPost(url, infoLogin, 
              (response) => { 
                  if( ['Aprobado', 'Aprobada'].indexOf(response.estado) > -1){
                      localStorage.setItem('userInfo', JSON.stringify(response.data));
                 //     history.push("/admin");
                   //   this.setState({redirect : true, showLoader : false, user : response.data});
                  }else{
                    alert("Error al autenticar: "+ response.message);

                     /* this.setState({
                          alertTitle : 'Error al autenticar',
                          alertMessage : response.message,
                          alertType : 'error', 
                          showLoader : false
                      });*/
                  }
              }, 
                () => {

                  alert("Error al autenticar: Ocurrio un error al autenticarce, por favor intenta de nuevo");

                 /* this.setState({
                      alertTitle : 'Error!',
                      alertMessage : 'Ocurrio un error al autenticarce, por favor intenta de nuevo',
                      alertType : 'error', 
                      showLoader : false
                  });*/
              });
        //this.props.loginUser(values, this.props.history);
      }
    }
  }

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Por favor ingresa tu correo";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Correo Electronico invalido";
    }
    return error;
  }

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Por favor ingresa tu contraseña";
    } else if (value.length < 4) {
      error = "La contraseña debe tener más de 3 caracteres";
    }
    return error;
  }

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Error de Inicio de Sesión",
        3000,
        null,
        null,
        ''
      );
    }
  }

  render() {
    const { password, email } = this.state;
    const initialValues = {email,password};

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2"></p>
              <p className="white mb-0">
               
              </p>
            </div>
            <div className="form-side">

              <CardTitle className="mb-4">
                <IntlMessages id="user.login-title" />
              </CardTitle>

              <Formik
                initialValues={initialValues}
                onSubmit={this.onUserLogin}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.email" />
                      </Label>
                      <Field
                        className="form-control"
                        name="email"
                        validate={this.validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.password" />
                      </Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                        validate={this.validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to={`/user/forgot-password`}>
                        <IntlMessages id="user.forgot-password-question" />
                      </NavLink>
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${this.props.loading ? "show-spinner" : ""}`}
                        size="lg"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label"><IntlMessages id="user.login-button" /></span>
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

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(Login);
