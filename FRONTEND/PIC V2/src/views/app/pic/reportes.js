import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";

import PicReporteComponent from "../../../components/pic/PicReporteComponent";
import constantes from "../../../util/Constantes.js";

import { Colxx } from "../../../components/common/CustomBootstrap";

class Reportes extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicReporteComponent
              titulo={"Resultado sobre el estado de las rutas de aprendizaje"}
              reporte={
                constantes.urlServer + constantes.servicios.reporte_Rutas
              }
              filtros={{}}
            />
          </Colxx>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicReporteComponent
              titulo={"Resultados sobre estado de la aplicación del cuestionario"}
              reporte={
                constantes.urlServer + constantes.servicios.reporte_UsuarioC
              }
              filtros={{}}
            />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicReporteComponent
              titulo={"Listado de las Respuestas del cuestionario Sección I"}
              reporte={
                constantes.urlServer +
                constantes.servicios.reporte_Cuestionarioi
              }
              filtros={{ name: "Reporte preguntas seccion I", seccion: "I" }}
            />
          </Colxx>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicReporteComponent
              titulo={"Listado de las Respuestas del cuestionario Sección II"}
              reporte={
                constantes.urlServer +
                constantes.servicios.reporte_Cuestionarioii
              }
              filtros={{ name: "Reporte preguntas seccion II", seccion: "II" }}
            />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicReporteComponent
              titulo={"Listado de las Respuestas del cuestionario Sección III"}
              reporte={
                constantes.urlServer +
                constantes.servicios.reporte_Cuestionarioiii
              }
              filtros={{
                name: "Reporte preguntas seccion III",
                seccion: "III",
              }}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(Reportes);
