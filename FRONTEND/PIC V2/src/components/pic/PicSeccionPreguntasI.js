import React, { Fragment, useState, useEffect, useReducer } from "react";
import {
  Card, CardBody, Modal,
  ModalHeader,
  ModalBody, Form, FormGroup, Input, Label
} from "reactstrap";
import { Wizard, Steps, Step } from 'react-albus';
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import PicPreguntaComponente from "./PicPreguntaComponente";
import PicInstruccionComponente from "../../components/pic/PicInstruccionComponente";
import PicFinalSeccionComponente from "../../components/pic/PicFinalSeccionComponente";

import competenciasListado from "../../data/pic/competencias";
import preguntasCompetencias from "../../data/pic/preguntasCompetencias";
import constantes from "../../util/Constantes.js"
import HttpUtil from '../../util/HttpService.js'
import { NotificationManager } from "../../components/common/react-notifications";


export default function PicSeccionPreguntasI(props) {



  const [respuestas, setRespuestas] = useState([]);
  const [competencias, setCompetencias] = useState(props.competencias);
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);
  var contadorPasos = 1
  const [modal, setModal] = useState(false);
  const [respuestaElegida, setRespuestaElegida] = useState("");

  const [competenciasCards, setCompetenciasCards] = useState(competencias.map((competencia) =>
    <Step id={"" + contadorPasos++} desc="" >
      <PicPreguntaComponente
        encabezado={competencia.nombreCompetencia}
        pregunta="Importancia para mi rol"
        descriptor={competencia.descripcionCompetencia}
        setElegido={setRespuestaElegida}
        respuestas={preguntasCompetencias} />
    </Step>));


  const topNavClick = (stepItem, push) => {
    if (topNavDisabled) {
      return;
    }
    console.log(stepItem.id)
    push(stepItem.id);
  }

  const enviarPregunta = (goToNext, steps, step) => {
    console.log(step)
    console.log(steps)

    if (respuestaElegida == "") {
      switch (step.id) {
        case "0":
          onClickNext(goToNext, steps, step)
          break;
        case "-1":
          onClickNext(goToNext, steps, step)
          break;
        default:
          //Mostrar Error
          break;
      }
    } else {
      setRespuestaElegida("")
      //Realziar Consulta
      //Activar al guardar
      onClickNext(goToNext, steps, step)
    }


  }
  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 2 <= steps.indexOf(step)) {
      setBottomNavHidden(true)
      setTopNavDisabled(true)
      props.setEstadoPaso()
      // this.setState({ bottomNavHidden: true, topNavDisabled: true });
    }
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    //clickSiguiente(goToNext, step)
    goToNext();
  }
  

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  }

  const clickSiguiente = (goToNext, steps, step) => {
    onClickNext(goToNext, steps, step)
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
      <Card className="mb-5">
        <CardBody className="wizard wizard-default">
          <Wizard>
            <TopNavigation className="justify-content-center" disableNav={false} topNavClick={topNavClick} />
            <Steps>
              <Step id="0" name="Instrucciones" desc="" >
                <PicInstruccionComponente
                  encabezado="Instrucción Sección I"
                  descriptor="Contenido de la instrucción"
                />
              </Step>

              {competenciasCards
              }
              <Step id="-1" name="Final de Sección" desc="" >
                <PicFinalSeccionComponente
                  encabezado="Final de Sección I"
                  descriptor="Contenido de final de sección"
                  pasoSiguiente={props.pasoSiguiente}
                />
              </Step>
            </Steps>
            <BottomNavigation onClickNext={enviarPregunta} onClickPrev={onClickPrev} className={"justify-content-center " + (bottomNavHidden && "invisible")} prevLabel={"Anterior"} nextLabel={"Siguiente"} />
          </Wizard>
        </CardBody>
      </Card>
    </Fragment>

  );

}
