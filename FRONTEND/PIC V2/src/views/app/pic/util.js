import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import PicSeccionInformacionPersonal from "../../../components/pic/PicSeccionInformacionPersonal";
import { FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import PicEncriptarDesencriptar from "../../../components/pic/PicEncriptarDesencriptar";
import PicCargaDocumentos from "../../../components/pic/PicCargaDocumentos";
import Constantes from "../../../util/Constantes.js";
import Utils from "../../../util/Util";

class Util extends Component {
  constructor(props) {
    super(props);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log(Utils.encryptText(values.name));
  }

  encriptarInformacion(values) {
    console.log(Utils.encryptText(values.name));
  }
  desencriptarInformacion(values) {
    console.log(Utils.decryptText(values.name));
  }

  validateEmail(value) {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  validateName(value) {
    let error;
    if (!value) {
      error = "Please enter your name";
    } else if (value.length < 2) {
      error = "Value must be longer than 2 characters";
    }
    return error;
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" lg="5" xl="4" className="mb-3">
            <PicEncriptarDesencriptar
              handleSubmit={this.encriptarInformacion}
              titulo="Encriptar"
            />
          </Colxx>
          <Colxx xxs="12" lg="12" xl="8" className="mb-3">
            <PicEncriptarDesencriptar
              handleSubmit={this.desencriptarInformacion}
              titulo="Desencriptar"
            />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="12" xl="6" className="mb-3">
            <PicCargaDocumentos
              titulo="Cargar Usuarios Excel"
              servicio={Constantes.servicios.cargarUsuarios}
            />
          </Colxx>
          <Colxx xxs="12" lg="12" xl="6" className="mb-3">
            <PicCargaDocumentos
              titulo="Cargar PIC"
              servicio={Constantes.servicios.registrarActividades}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(Util);
