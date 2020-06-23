import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";

import { servicePath } from "../../../constants/defaultValues";

import RutaAprendizajeMock from "../../../data/pic/rutaApredizajeMock";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";

import PicRutaAprendizajeComponent from "../../../components/pic/PicRutaAprendizajeComponent";
import constantes from "../../../util/Constantes.js"
import HttpUtil from '../../../util/HttpService.js'

export default function RutaAprendizajeColaborador(props) {
  return (
    <Fragment>
      <PicRutaAprendizajeComponent rutaAprendizaje ={RutaAprendizajeMock}/>
    </Fragment>
  );
}