import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";

import { servicePath } from "../../constants/defaultValues";

import RutaAprendizajeMock from "../../data/pic/rutaApredizajeMock";
import PopoverItem from "../../components/common/PopoverItem";
import logo from "../../assets/img/fondo_ruta_pic.png";

function collect(props) {
  return { data: props.data };
}
const apiUrl = servicePath + "/cakes/paging";

class PicRutaAprendizajeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagenFondo: { background: logo },
    };
  }

  render() {
    return (
      <Fragment>
        <div className="disable-text-selection">
          <Row>
            <Colxx xxs="12">
              <Card style={{ borderRadius: 10, background: "#191b32" }}>
                <CardBody>
                  <Table
                    responsive
                    style={{ borderRadius: 10, background: "#191b32" }}
                  >
                    <thead>
                      <tr>
                        <th>
                          <center>
                            <p style={{ color: "#FFFFFF" }}>Competencia</p>
                          </center>
                        </th>
                        <th>
                          <center>
                            <p style={{ color: "#FFFFFF" }}>Basico</p>
                          </center>
                        </th>
                        <th>
                          <center>
                            <p style={{ color: "#FFFFFF" }}>Medio</p>
                          </center>
                        </th>
                        <th>
                          <center>
                            <p style={{ color: "#FFFFFF" }}>Alto</p>
                          </center>
                        </th>
                        <th>
                          <center>
                            <p style={{ color: "#FFFFFF" }}>Superior</p>
                          </center>
                        </th>
                      </tr>
                    </thead>
                  </Table>
                  <Table
                    responsive
                    style={{ borderRadius: 10, background: "#191b32" }}
                  >
                    <thead>
                      <tr>
                        <th>
                          <center>
                            <p style={{ color: "#FFFFFF" }}>Competencia</p>
                          </center>
                        </th>
                        <th>
                          <center>
                            <p style={{ color: "#FFFFFF" }}>Basico</p>
                          </center>
                        </th>
                        <th>
                          <center>
                            <p style={{ color: "#FFFFFF" }}>Medio</p>
                          </center>
                        </th>
                        <th>
                          <center>
                            <p style={{ color: "#FFFFFF" }}>Alto</p>
                          </center>
                        </th>
                        <th>
                          <center>
                            <p style={{ color: "#FFFFFF" }}>Superior</p>
                          </center>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.rutaAprendizaje.listado_competencias.map(
                        (competencia) => {
                          return (
                            <tr>
                              <td className="align-middle">
                                <center>
                                  <p style={{ color: "#FFFFFF" }}>
                                    {competencia.nombreCompetencia}
                                  </p>
                                </center>
                              </td>
                              <td className="align-middle">
                                <center>
                                  {competencia.listado_cursos_basicos.map(
                                    (curso) => {
                                      return (
                                        <PopoverItem
                                          color={curso.colorEstado}
                                          estado={curso.estado}
                                          nombreCurso={curso.nombreCurso}
                                          idCurso={curso.idCurso}
                                        />
                                      );
                                    }
                                  )}
                                </center>
                              </td>
                              <td className="align-middle">
                                <center>
                                  {competencia.listado_cursos_medios.map(
                                    (curso) => {
                                      return (
                                        <PopoverItem
                                          color={curso.colorEstado}
                                          estado={curso.estado}
                                          nombreCurso={curso.nombreCurso}
                                          idCurso={curso.idCurso}
                                        />
                                      );
                                    }
                                  )}
                                </center>
                              </td>
                              <td className="align-middle">
                                <center>
                                  {" "}
                                  {competencia.listado_cursos_altos.map(
                                    (curso) => {
                                      return (
                                        <PopoverItem
                                          color={curso.colorEstado}
                                          estado={curso.estado}
                                          nombreCurso={curso.nombreCurso}
                                          idCurso={curso.idCurso}
                                        />
                                      );
                                    }
                                  )}
                                </center>
                              </td>
                              <td className="align-middle">
                                <center>
                                  {competencia.listado_cursos_superiores.map(
                                    (curso) => {
                                      return (
                                        <PopoverItem
                                          color={curso.colorEstado}
                                          estado={curso.estado}
                                          nombreCurso={curso.nombreCurso}
                                          idCurso={curso.idCurso}
                                        />
                                      );
                                    }
                                  )}
                                </center>
                              </td>
                            </tr>
                          );
                        }
                      )}{" "}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default PicRutaAprendizajeComponent;
