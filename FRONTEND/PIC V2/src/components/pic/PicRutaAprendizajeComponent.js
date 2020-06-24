import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";

import { servicePath } from "../../constants/defaultValues";

import RutaAprendizajeMock from "../../data/pic/rutaApredizajeMock";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";

function collect(props) {
    return { data: props.data };
}
const apiUrl = servicePath + "/cakes/paging";

export default function PicRutaAprendizajeComponent(props) {

    return (
        <Fragment>
            <div className="disable-text-selection">
                <Row>
                    <Colxx xxs="12">
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle>
                                    Ruta de Aprendizaje
                    </CardTitle>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>Competencia</th>
                                            <th>Basico</th>
                                            <th>Medio</th>
                                            <th>Alto</th>
                                            <th>Superior</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr color="white">
                                        </tr>
                                        {props.rutaAprendizaje.listado_competencias.map(competencia => {
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
                                                                    <tr bgcolor={curso.colorEstado}>
                                                                        <td >
                                                                            <font color="#FFFFFF">
                                                                                {curso.nombreCurso}
                                                                            </font>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </center>
                                                    </td>
                                                    <td className="align-middle">
                                                        <center>
                                                            {competencia.listado_cursos_medios.map(curso => {
                                                                return (
                                                                    <tr bgcolor={curso.colorEstado}>
                                                                        <td >
                                                                            <font color="#FFFFFF">
                                                                                {curso.nombreCurso}
                                                                            </font>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </center>
                                                    </td>
                                                    <td className="align-middle">
                                                        <center>
                                                            {competencia.listado_cursos_altos.map(curso => {
                                                                return (
                                                                    <tr bgcolor={curso.colorEstado}>
                                                                        <td >
                                                                            <font color="#FFFFFF">
                                                                                {curso.nombreCurso}
                                                                            </font>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </center>
                                                    </td>
                                                    <td className="align-middle">
                                                        <center>
                                                            {competencia.listado_cursos_superiores.map(curso => {
                                                                return (
                                                                    <tr bgcolor={curso.colorEstado}>
                                                                        <td >
                                                                            <font color="#FFFFFF">
                                                                                {curso.nombreCurso}
                                                                            </font>
                                                                        </td>
                                                                    </tr>
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