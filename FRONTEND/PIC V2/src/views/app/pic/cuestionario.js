import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Modal,
  ModalHeader,
  ModalBody,
  TabContent,
  TabPane,
  Badge,
  CardTitle,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import PicColaboradorCard from "../../../components/pic/PicColaboradorCard";
import PicSeccionInformacionPersonal from "../../../components/pic/PicSeccionInformacionPersonal";

import PicSeccionPreguntasI from "../../../components/pic/PicSeccionPreguntasI";
import PicSeccionPreguntasII from "../../../components/pic/PicSeccionPreguntasII";
import PicSeccionPreguntasIII from "../../../components/pic/PicSeccionPreguntasIII";
import constantes from "../../../util/Constantes.js"
import HttpUtil from '../../../util/HttpService.js'


export default function Cuestionario(props) {
  const [activeTab, setActiveTab] = useState("1");
  const [totalPasos, setTotalPasos] = useState("4");
  const [cuestionarioUsuario, setCuestionario] = useState({ listado_competencias: [] });
  const [informacionPersonalCompleto, setInformacionPersonalCompleto] = useState(false);
  const [seccionPreguntasICompleto, setSeccionPreguntasICompleto] = useState(false);
  const [seccionPreguntasIICompleto, setSeccionPreguntasIICompleto] = useState(false);
  const [modal, setModal] = useState(false);
  const [preguntas, setPreguntas] = useState([]);
  const [preguntasIII, setPreguntasIII] = useState([]);

  const toggleTab = (tab) => {
    console.log(tab)
    if (activeTab !== tab) {
      setActiveTab(
        tab
      );
    }
  }

  useEffect(() => {
    obtenerCuestionario()
  }, []);

  const pasoSiguiente = () => {
    switch (activeTab) {
      case "1":
        toggleTab("2")
        break;
      case "2":
        toggleTab("3")
        break;
      case "3":
        toggleTab("4")
        break;
      case "4":
        break;
      default:
        break;
    }
  }

  const obtenerCuestionario = () => {

  }
  const PreguntasSeccionIElement = () => (
    <PicSeccionPreguntasI
      setEstadoPaso={obtenerInformacionPregunta}
      competencias={cuestionarioUsuario.listado_competencias}
      pasoSiguiente={pasoSiguiente} />
  )
  const PreguntasSeccionIIElement = () => (
    <PicSeccionPreguntasII
      preguntas={preguntas}
      pasoSiguiente={obtenerInformacionPreguntaIII} />
  )

  const PreguntasSeccionIIIElement = () => (
    <PicSeccionPreguntasIII
      preguntas={preguntasIII}
      pasoSiguiente={pasoSiguiente} />
  )

  const obtenerInformacionPregunta = () => {
    try {
      setModal(true);
      const url = constantes.urlServer + constantes.servicios.buscarPreguntasPorIDCuestionario;
      const filtros = {
        cuestionario: true,
        preguntas_obtener: cuestionarioUsuario.listado_preguntas
      }

      HttpUtil.requestPost(url, filtros,
        (response) => {
          console.log(response.data)
          setPreguntas(response.data)
          toggleTab("3")
          setSeccionPreguntasICompleto(true)
          setModal(false);
        },
        () => {
          setModal(false);
        });
    } catch (error) {
      setModal(false);
    }

  }

  const obtenerInformacionPreguntaIII = () => {
    try {
      setModal(true);
      const url = constantes.urlServer + constantes.servicios.obtenerPreguntasSeccionIII;
      const filtros = {

      }

      HttpUtil.requestPost(url, filtros,
        (response) => {
          console.log(response.data)
          setPreguntasIII(response.data)
          toggleTab("4")
          setSeccionPreguntasIICompleto(true)
          setModal(false);
        },
        () => {
          setModal(false);
        });
    } catch (error) {
      setModal(false);
    }

  }

  return (
    <Fragment>

      <div>
        <Modal isOpen={modal} >
          <ModalHeader>
            Obteniendo información
                    </ModalHeader>
          <ModalBody>
            Obteniendo opciones de información personal del servidor
                    </ModalBody>
        </Modal>
      </div>
      <Row>
        <Colxx xxs="12" lg="12" xl="12" className="mb-3">


          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === "1", "nav-link": true })}
                onClick={() => { toggleTab("1"); }} to="#" location={{}}>
                Información Personal
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === "2", "nav-link": true })}
                onClick={() => { toggleTab("2"); }} to="#" location={{}}>
                Sección I
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "3", "nav-link": true })}
                onClick={() => { toggleTab("3"); }}
                to="#" location={{}}>
                Sección II
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "4", "nav-link": true })}
                to="#" location={{}}>
                Sección III
                </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <PicSeccionInformacionPersonal
                setCuestionario={setCuestionario}
                setEstadoPaso={setInformacionPersonalCompleto}
                pasoSiguiente={pasoSiguiente} />
            </TabPane>
            <TabPane tabId="2">
              {informacionPersonalCompleto ? <PreguntasSeccionIElement /> : null}
            </TabPane>
            <TabPane tabId="3">
              {seccionPreguntasICompleto ? <PreguntasSeccionIIElement /> : null}
            </TabPane>
            <TabPane tabId="4">
              {seccionPreguntasIICompleto ? <PreguntasSeccionIIIElement /> : null}
            </TabPane>
          </TabContent>

        </Colxx>
      </Row>
    </Fragment>
  )
}
