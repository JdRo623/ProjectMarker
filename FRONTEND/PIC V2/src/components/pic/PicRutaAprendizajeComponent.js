import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";

import { servicePath } from "../../constants/defaultValues";

import RutaAprendizajeMock from "../../data/pic/rutaApredizajeMock";
import PopoverItem from "../../components/common/PopoverItem";

function collect(props) {
    return { data: props.data };
}
const apiUrl = servicePath + "/cakes/paging";

class PicRutaAprendizajeComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <div className="disable-text-selection">
                    <Row>
                        <Colxx xxs="12">
                            <Card style={{ borderRadius: 10 }}>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                       
                                            <tr>
                                                <th><center>Competencia</center></th>
                                                <th><center>Basico</center></th>
                                                <th><center>Medio</center></th>
                                                <th><center>Alto</center></th>
                                                <th><center>Superior</center></th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {this.props.rutaAprendizaje.listado_competencias.map(competencia => {
                                                return (
                                                    <tr>
                                                        <td className="align-middle">
                                                            <center>
                                                                {competencia.nombre_competencia}
                                                            </center>
                                                        </td>
                                                        <td className="align-middle">
                                                            <center>
                                                                {competencia.listado_cursos_basicos.map(curso => {
                                                                    return (
                                                                        <PopoverItem color={curso.colorEstado} estado={curso.estado} nombreCurso={curso.nombreCurso} idCurso={curso.idCurso} />
                                                                    )
                                                                })}
                                                            </center>
                                                        </td>
                                                        <td className="align-middle">
                                                            <center>
                                                                {competencia.listado_cursos_medios.map(curso => {
                                                                    return (
                                                                        <PopoverItem color={curso.colorEstado} estado={curso.estado} nombreCurso={curso.nombreCurso} idCurso={curso.idCurso} />
                                                                    )
                                                                })}
                                                            </center>
                                                        </td>
                                                        <td className="align-middle">
                                                            <center> {competencia.listado_cursos_altos.map(curso => {
                                                                return (
                                                                    <PopoverItem color={curso.colorEstado} estado={curso.estado} nombreCurso={curso.nombreCurso} idCurso={curso.idCurso} />

                                                                )
                                                            })}
                                                            </center>

                                                        </td>
                                                        <td className="align-middle">
                                                            <center>
                                                                {competencia.listado_cursos_superiores.map(curso => {
                                                                    return (
                                                                        <PopoverItem color={curso.colorEstado} estado={curso.estado} nombreCurso={curso.nombreCurso} idCurso={curso.idCurso} />

                                                                    )
                                                                })}
                                                            </center>
                                                        </td>
                                                    </tr>
                                                )
                                            })}{" "}

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
