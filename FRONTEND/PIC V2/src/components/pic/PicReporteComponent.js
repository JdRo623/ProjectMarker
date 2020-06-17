import React, { Fragment, useState, useEffect } from "react";
import {

    AvRadio,
} from "availity-reactstrap-validation";
import { Colxx, Separator } from "../common/CustomBootstrap";
import { Row, Card, CardBody, CardTitle, CardSubtitle, CardFooter, Button, } from "reactstrap";
import
DoughnutChart
    from "../charts/Doughnut";

import IntlMessages from "../../helpers/IntlMessages";
import constantes from "../../util/Constantes.js"
import HttpUtil from '../../util/HttpService.js'

export default function PicReporteComponent(props) {
    const [listItems, setListItems] = useState(null);

    useEffect(() => {
        console.log(props.respuestas)
        if (props.respuestas && listItems == null)
            setListItems(props.respuestas.map((respuesta) =>
                <AvRadio customInput label={respuesta.enunciadoRespuesta} value={respuesta.id} />
            ))
    })
    return (
        <Fragment>
            <Row className="mb-4">
                <Colxx xxs="6">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id=" " />
                                Colaboradores por realizar cuestionario
                            </CardTitle>
                            <Row>
                                <Colxx xxs="12" lg="12" className="mb-5">
                                    <CardSubtitle>
                                        <IntlMessages id=" " />
                                    </CardSubtitle>
                                    <div className="chart-container">
                                        <DoughnutChart data={props.informacion} />
                                    </div>
                                </Colxx>

                            </Row>
                            <Row>
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
    );
};
