import React, { Fragment, useState, useEffect, useReducer } from "react";
import {
  Card, CardBody, Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Wizard, Steps, Step } from 'react-albus';
import { BottomNavigation } from "../wizard/BottomNavigation";
import { TopNavigation } from "../wizard/TopNavigation";
import PicPreguntaComponente from "./PicPreguntaComponente";
import preguntasSeccionII from "../../data/pic/preguntasSeccionII";
import PicInstruccionComponente from "../../components/pic/PicInstruccionComponente";
import PicFinalSeccionComponente from "../../components/pic/PicFinalSeccionComponente";
import constantes from "../../util/Constantes.js"
import HttpUtil from '../../util/HttpService.js'
import InstruccionImg from '../../assets/img/sii-inicio.png';
import FinalImg from '../../assets/img/sii-final.png';

export default function PicSeccionPreguntasII(props) {

  const [respuestas, setRespuestas] = useState([]);
  //const [preguntas, setPreguntas] = useState(props.preguntas);
  const [preguntas, setPreguntas] = useState(preguntasSeccionII);
  const [respuestaElegida, setRespuestaElegida] = useState("");

  var contadorPasos = 1

  const [preguntasCards, setPreguntasCards] = useState(preguntas.map((pregunta) =>
    <Step id={"" + contadorPasos++} desc="" >
      <PicPreguntaComponente
        pregunta={pregunta.encabezadoPregunta}
        descriptor={pregunta.situacionProblema}
        setElegido={setRespuestaElegida}
        respuestas={pregunta.opcionesRespuestas} />
    </Step>));

  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);
  const [modal, setModal] = useState(false);

  const topNavClick = (stepItem, push) => {
    if (topNavDisabled) {
      return;
    }
    push(stepItem.id);
  }

  useEffect(() => {
    if (preguntas.length == 0) {
      obtenerInformaciónPregunta()
    }
  }, []);

  const obtenerInformaciónPregunta = () => {
    try {
      setModal(true);
      const url = constantes.urlServer + constantes.servicios.buscarPreguntasPorIDCuestionario;
      const filtros = {
        cuestionario: true,
        preguntas_obtener: props.preguntas
      }

      HttpUtil.requestPost(url, filtros,
        (response) => {
          console.log(response.data)
          setPreguntas(response.data)
          setPreguntasCards(preguntas.map((pregunta) =>
            <Step id={"" + contadorPasos++} desc="" >
              <PicPreguntaComponente
                mostrarRespuestaAdicional = {true}
                pregunta={pregunta.encabezadoPregunta}
                descriptor={pregunta.situacionProblema}
                respuestas={pregunta.opcionesRespuestas} />
            </Step>))
          setModal(false);
        },
        () => {
          setModal(false);
        });
    } catch (error) {
      setModal(false);
    }

  }
  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    console.log(steps)
    console.log(step)

    if (steps.length - 2 <= steps.indexOf(step)) {
      setBottomNavHidden(true)
      setTopNavDisabled(true)
    }
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  }

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  }
  const handleSubmit = (event, errors, values) => {
    console.log(errors);
    console.log(values);
    if (errors.length === 0) {
      //submit
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
      <Card className="mb-5" style={{ borderRadius: 10 }}>
        <CardBody className="wizard wizard-default">
          <Wizard>
            <br></br>
            <br></br>

            <Steps>
              <Step id="0" name="Instrucciones" desc="" >
                <PicInstruccionComponente
                  encabezado="Instrucciones - II"
                  descriptor={
                    <div>
                      <p>¿Te das cuenta? ¡Con tu ayuda avanzaremos en la estrategia de transformación organizacional!</p>
                      <img src={InstruccionImg} width='850' height='540' />
                    </div>
                  }
                />
              </Step>
              {preguntasCards}
              <Step id="-1" name="Final de Sección" desc="" >
                <PicFinalSeccionComponente
                  encabezado="Finalización - Sección II"
                  descriptor="Contenido de final de sección"
                  pasoSiguiente={props.pasoSiguiente}
                  descriptor={
                    <div>
                      <p>¡Ahora te acercas cada vez más a la cima!</p>
                      <img src={FinalImg} width='850' height='540' />
                    </div>
                  }
                />
              </Step>
            </Steps>
            <BottomNavigation onClickNext={onClickNext} onClickPrev={onClickPrev} className={"justify-content-center " + (bottomNavHidden && "invisible")} prevLabel={"Anterior"} nextLabel={"Siguiente"} />
          </Wizard>
        </CardBody>
      </Card>
    </Fragment>

  );
}
