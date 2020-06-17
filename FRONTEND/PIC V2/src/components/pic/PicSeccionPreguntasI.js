import React, { Fragment, useState, useEffect, useReducer } from "react";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import { Wizard, Steps, Step } from 'react-albus';
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import PicPreguntaComponente from "./PicPreguntaComponente";
import PicInstruccionComponente from "../../components/pic/PicInstruccionComponente";
import PicFinalSeccionComponente from "../../components/pic/PicFinalSeccionComponente";

import competenciasListado from "../../data/pic/competencias";
import preguntasCompetencias from "../../data/pic/preguntasCompetencias";

export default function PicSeccionPreguntasI(props) {



  const [respuestas, setRespuestas] = useState([]);
  const [competencias, setCompetencias] = useState(props.competencias);
  const [competenciasCards, setCompetenciasCards] = useState(<Step id="1"></Step>);
  const [competenciasCards2, setCompetenciasCards2] = useState(competenciasCards);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);
  const [modificado, setModificado] = useState(false);


  useEffect(() => {
    console.log(competencias)
    console.log(competencias.length != 0)
    console.log(competencias.length != 0 && competenciasCards === competenciasCards2)
    // console.log(modificado)
    if (competencias.length == 0) {
      setCompetencias(props.competencias)

    }
    if (competencias.length != 0 && competenciasCards === competenciasCards2) {
      setCompetenciasCards(props.competencias.map((competencia) =>
        <Step id={competencia.idCompetencia} name="" desc="" >
          <PicPreguntaComponente
            encabezado={competencia.nombreCompetencia}
            pregunta="Importancia para mi rol"
            descriptor={competencia.descripcionCompetencia}
            respuestas={preguntasCompetencias} />
        </Step>))
    }

    if (competencias.length != 0 && competenciasCards !== competenciasCards2) {
      forceUpdate()
    }


  })
  /* componentDidMount() {
     this.setState({ competencias: [] })
     console.log(this.props.competencias)
     //Consulta servicio web
     /*this.setState({ respuestas: preguntasCompetencias })
     this.setState({ competencias: competenciasListado })
 
 
   }
   componentDidUpdate() {
     if (this.state.competenciasCards == null)
       this.setState({
         competenciasCards: this.state.competencias.map((competencia) =>
           <Step id={competencia.idCompetencia} name="" desc="" >
             <PicPreguntaComponente
               encabezado={competencia.nombreCompetencia}
               pregunta="Importancia para mi rol"
               descriptor={competencia.descripcionCompetencia}
               respuestas={preguntasCompetencias} />
           </Step>
         )
       })
     /* if(this.state.competenciasCards == null)
      this.setState({
        competenciasCards: 
      })
   }*/

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
      // this.setState({ bottomNavHidden: true, topNavDisabled: true });
    }
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    //clickSiguiente(goToNext, step)
    //        goToNext();
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
    <Card className="mb-5">
      <CardBody className="wizard wizard-default">
        <Wizard>
          <TopNavigation className="justify-content-center" disableNav={true} topNavClick={topNavClick} />
          <Steps>
            <Step id="0" name="Instrucciones" desc="" >
              <PicInstruccionComponente
                encabezado="Instrucción Sección I"
                descriptor="Contenido de la instrucción"
              />
            </Step>
            {competenciasCards}
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
  );

}
