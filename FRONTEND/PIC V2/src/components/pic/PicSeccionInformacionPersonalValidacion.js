import React, { Fragment, useState } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,

} from "reactstrap";
import { Wizard, Steps, Step } from "react-albus";
import { BottomNavigation } from "../wizard/BottomNavigation";
import PicInformacionPersonalColaboradorFormUltimate from "./PicInformacionPersonalColaboradorFormUltimate";
import PicColaboradorConfirmacionCard from "./PicColaboradorConfirmacionCard";
import PicInstruccionComponente from "./PicInstruccionComponente";
import PicFinalSeccionComponente from "./PicFinalSeccionComponente";
import constantes from "../../util/Constantes.js";
import HttpUtil from "../../util/HttpService.js";
import { NotificationManager } from "../common/react-notifications";
import InstruccionImg from "../../assets/img/instrucciones-i.png";
import BienvenidosImg from "../../assets/img/bienvenidos-i.png";
import AntesImg from "../../assets/img/antes.png";
import InstruccionInfoPersonalImg from "../../assets/img/ip-inicio.png";
import FinalImg from "../../assets/img/ip-final.png";
import { Picture } from "react-responsive-picture";

export default function PicSeccionInformacionPersonal(props) {
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);
  const [modal, setModal] = useState(false);

  const [cargoListado, setCargoListado] = useState([]);

  const [listados, setListados] = useState({
    seccionales: [],
    subprocesos: [],
    gits: [],
  });

  const [cargoSeleccionado, setCargoSeleccionado] = useState("");
  const [seccionalSeleccionada, setSeccionalSeleccionada] = useState("");
  const [subprocesoSeleccionado, setSubprocesoSeleccionado] = useState("");
  const [coordinacionSeleccionado, setCoordinacionSeleccionado] = useState("");

  const [infoValidada, SetInfoValidada] = useState(null);

  const [valorActualizacion, SetValorActualizacion] = useState(null);

  const obtenerCargos = (goToNext, steps, step) => {
    try {
      setModal(true);
      const url = constantes.urlServer + constantes.servicios.obtenerCargosPic;
      HttpUtil.requestPost(
        url,
        {},
        (response) => {
          setCargoListado(response.data);
          onClickNext(goToNext, steps, step);
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

  const obtenerSeccionales = () => {
    try {
      setModal(true);
      setSubprocesoSeleccionado("");
      setCoordinacionSeleccionado("");
      const url =
        constantes.urlServer + constantes.servicios.obtenerSeccionales;
      HttpUtil.requestPost(
        url,
        {},
        (response) => {
          setListados({
            seccionales: response.data,
            subprocesos: [],
            gits: [],
          });
          // onClickNext(goToNext, steps, step);
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
  const obtenerSubdireccionSeccional = (seccional) => {
    try {
      setCoordinacionSeleccionado("");
      setModal(true);
      const url =
        constantes.urlServer + constantes.servicios.subdireccionSeccional;
      const filtros = {
        seccional: seccional,
      };

      HttpUtil.requestPost(
        url,
        filtros,
        (response) => {
          setListados({
            seccionales: listados.seccionales,
            subprocesos: response.data,
            gits: [],
          });
          //setSubprocesoListado(response.data);
          // onClickNext(goToNext, steps, step);
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
  const obtenerCoordinacionesSeccional = (subdireccion) => {
    try {
      const url =
        constantes.urlServer + constantes.servicios.coordinacionesSeccional;
      setModal(true);
      const filtros = {
        seccional: subdireccion,
      };

      HttpUtil.requestPost(
        url,
        filtros,
        (response) => {
          setListados({
            seccionales: listados.seccionales,
            subprocesos: listados.subprocesos,
            gits: response.data,
          });
          //setCoordinacionesListado(response.data);
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

  const enviarInformacionPersonal = (goToNext, steps, step) => {
    try {
      var url = "";
      if (props.pruebas) {
        url = constantes.urlServer + constantes.servicios.CuestionarioConsulta;
      } else {
        url = constantes.urlServer + constantes.servicios.cuestionario;
      }
      setModal(true);
      const filtros = {
        email: localStorage.getItem("email"),
        seccional: seccionalSeleccionada,
        coordinacion: coordinacionSeleccionado,
        rol: cargoSeleccionado,
        subgrupo: subprocesoSeleccionado,
      };

      HttpUtil.requestPost(
        url,
        filtros,
        (response) => {
          props.setEstadoPaso(true);
          props.setCuestionario(response.data);
          onClickNext(goToNext, steps, step);
          //window.location.reload();
          setModal(false);
        },
        () => {
          setModal(false);
        }
      );
    } catch (error) {
      setModal(true);
    }
  };

  const topNavClick = (stepItem, push) => {
    if (topNavDisabled) {
      return;
    }
    push(stepItem.id);
  };

  const mostrarMensajeError = (tittle, message) => {
    NotificationManager.error(
      message,
      tittle,
      3000,
      () => {
        alert("callback");
      },
      null,
      "filled"
    );
  };
  const clickSiguiente = (goToNext, steps, step) => {
    switch (step.id) {
      case "0":
        onClickNext(goToNext, steps, step);
        break;
      case "1":
        onClickNext(goToNext, steps, step);
        break;
      case "2":
        onClickNext(goToNext, steps, step);
        break;
      case "3":
        obtenerCargos(goToNext, steps, step);
        break;
      case "4":          
        if (cargoSeleccionado == "") {
          mostrarMensajeError(
            "Error",
            "Por favor seleccione un Cargo para continuar."
          );
        }else if (seccionalSeleccionada == "") {
          mostrarMensajeError(
            "Error",
            "Por favor seleccione una Secional o Dirección para continuar."
          );
        } else  if (subprocesoSeleccionado == "") {
          mostrarMensajeError(
            "Error",
            "Por favor seleccione una Subdirección o división para continuar."
          );
        } else if (coordinacionSeleccionado == "") {
          mostrarMensajeError(
            "Error",
            "Por favor seleccione un Grupo interno de trabajo, Coordinación o Punto de contacto para continuar."
          );
        } 
        
        else {
          enviarInformacionPersonal(goToNext, steps, step);
        }
        break;
     
      default:
        onClickNext(goToNext, steps, step);
        break;
    }
  };

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 2 <= steps.indexOf(step)) {
      setBottomNavHidden(true);
      setTopNavDisabled(true);
      props.pasoSiguiente();
    }
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const hStyle = { color: "#191b32" };

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
      <Card className="mb-5" style={{ borderRadius: 10 }}>
        <CardBody className="wizard wizard-default">
          <br></br>
          <br></br>

          <Wizard>
            <Steps>
              <Step id="0" name="Instrucciones" desc="">
                <PicInstruccionComponente
                  encabezado="Instrucciones"
                  descriptor={
                    <div>
                      <p style={{ fontSize: "1.1rem" }}>
                        ¡Es el momento de calentar los músculos para iniciar el
                        camino a la construcción de tu rumbo y el de tu país!
                      </p>
                      <img src={InstruccionImg} width="850" height="540" />
                    </div>
                  }
                />
              </Step>
              <Step id="1" name="Instrucciones" desc="">
                <PicInstruccionComponente
                  encabezado="Bienvenidos"
                  descriptor={
                    <div>
                      <p style={{ fontSize: "1.1rem" }}>
                        Gracias, ¡Con tu valioso compromiso somos una mejor
                        Dirección de Impuestos y Aduanas Nacionales!
                      </p>
                      <img src={BienvenidosImg} width="850" height="540" />
                    </div>
                  }
                />
              </Step>
              <Step id="2" name="Instrucciones" desc="">
                <PicInstruccionComponente
                  encabezado="¡Hoy sentirás una experiencia única en tu Entidad!"
                  descriptor={
                    <div>
                      <img src={AntesImg} width="850" height="540" />
                    </div>
                  }
                />
              </Step>
              <Step id="3" name="Instrucciones" desc="">
                <PicInstruccionComponente
                  encabezado="Instrucciones - Información personal"
                  descriptor={
                    <div>
                      <p>
                        ¡Estás a punto de iniciar este viaje, empecemos esta
                        experiencia!
                      </p>
                      <img
                        src={InstruccionInfoPersonalImg}
                        width="850"
                        height="540"
                      />
                    </div>
                  }
                />
              </Step>
              <Step id="4" name="" desc="">
                <PicInformacionPersonalColaboradorFormUltimate
                  encabezado="Indique su información personal"
                  elegido={cargoSeleccionado}
                  setCargoElegido={setCargoSeleccionado}
                  setSeccionalElegido={setSeccionalSeleccionada}
                  setSubdireccionElegido={setSubprocesoSeleccionado}
                  setGITElegido={setCoordinacionSeleccionado}
                  obtenerSeccionales={obtenerSeccionales}
                  obtenerSubdireccionSeccional={obtenerSubdireccionSeccional}
                  obtenerCoordinacionesSeccional={
                    obtenerCoordinacionesSeccional
                  }
                  cargos={cargoListado}
                  SetValorActualizacion={SetValorActualizacion}
                  listados={listados}
                />
              </Step>
              <Step id="5" name="Final de Sección" desc="">
                <PicFinalSeccionComponente
                  encabezado="Finalización - Información Personal"
                  descriptor={
                    <div>
                      <p>
                        ¡Es momento de que alistemos todo lo que necesitamos
                        para llegar a la cima!
                      </p>
                      <img src={FinalImg} width="850" height="540" />
                    </div>
                  }
                  pasoSiguiente={props.pasoSiguiente}
                />
              </Step>
            </Steps>
            <BottomNavigation
              onClickNext={clickSiguiente}
              onClickPrev={onClickPrev}
              className={
                "justify-content-center " + (bottomNavHidden && "invisible")
              }
              prevLabel={"Anterior"}
              nextLabel={"Siguiente"}
            />
          </Wizard>
        </CardBody>
      </Card>
    </Fragment>
  );
}
