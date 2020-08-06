import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import {
  Row,
} from "reactstrap";

import PicReporteComponent from "../../../components/pic/PicReporteComponent";
import constantes from "../../../util/Constantes.js";

import {

  doughnutChartData,
} from "../../../data/charts";
import { Colxx } from "../../../components/common/CustomBootstrap";

class Reportes extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicReporteComponent
              titulo={"Reporte Rutas Aprendizaje"}
              reporte={ constantes.urlServer + constantes.servicios.reporte_Rutas}
              filtros={{}}
            />
          </Colxx>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
          <PicReporteComponent
              titulo={"Reporte Cuestionarios"}
              reporte={ constantes.urlServer + constantes.servicios.reporte_UsuarioC}
              filtros={{}}
            />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicReporteComponent
              titulo={"Reporte preguntas sección I"}
              reporte={ constantes.urlServer + constantes.servicios.reporte_Cuestionario}
              filtros={{name : "Reporte preguntas seccion I",seccion: "I"}}            />
          </Colxx>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicReporteComponent
              titulo={
                "Reporte preguntas sección II"
              }
              reporte={ constantes.urlServer + constantes.servicios.reporte_Cuestionario}
              filtros={{name :"Reporte preguntas seccion II",seccion: "II"}}            />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicReporteComponent
              titulo={"Reporte preguntas sección III"}
              reporte={ constantes.urlServer + constantes.servicios.reporte_Cuestionario}
              filtros={{name : "Reporte preguntas seccion III",seccion: "III"}}            />
          </Colxx>
        </Row>
        
      </Fragment>
    );
  }
}
export default injectIntl(Reportes);
