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
import PicSeccionInformacionFinal from "../../../components/pic/PicSeccionInformacionFinal";

import PicSeccionPreguntasI from "../../../components/pic/PicSeccionPreguntasI";
import PicSeccionPreguntasII from "../../../components/pic/PicSeccionPreguntasII";
import PicSeccionPreguntasIII from "../../../components/pic/PicSeccionPreguntasIII";
import constantes from "../../../util/Constantes.js";
import HttpUtil from "../../../util/HttpService.js";

export default function Cuestionario(props) {
  const [activeTab, setActiveTab] = useState("1");
  const [totalPasos, setTotalPasos] = useState("4");

  const [cuestionarioUsuario, setCuestionario] = useState({
    listado_competencias: [],
    listado_preguntas_seccion_iii: [],
  });
  const [
    informacionPersonalCompleto,
    setInformacionPersonalCompleto,
  ] = useState(false);
  const [seccionPreguntasICompleto, setSeccionPreguntasICompleto] = useState(
    false
  );
  const [seccionPreguntasIICompleto, setSeccionPreguntasIICompleto] = useState(
    false
  );
  const [seccionPreguntasIIICompleto, setSeccionPreguntasIIICompleto] = useState(
    false
  );
  const [formularioVacio, setFormularioVacio] = useState(false);
  const [modal, setModal] = useState(false);
  const [preguntas, setPreguntas] = useState([]);
  const [competencias, setCompetencias] = useState([]);

  const [preguntasIII, setPreguntasIII] = useState([]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    obtenerCuestionario();
  }, []);

  const InformacionPersonalElement = () => (
    <PicSeccionInformacionPersonal
      setFormularioVacio={setFormularioVacio}
      setInformacionPersonalCompleto={setInformacionPersonalCompleto}
      setCuestionario={setCuestionario}
      setEstadoPaso={setInformacionPersonalCompleto}
      pasoSiguiente={pasoSiguiente}
    />
  );

  const InformacionFinalElement = () => (
    <PicSeccionInformacionPersonal
    />
  );

  const PreguntasSeccionIElement = () => (
    <PicSeccionPreguntasI
      setEstadoPaso={obtenerInformacionPregunta}
      competencias={competencias}
      pasoSiguiente={pasoSiguiente}
    />
  );
  const PreguntasSeccionIIElement = () => (
    <PicSeccionPreguntasII
      preguntas={preguntas}
      pasoSiguiente={obtenerInformacionPreguntaIII}
    />
  );

  const PreguntasSeccionIIIElement = () => (
    <PicSeccionPreguntasIII
      preguntas={preguntasIII}
      pasoSiguiente={pasoSiguiente}
    />
  );

  const obtenerCuestionario = () => {
    try {
      setModal(true);
      const url =
        constantes.urlServer + constantes.servicios.buscarCuestionarioCorreo;
      const filtros = {
        email: localStorage.getItem("email"),
      };

      HttpUtil.requestPost(
        url,
        filtros,
        (response) => {
          console.log(response.data);
          setCuestionario(response.data);
          if (response.data.email) {
            if (response.data.listado_competencias.length == 0) {
              if (response.data.listado_preguntas.length == 0) {
                if (response.data.listado_preguntas_seccion_iii.length == 0) {
                  abrirFinal()
                  //Mostar letrero de Ruta de Aprendizaje
                } else {
                  setSeccionPreguntasIICompleto(true)
                  obtenerInformacionPreguntaIII();
                }
              } else {
                setSeccionPreguntasICompleto(true)
                obtenerInformacionPregunta();

              }
            } else {
              obtenerInformacionCompetencia()
            }
          }else{
            setFormularioVacio(true)
          }
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

  const pasoSiguiente = () => {
    switch (activeTab) {
      case "1":
        toggleTab("2");
        break;
      case "2":
        toggleTab("3");
        break;
      case "3":
        toggleTab("4");
        break;
      case "4":
        break;
      default:
        break;
    }
  };
  const abrirFinal=()=>{
    console.log("Abrir Final")
    setSeccionPreguntasIIICompleto(true)

  }
  const obtenerInformacionCompetencia = () => {
    try {
      setModal(true);
      const url =
        constantes.urlServer +
        constantes.servicios.buscarCompetenciasCuestionario;
      const filtros = {
        email: localStorage.getItem("email"),
      };

      HttpUtil.requestPost(
        url,
        filtros,
        (response) => {
          console.log(response.data);
          setCompetencias(response.data);
          toggleTab("2");
          setInformacionPersonalCompleto(true);
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

  const obtenerInformacionPregunta = () => {
    try {
      setModal(true);
      const url =
        constantes.urlServer +
        constantes.servicios.buscarPreguntasPorIDCuestionario;
      const filtros = {
        email: localStorage.getItem("email"),
      };

      HttpUtil.requestPost(
        url,
        filtros,
        (response) => {
          console.log(response.data);
          setPreguntas(response.data);
          toggleTab("3");
          setSeccionPreguntasICompleto(true);
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

  const obtenerInformacionPreguntaIII = () => {
    try {
      setModal(true);
      console.log(cuestionarioUsuario);

      const url =
        constantes.urlServer + constantes.servicios.obtenerPreguntasSeccionIII;
      const filtros = {
        email: localStorage.getItem("email"),
      };

      HttpUtil.requestPost(
        url,
        filtros,
        (response) => {
          console.log(response.data);
          setPreguntasIII(response.data);
          toggleTab("4");
          setSeccionPreguntasIICompleto(true);
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
        <Colxx xxs="12" lg="12" xl="12" className="mb-3">
          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem></NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "1",
                  "nav-link": true,
                })}
                to="#"
                location={{}}
              >
                Información Personal
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "2",
                  "nav-link": true,
                })}
                to="#"
                location={{}}
              >
                Sección I
              </NavLink>
            </NavItem>
            <NavItem disabled>
              <NavLink
                className={classnames({
                  active: activeTab === "3",
                  "nav-link": true,
                })}
                to="#"
                location={{}}
              >
                Sección II
              </NavLink>
            </NavItem>
            <NavItem disabled>
              <NavLink
                isActive={false}
                className={classnames({
                  active: activeTab === "4",
                  "nav-link": true,
                })}
                to="#"
                location={{}}
              >
                Sección III
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              {formularioVacio ? <InformacionPersonalElement /> : null}
            </TabPane>
            <TabPane tabId="2">
              {informacionPersonalCompleto ? (
                <PreguntasSeccionIElement />
              ) : null}
            </TabPane>
            <TabPane tabId="3">
              {seccionPreguntasICompleto ? <PreguntasSeccionIIElement /> : null}
            </TabPane>
            <TabPane tabId="4">
              {seccionPreguntasIICompleto ? (
                <PreguntasSeccionIIIElement />
              ) : null}
            </TabPane>
            <TabPane tabId="5">
              {seccionPreguntasIIICompleto ? (
                <InformacionFinalElement />
              ) : null}
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
    </Fragment>
  );
}
