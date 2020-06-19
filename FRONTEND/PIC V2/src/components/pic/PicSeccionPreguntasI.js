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


export default function PicSeccionPreguntasI(props) {



  const [respuestas, setRespuestas] = useState([]);
  const [competencias, setCompetencias] = useState(props.competencias);
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);
  var contadorPasos = 1
  const [modal, setModal] = useState(false);
  const [competenciasCards, setCompetenciasCards] = useState(competencias.map((competencia) =>
    <Step id={""+contadorPasos++} desc="" >
      <PicPreguntaComponente
        encabezado={competencia.nombreCompetencia}
        pregunta="Importancia para mi rol"
        descriptor={competencia.descripcionCompetencia}
        respuestas={preguntasCompetencias} />
    </Step>));
  const [competenciasCards2, setCompetenciasCards2] = useState(competenciasCards);

  const Test = ({competenciasMapeo, preguntasCompetencias}) => (
    <>
      {competenciasMapeo.map((competencia) =>
    <Step id={""+contadorPasos++} desc="" >
      <PicPreguntaComponente
        encabezado={competencia.nombreCompetencia}
        pregunta="Importancia para mi rol"
        descriptor={competencia.descripcionCompetencia}
        respuestas={preguntasCompetencias} />
    </Step>)}
    </>
  ); 

  const TestII = ({competenciasMapeo, preguntasCompetencias}) => (
    <>
      
    <Step id={contadorPasos++} name={competenciasMapeo[0].nombreCompetencia} desc="" >
      <PicPreguntaComponente
        encabezado={competenciasMapeo[0].nombreCompetencia}
        pregunta="Importancia para mi rol"
        descriptor={competenciasMapeo[0].descripcionCompetencia}
        respuestas={preguntasCompetencias} />
    </Step>)
    </>
  ); 
  useEffect(() => {
    console.log(competencias)
    console.log(contadorPasos)

    //setCompetencias(competenciasListado)
    //props.competencias
    if (competenciasCards === competenciasCards2) {
      console.log("Actualizó View")

      /*setCompetenciasCards(competencias.map((competencia) =>
        <Step id={competencia.nombreCompetencia} name="" desc="" >
          <PicPreguntaComponente
            encabezado={competencia.nombreCompetencia}
            pregunta="Importancia para mi rol"
            descriptor={competencia.descripcionCompetencia}
            respuestas={preguntasCompetencias} />
        </Step>))*/

    }

    if (competencias.length != 0 && competenciasCards !== competenciasCards2) {
      //forceUpdate()
    }
  })
  const topNavClick = (stepItem, push) => {
    if (topNavDisabled) {
      return;
    }
    console.log(stepItem.id)
    push(stepItem.id);
  }

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    console.log(steps)
    console.log(step)
    if (steps.length - 2 <= steps.indexOf(step)) {
      setBottomNavHidden(true)
      setTopNavDisabled(true)
      props.setEstadoPaso(true)
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
            <BottomNavigation onClickNext={onClickNext} onClickPrev={onClickPrev} className={"justify-content-center " + (bottomNavHidden && "invisible")} prevLabel={"Anterior"} nextLabel={"Siguiente"} />
          </Wizard>
        </CardBody>
      </Card>
    </Fragment>

  );

}
