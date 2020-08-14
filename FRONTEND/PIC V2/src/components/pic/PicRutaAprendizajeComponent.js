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
              <Card style={{ borderRadius: 10, background: "#2b2d45" }}>
                <CardBody>
                  <div
                    style={{
                      borderRadius: "0.25em",
                      border: "1px solid white",
                      padding: "0.5em",
                    }}
                  >
                    <h3
                      style={{
                        color: "white",
                        padding: "0.5em",
                      }}
                    >
                      Representación de colores
                    </h3>
                    <div className="row">
                      <h4
                        style={{
                          color: "#F25C54",
                          margin: "auto",
                          textTransform: "uppercase",
                        }}
                      >
                        No Aprobado
                      </h4>
                      <h4
                        style={{
                          color: "#F0D133",
                          margin: "auto",
                          textTransform: "uppercase",
                        }}
                      >
                        Por cursar
                      </h4>
                      <h4
                        style={{
                          color: "#65B1D9",
                          margin: "auto",
                          textTransform: "uppercase",
                        }}
                      >
                        Inscritos
                      </h4>
                      <h4
                        style={{
                          color: "#63bc5f",
                          margin: "auto",
                          textTransform: "uppercase",
                        }}
                      >
                        Aprobado
                      </h4>
                    </div>
                  </div>

                  <Table responsive style={{ borderRadius: 1 }}>
                    <thead>
                      <tr>
                        <th>
                          <center>
                            <h4 style={{ color: "white" }}>Competencia</h4>
                          </center>
                        </th>
                        <th>
                          <center>
                            <h4 style={{ color: "white" }}>Basico</h4>
                          </center>
                        </th>
                        <th>
                          <center>
                            <h4 style={{ color: "white" }}>Medio</h4>
                          </center>
                        </th>
                        <th>
                          <center>
                            <h4 style={{ color: "white" }}>Alto</h4>
                          </center>
                        </th>
                        <th>
                          <center>
                            <h4 style={{ color: "white" }}>Superior</h4>
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
                                  <p
                                    style={{
                                      color: "white",
                                      textAlign: "justify",
                                      fontSize: "1.3rem",
                                    }}
                                  >
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
