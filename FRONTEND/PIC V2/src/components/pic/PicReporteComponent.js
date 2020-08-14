import React, { Fragment, useState, useEffect } from "react";
import { AvRadio } from "availity-reactstrap-validation";
import { Colxx, Separator } from "../common/CustomBootstrap";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
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
  const [listItems, setListItems] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (props.respuestas && listItems == null)
      setListItems(
        props.respuestas.map((respuesta) => (
          <AvRadio
            customInput
            label={respuesta.enunciadoRespuesta}
            value={respuesta.id}
          />
        ))
      );
  });

  const obtenerPreguntaEspecifica = () => {
    try {
      setModal(true);

      HttpUtil.requestPost(
        props.reporte,
        props.filtros,
        (response) => {
          var temp =
            "data:application/vnd.ms-excel;base64," +
            encodeURIComponent(response.data.documento);
          var download = document.createElement("a");
          download.href = temp;
          download.download = response.data.nombreArchivo;
          document.body.appendChild(download);
          download.click();
          document.body.removeChild(download);
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
          <ModalBody>Obteniendo Pregunta del Servidor.</ModalBody>
        </Modal>
      </div>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card style={{ borderRadius: 10 }}>
            <CardBody>
              <CardTitle>
                <IntlMessages id=" " />
                {props.titulo}
              </CardTitle>
              <Row>
                <Colxx xxs="12" lg="12" className="mb-5">
                  <center>
                    <Button color="primary" onClick={obtenerPreguntaEspecifica}>
                      Descargar Reporte
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
