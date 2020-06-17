import React, { Component } from "react";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import { Wizard, Steps, Step } from 'react-albus';
import { BottomNavigation } from "../wizard/BottomNavigation";
import { TopNavigation } from "../wizard/TopNavigation";
import PicPreguntaComponente from "./PicPreguntaComponente";
import preguntasSeccionII from "../../data/pic/preguntasSeccionII";
import PicInstruccionComponente from "../../components/pic/PicInstruccionComponente";
import PicFinalSeccionComponente from "../../components/pic/PicFinalSeccionComponente";

class PicSeccionPreguntasII extends Component {

  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.topNavClick = this.topNavClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      respuestas: [],
      preguntas: preguntasSeccionII,
      competenciasCards: null,
      bottomNavHidden: false,
      topNavDisabled: false,
    }

    this.preguntasCards = this.state.preguntas.map((preguntas) =>
      <Step id={preguntas.idPregunta} name="" desc="" >
        <PicPreguntaComponente
          pregunta={preguntas.encabezadoPregunta}
          descriptor={preguntas.situacionProblema}
          respuestas={preguntas.opcionesRespuestas} />
      </Step>)
  }

 
  topNavClick(stepItem, push) {
    if (this.state.topNavDisabled) {
      return;
    }
    push(stepItem.id);
  }

  onClickNext(goToNext, steps, step) {
    step.isDone = true;
    if (steps.length - 2 <= steps.indexOf(step)) {
      this.setState({ bottomNavHidden: true, topNavDisabled: true });
    }
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  }

  onClickPrev(goToPrev, steps, step) {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  }
  handleSubmit(event, errors, values) {
    console.log(errors);
    console.log(values);
    if (errors.length === 0) {
      //submit
    }
  }

  render() {

    return (
      <Card className="mb-5">
        <CardBody className="wizard wizard-default">
          <Wizard>
            <TopNavigation className="justify-content-center" disableNav={true} topNavClick={this.topNavClick} />
            <Steps>
            <Step id="0" name="Instrucciones" desc="" >
                <PicInstruccionComponente
                  encabezado="Instrucción Sección II"
                  descriptor="Contenido de la instrucción"
                />
              </Step>
              {this.preguntasCards}
              <Step id="-1" name="Final de Sección" desc="" >
                <PicFinalSeccionComponente
                  encabezado="Final de Sección II"
                  descriptor="Contenido de final de sección"
                  pasoSiguiente = {this.props.pasoSiguiente}

                />
              </Step>
            </Steps>
            <BottomNavigation onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} className={"justify-content-center " + (this.state.bottomNavHidden && "invisible")} prevLabel={"Anterior"} nextLabel={"Siguiente"} />
          </Wizard>
        </CardBody>
      </Card>
    );
  }
}

export default PicSeccionPreguntasII;