import React, { Fragment, useState, useEffect, useReducer } from "react";
import { Card, CardBody, Modal,
  ModalHeader,
  ModalBody,} from "reactstrap";
import { Wizard, Steps, Step } from 'react-albus';
import { BottomNavigation } from "../wizard/BottomNavigation";
import { TopNavigation } from "../wizard/TopNavigation";
import PicPreguntaComponente from "./PicPreguntaComponente";
import preguntasSeccionII from "../../data/pic/preguntasSeccionII";
import PicInstruccionComponente from "../../components/pic/PicInstruccionComponente";
import PicFinalSeccionComponente from "../../components/pic/PicFinalSeccionComponente";

export default function PicSeccionPreguntasII(props) {


  const [respuestas, setRespuestas] = useState([]);
  const [preguntas, setPreguntas] = useState(props.preguntas);
  const [preguntasCards, setPreguntasCards] = useState(preguntas.map((pregunta) =>
    <Step id={"" + contadorPasos++} desc="" >
      <PicPreguntaComponente
        pregunta={pregunta.encabezadoPregunta}
        descriptor={pregunta.situacionProblema}
        respuestas={pregunta.opcionesRespuestas} />
    </Step>));

  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);
  var contadorPasos = 1
  const [modal, setModal] = useState(false);

  const topNavClick = (stepItem, push) => {
    if (topNavDisabled) {
      return;
    }
    push(stepItem.id);
  }

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
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
      <Card className="mb-5">
        <CardBody className="wizard wizard-default">
          <Wizard>
            <TopNavigation className="justify-content-center" disableNav={true} topNavClick={topNavClick} />
            <Steps>
              <Step id="0" name="Instrucciones" desc="" >
                <PicInstruccionComponente
                  encabezado="Instrucción Sección II"
                  descriptor="Contenido de la instrucción"
                />
              </Step>
              {preguntasCards}
              <Step id="-1" name="Final de Sección" desc="" >
                <PicFinalSeccionComponente
                  encabezado="Final de Sección II"
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
