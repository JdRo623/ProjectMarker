import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Row, Card, CardBody, Button, Table, CardHeader } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";

import { servicePath } from "../../constants/defaultValues";

import RutaAprendizajeMock from "../../data/pic/rutaApredizajeMock";
import PopoverItem from "../../components/common/PopoverItem";
import logo from "../../assets/img/fondo_ruta_pic.png";

function collect(props) {
  return { data: props.data };
}

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
                <h3
                    style={{
                      borderRadius: "0.25em",
                      color: "white",
                      border: "1px solid white",
                      padding: "0.5em",
                    }}
                  >
                    Representación de colores
                    <h4 style={{ color: "#ffff00" }}>Cursando</h4>
                    <h4 style={{ color: "#ffff00" }}>Reprobado</h4>
                    <h4 style={{ color: "#dc3545" }}>Por Cursar</h4>
                    <h4 style={{ color: "#43cc6f" }}>Aprobado</h4>
                  </h3>
                  <Table
                    responsive
                    style={{ borderRadius: 10, background: "#191b32" }}
                  >
                    <thead>
                      <tr>
                        <th>
                          <center>
                            <h4 style={{ color: "#FFFFFF" }}>Competencia</h4>
                          </center>
                        </th>
                        <th>
                          <center>
                            <h4 style={{ color: "#FFFFFF" }}>Basico</h4>
                          </center>
                        </th>
                        <th>
                          <center>
                            <h4 style={{ color: "#FFFFFF" }}>Medio</h4>
                          </center>
                        </th>
                        <th>
                          <center>
                            <h4 style={{ color: "#FFFFFF" }}>Alto</h4>
                          </center>
                        </th>
                        <th>
                          <center>
                            <h4 style={{ color: "#FFFFFF" }}>Superior</h4>
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
