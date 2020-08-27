import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import Constantes from "../../../util/Constantes.js";
import PicCargaDocumentos from "../../../components/pic/PicCargaDocumentos";
import PicCambioEstadoRuta from "../../../components/pic/PicCambioEstadoRuta";

class CambioRutas extends Component {
  state = {
    activeTab: "1",
    totalPasos: "4",
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  pasoSiguiente = () => {
    switch (this.state.activeTab) {
      case "1":
        this.toggleTab("2");
        break;
      case "2":
        this.toggleTab("3");
        break;
      case "3":
        this.toggleTab("4");
        break;
      case "4":
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicCambioEstadoRuta
              titulo="Aprobar visualización de ruta"
              servicio={Constantes.servicios.cambiarEstadoRutas}
              filtros= {{valor : 1}}
              nombreBoton="Aprobar" />
          </Colxx>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicCambioEstadoRuta
              titulo="Ocultar visualización de ruta"
              filtros= {{valor :0}}
              servicio={Constantes.servicios.cambiarEstadoRutas}
              nombreBoton="Ocultar" />
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
export default injectIntl(CambioRutas);
