import React, { Fragment, useState, useRef , useEffect } from "react";
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
  const [ruta, setRuta] =useState({
    
    listado_competencias:[]
  })
  useEffect(() => {
    obtenerRutaAprendizaje();
  }, []);


  const obtenerRutaAprendizaje = () => {
    try {
      setModal(true);
      const url = constantes.urlServer + constantes.servicios.obtenerRutaAprendizaje;
      const filtros = {
        email: localStorage.getItem("email"),
      };

      HttpUtil.requestPost(
        url,
        filtros,
        (response) => {
          console.log(response.data);
          setRuta(response.data)
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
          <ModalBody>
            Obteniendo opciones de información personal del servidor
          </ModalBody>
        </Modal>
      </div>
      <Row>
        <Colxx xxs="8" lg="10" xl="11" className="mb-3">
          <h1>Ruta de aprendizaje</h1>
        </Colxx>
        <Colxx xxs="4" lg="2" xl="1" className="mb-3">
          <ReactToPrint
            trigger={() => <Button color="primary">Imprimir Ruta</Button>}
            content={() => componentRef.current}
          />
        </Colxx>
      </Row>

      <Separator className="mb-5" />

      <Row>
        <Colxx xxs="12" lg="12" xl="12" className="mb-3"  >
          <PicRutaAprendizajeComponent
           ref={componentRef}
            rutaAprendizaje={ruta}
          />
        </Colxx>
      </Row>
    </Fragment>
  );
}
