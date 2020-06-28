import React, { Fragment, useState, useRef } from "react";
import RutaAprendizajeMock from "../../../data/pic/rutaApredizajeMock";
import ReactToPrint from 'react-to-print';
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
import constantes from "../../../util/Constantes.js"
import HttpUtil from '../../../util/HttpService.js'

export default function RutaAprendizajeColaborador(props) {
  const componentRef = useRef();
  return (
    <Fragment>
      <Row>
        <Colxx xxs="8" lg="10" xl="11" className="mb-3">
          <h1>
            Ruta de aprendizaje
        </h1>

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
        <Colxx xxs="12" lg="12" xl="12" className="mb-3">
          <PicRutaAprendizajeComponent rutaAprendizaje={RutaAprendizajeMock} ref={componentRef} />
        </Colxx>
      </Row>



    </Fragment>
  );
}