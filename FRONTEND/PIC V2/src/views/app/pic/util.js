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
    this.encriptarInformacion = this.encriptarInformacion.bind(this);
    this.desencriptarInformacion = this.desencriptarInformacion.bind(this);
  }

  encriptarInformacion(values) {
    console.log(Utils.encryptText(values.name));
  }
  desencriptarInformacion(values) {
    console.log(Utils.decryptText(values.name));
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
              titulo="Usuarios Excel"
              ejemplo={Constantes.servicios.envioPlantillaPlanta}
              servicio={Constantes.servicios.cargarUsuarios}
            />
          </Colxx>
          <Colxx xxs="12" lg="12" xl="6" className="mb-3">
            <PicCargaDocumentos
              ejemplo={Constantes.servicios.envioPlantillaPic}
              titulo="PIC"
              servicio={Constantes.servicios.registrarActividades}
            />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="12" xl="6" className="mb-3">
            <PicCargaDocumentos
              ejemplo={Constantes.servicios.envioPlantillaHomologaciones}
              titulo="Homologaciones"
              servicio={Constantes.servicios.homologacion}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(Util);
