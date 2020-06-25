import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";

import PicReporteComponent from "../../../components/pic/PicReporteComponent";

import {
  lineChartData,
  polarAreaChartData,
  areaChartData,
  scatterChartData,
  barChartData,
  radarChartData,
  pieChartData,
  doughnutChartData
} from "../../../data/charts";
import {
  Row,
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";

class Reportes extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicReporteComponent titulo={"No. total de inscritos por actividad"} informacion={doughnutChartData} />
          </Colxx>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicReporteComponent titulo={"No. de inscritos por competencia y nivel"} informacion={doughnutChartData} />
          </Colxx>
        </Row>
        

      </Fragment>
    )
  }
}
export default injectIntl(Reportes);

