import React, { Fragment, useState, useEffect, useReducer } from "react";
import { Card, CardBody, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Wizard, Steps, Step } from "react-albus";
import { BottomNavigation } from "../wizard/BottomNavigation";
import { TopNavigation } from "../wizard/TopNavigation";
import PicPreguntaComponente from "./PicPreguntaComponente";
import preguntasSeccionIII from "../../data/pic/preguntasSeccionIII";
import PicInstruccionComponente from "../../components/pic/PicInstruccionComponente";
import PicFinalSeccionComponente from "../../components/pic/PicFinalSeccionComponente";
import InstruccionImg from "../../assets/img/siii-inicio.png";
import FinalImg from "../../assets/img/siii-final.png";
import constantes from "../../util/Constantes.js";
import HttpUtil from "../../util/HttpService.js";
import { NotificationManager } from "../../components/common/react-notifications";

export default function PicSeccionPreguntasIII(props) {
  const [respuestas, setRespuestas] = useState([]);
  const [preguntas, setPreguntas] = useState(props.preguntas);
  const [respuestaElegida, setRespuestaElegida] = useState("");
  const [preguntaElegida, setPreguntaElegida] = useState("");

  var contadorPasos = 1;

  const [preguntasCards, setPreguntasCards] = useState(
    preguntas.map((pregunta) => (
      <Step id={"" + contadorPasos++} name="" desc="">
        <PicPreguntaComponente
          seccion= "3"
          columna="2"
          setIdElegido={setPreguntaElegida}
          idPregunta={pregunta.idPregunta}
          pregunta={pregunta.encabezadoPregunta}
          setElegido={setRespuestaElegida}
          descriptor={pregunta.situacionProblema}
          respuestas={pregunta.opcionesRespuestas}
        />
      </Step>
    ))
  );

  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);
  const [modal, setModal] = useState(false);

  const topNavClick = (stepItem, push) => {
    if (topNavDisabled) {
      return;
    }
    push(stepItem.id);
  };

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 2 <= steps.indexOf(step)) {
      setBottomNavHidden(true);
      setTopNavDisabled(true);
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
          constantes.urlServer + constantes.servicios.actualizarPreguntaIII;
        const filtros = {
          data: {
            email: localStorage.getItem("email"),
            id_pregunta: preguntaElegida,
            valor_respuesta: respuestaElegida,
            estado_respuesta: "Respondida",
          },
        };

        HttpUtil.requestPost(
          url,
          filtros,
          (response) => {
            setRespuestaElegida("");
            setPreguntaElegida("");
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
                  encabezado="Instrucciones - Sección III"
                  descriptor={
                    <div>
                      <p style={{ fontSize: "1.1rem" }}>
                        ¡El paisaje es hermoso en este punto de la montaña y
                        aprender de tu experiencia es lo más importante para
                        nosotros!
                      </p>
                      <img src={InstruccionImg} width="850" height="540" />
                    </div>
                  }
                />
              </Step>
              {preguntasCards}
              <Step id="-1" name="Final de Sección" desc="">
                <PicFinalSeccionComponente
                  encabezado="Finalización - Sección III"
                  descriptor="Contenido de final de sección"
                  pasoSiguiente={props.pasoSiguiente}
                  descriptor={
                    <div>
                      <p style={{ fontSize: "1.1rem" }}>
                        ¡Qué bien siente el aire puro que recorre la cima de las
                        montañas y la satisfacción del trabajo realizado!
                      </p>
                      <img src={FinalImg} width="850" height="540" />
                    </div>
                  }
                />
              </Step>
            </Steps>
            <BottomNavigation
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
