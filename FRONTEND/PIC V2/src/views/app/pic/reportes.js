import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, CardTitle, CardSubtitle, Button, } from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";

import PicReporteComponent from "../../../components/pic/PicReporteComponent";

import {
  DoughnutChart,
  LineChart,
  PolarAreaChart,
  AreaChart,
  ScatterChart,
  BarChart,
  RadarChart,
  PieChart
} from "../../../components/charts";

import {
  lineChartData,
  polarAreaChartData,
  areaChartData,
  scatterChartData,
  barChartData,barChartDataII,
  radarChartData,
  pieChartData,
  doughnutChartData
} from "../../../data/charts";
import { Colxx } from "../../../components/common/CustomBootstrap";

class Reportes extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicReporteComponent titulo={"Porcentaje de inscritos frente al total de la población"} informacion={doughnutChartData} />
          </Colxx>
          <Colxx xxs="12" lg="6" xl="6" className="mb-3">
            <PicReporteComponent titulo={"Porcentaje de inscritos frente al total de la población."} informacion={doughnutChartData} />
          </Colxx>
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12">
            <Card style={{ borderRadius: 10}}>
              <CardBody>
                <CardTitle>
                  Numero de funcionarios por Compotencia y por nivel
                </CardTitle>
                <Row>
                  <Colxx xxs="12" lg="12" className="mb-5">
                    <CardSubtitle>
                      Organizado por cometencia más avanzada
                    </CardSubtitle>
                    <div className="chart-container">
                      <BarChart shadow data={barChartData} />
                    </div>
                  </Colxx>
                  <Colxx xxs="12" lg="12" className="mb-5">
                    <center>
                      <Button color="primary" >Descargar Reporte</Button>
                    </center>
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12">
            <Card style={{ borderRadius: 10}}>
              <CardBody>
                <CardTitle>
                  Numero de total de inscritos por actividad
                </CardTitle>
                <Row>
                  <Colxx xxs="12" lg="12" className="mb-5">
                    <CardSubtitle>
                      Mostrando los cursos con mayor cantidad de inscritos
                    </CardSubtitle>
                    <div className="chart-container">
                      <BarChart shadow data={barChartDataII} />
                    </div>
                  </Colxx>
                  <Colxx xxs="12" lg="12" className="mb-5">
                    <center>
                      <Button color="primary" >Descargar Reporte</Button>
                    </center>
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}
export default injectIntl(Reportes);

