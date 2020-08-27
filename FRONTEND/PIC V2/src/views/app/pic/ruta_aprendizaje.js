import React, { Fragment, useState, useRef, useEffect } from "react";
import RutaAprendizajeMock from "../../../data/pic/rutaApredizajeMock";
import ReactToPrint from "react-to-print";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
} from "reactstrap";
import PicRutaAprendizajeComponent from "../../../components/pic/PicRutaAprendizajeComponent";
import constantes from "../../../util/Constantes.js";
import HttpUtil from "../../../util/HttpService.js";

export default function RutaAprendizajeColaborador(props) {
  const [componentRef, setComponent] = useState(useRef());
  const [modal, setModal] = useState(false);
  const [ruta, setRuta] = useState({
    listado_competencias: [],
  });

  const [estado_ruta, setEstadoRuta] = useState(false);

  useEffect(() => {
    obtenerRutaAprendizaje();
  }, []);

  const obtenerRutaAprendizaje = () => {
    try {
      setModal(true);
      const url =
        constantes.urlServer + constantes.servicios.obtenerRutaAprendizaje;
      const filtros = {
        email: localStorage.getItem("email"),
      };

      HttpUtil.requestPost(
        url,
        filtros,
        (response) => {
          setRuta(response.data);
          setEstadoRuta(response.data.estado_ruta);
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

  const renderRuta = () => {
    if (estado_ruta == 1) {
      return (
        <PicRutaAprendizajeComponent
          ref={componentRef}
          rutaAprendizaje={ruta}
        />
      );
    } else {
      return (
        <div>
          Tu ruta de aprendizaje actualmente se encuentra en proceso de
          evaluación
        </div>
      );
    }
  };

  const renderBotonImprimirRuta = () => {
    if (estado_ruta == 1) {
      return (
        <ReactToPrint
          trigger={() => <Button color="primary">Imprimir Ruta</Button>}
          content={() => componentRef.current}
        />
      );
    } else {
      return <div></div>;
    }
  };
  return (
    <Fragment>
      <div>
        <Modal isOpen={modal}>
          <ModalHeader>Obteniendo información</ModalHeader>
          <ModalBody>Obteniendo ruta de aprendizaje</ModalBody>
        </Modal>
      </div>
      <Row>
        <Colxx xxs="8" lg="9" xl="10" className="mb-3">
          <h1>Ruta de aprendizaje</h1>
        </Colxx>
        <Colxx xxs="4" lg="3" xl="2" className="mb-3">
          {renderBotonImprimirRuta()}
        </Colxx>
      </Row>

      <Separator className="mb-5" />

      <Row>
        <Colxx xxs="12" lg="12" xl="12" className="mb-3">
          {renderRuta()}
        </Colxx>
      </Row>
    </Fragment>
  );
}
