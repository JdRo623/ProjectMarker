import React, { Fragment, useState, useEffect, useReducer } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Wizard, Steps, Step } from "react-albus";
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import PicPreguntaComponente from "./PicPreguntaComponente";
import PicInstruccionComponente from "../../components/pic/PicInstruccionComponente";
import PicFinalSeccionComponente from "../../components/pic/PicFinalSeccionComponente";

import competenciasListado from "../../data/pic/competencias";
import preguntasCompetencias from "../../data/pic/preguntasCompetencias";
import constantes from "../../util/Constantes.js";
import HttpUtil from "../../util/HttpService.js";
import { NotificationManager } from "../../components/common/react-notifications";
import InstruccionImg from "../../assets/img/si-inicio.png";
import FinalImg from "../../assets/img/si-final.png";

export default function PicSeccionPreguntasI(props) {
  const [respuestas, setRespuestas] = useState([]);
  const [competencias, setCompetencias] = useState(props.competencias);
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);
  var contadorPasos = 1;
  const [modal, setModal] = useState(false);
  const [respuestaElegida, setRespuestaElegida] = useState("");
  const [competenciaElegida, setCompetenciaElegida] = useState("");

  const [competenciasCards, setCompetenciasCards] = useState(
    competencias.map((competencia) => (
      <Step id={"" + contadorPasos++} desc="">
        <PicPreguntaComponente
          columna="2"
          encabezado={competencia.nombreCompetencia}
          pregunta="Importancia para mi rol"
          descriptor={competencia.descripcionCompetencia}
          setIdElegido={setCompetenciaElegida}
          setElegido={setRespuestaElegida}
          idPregunta={competencia.nombreCompetencia}
          respuestas={preguntasCompetencias}
        />
      </Step>
    ))
  );

  const topNavClick = (stepItem, push) => {
    if (topNavDisabled) {
      return;
    }

    push(stepItem.id);
  };

  const validarSiguiente = (goToNext, steps, step) => {
    if (respuestaElegida == "") {
      switch (step.id) {
        case "0":
          onClickNext(goToNext, steps, step);
          break;
        case "-1":
          onClickNext(goToNext, steps, step);
          break;
        default:
          mostrarMensajeError(
            "Error",
            "Seleccione una respuesta para continuar"
          );
          break;
      }
    } else {
      //actualizarCompetencia
      try {
        setModal(true);
        const url =
          constantes.urlServer + constantes.servicios.actualizarCompetencia;
        const filtros = {
          data: {
            email: localStorage.getItem("email"),
            competencia: competenciaElegida,
            valor_respuesta: respuestaElegida,
            estado_respuesta: "Respondida",
          },
        };

        HttpUtil.requestPost(
          url,
          filtros,
          (response) => {
            setRespuestaElegida("");
            setCompetenciaElegida("");
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
    }
  };
  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 2 <= steps.indexOf(step)) {
      setBottomNavHidden(true);
      setTopNavDisabled(true);
      props.setEstadoPaso();
      // this.setState({ bottomNavHidden: true, topNavDisabled: true });
    }
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    //clickSiguiente(goToNext, step)
    goToNext();
  };

  const onClickPrev = (goToPrev, steps, step) => {
    mostrarMensajeError("Error", "No puede regresar a una pregunta resuelta");
  };

  const clickSiguiente = (goToNext, steps, step) => {
    onClickNext(goToNext, steps, step);
  };
  const handleSubmit = (event, errors, values) => {
    if (errors.length === 0) {
      //submit
    }
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
          <Wizard>
            <br></br>
            <br></br>

            <Steps>
              <Step id="0" name="Instrucciones" desc="">
                <PicInstruccionComponente
                  encabezado="Instrucciones - Sección I"
                  descriptor={
                    <div>
                      <p style={{ fontSize: "1.1rem" }}>
                        ¡Haz un reconocimiento de lo que necesitas para hacer un
                        mejor trabajo en la Entidad!{" "}
                      </p>
                      <img src={InstruccionImg} width="850" height="540" />
                    </div>
                  }
                />
              </Step>

              {competenciasCards}
              <Step id="-1" name="Final de Sección" desc="">
                <PicFinalSeccionComponente
                  encabezado="Finalización - Sección I"
                  descriptor={
                    <div>
                      <p style={{ fontSize: "1.1rem" }}>
                        ¡Ya tienes tu mapa en la mano, ahora vas a sentir la
                        adrenalina de las preguntas para la formulación del PIC!
                      </p>
                      <img src={FinalImg} width="850" height="540" />
                    </div>
                  }
                  pasoSiguiente={props.pasoSiguiente}
                />
              </Step>
            </Steps>
            <BottomNavigation
              flag={true}
              onClickNext={validarSiguiente}
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
