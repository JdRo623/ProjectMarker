import React, { Fragment, useState, useEffect } from "react";
import { AvRadio } from "availity-reactstrap-validation";
import { Colxx, Separator } from "../common/CustomBootstrap";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";
import DoughnutChart from "../charts/Doughnut";

import IntlMessages from "../../helpers/IntlMessages";
import constantes from "../../util/Constantes.js";
import HttpUtil from "../../util/HttpService.js";

export default function PicReporteComponent(props) {
  const [modal, setModal] = useState(false);

  useEffect(() => {

  });

  const obtenerPreguntaEspecifica = () => {
    try {
      setModal(true);
      const url = constantes.urlServer + props.servicio;

      HttpUtil.requestPost(
        url,
        props.filtros,
        (response) => {

          setModal(false);
        },
        () => {
          setModal(false);
        }
      );
    } catch (error) {
      setModal(false);
    }
  };

  return (
    <Fragment>
      <div>
        <Modal isOpen={modal}>
          <ModalHeader>Obteniendo información</ModalHeader>
          <ModalBody>Obteniendo Reporte del Servidor.</ModalBody>
        </Modal>
      </div>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card style={{ borderRadius: 10 }}>
            <CardBody>
              <CardTitle>{props.titulo}</CardTitle>
              <Row>
                <Colxx xxs="12" lg="12" className="mb-5">
                  <center>
                    <Button color="primary" onClick={obtenerPreguntaEspecifica}>
                      {props.nombreBoton}
                    </Button>
                  </center>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </Fragment>
  );
}
