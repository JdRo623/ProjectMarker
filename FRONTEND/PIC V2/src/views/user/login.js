import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { NotificationManager } from "../../components/common/react-notifications";
import { Formik, Form, Field } from "formik";

import { loginUser } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

import logo from '../../assets/img/logo_dian.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "demo@gogo.com",
      password: "gogo123"
    };
  }

  onUserLogin = (values) => {
    if (!this.props.loading) {
      if (values.email !== "" && values.password !== "") {
        this.props.loginUser(values, this.props.history);
      }
    }
  }

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Por favor, ingrese su correo electronico";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Correo Electronico invalido";
    }
    return error;
  }

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Por favor, ingrese su contraseña";
    } else if (value.length < 4) {
      error = "La contraseña debe tener al menos 3 caracteres";
    }
    return error;
  }

  obtenerCargos() {
   /* try {
        const url = constantes.urlServer + constantes.servicios.obtenerCargosPic;
        this.setModal(true);

        HttpUtil.requestPost(url, {},
            (response) => {
                this.setModal(false);
                console.log(response)
                this.setState({ cargoListado: response.data});
                  if( ['Aprobado', 'Aprobada'].indexOf(response.estado) > -1){
                      localStorage.setItem('userInfo', JSON.stringify(response.data));
                      props.history.push("/admin");
                 //     history.push("/admin");
                   //   this.setState({redirect : true, showLoader : false, user : response.data});
            },
            () => {
                this.setModal(false);
                 this.setState({
                     alertTitle : 'Error!',
                     alertMessage : 'Ocurrio un error al autenticarce, por favor intenta de nuevo',
                     alertType : 'error', 
                     showLoader : false
                 });
            });
    } catch (error) {

    }*/

}

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Login Error",
        3000,
        null,
        null,
        ''
      );
    }
  }

  render() {
    const { password, email } = this.state;
    const initialValues = { email, password };

    return (
      <Row className="h-100" >
        <Colxx xxs="12" md="8" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <center>
                <img src={logo} width="200" height="200" />
              </center>
            </div>
            <div className="form-side" >
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
