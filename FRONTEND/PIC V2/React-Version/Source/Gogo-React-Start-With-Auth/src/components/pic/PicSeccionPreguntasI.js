import React, { Component } from "react";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import { Wizard, Steps, Step } from 'react-albus';
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import PicPreguntasCompetenciasI from "../../components/pic/PicPreguntasCompetenciasI";

class PicSeccionPreguntasI extends Component {

  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.topNavClick = this.topNavClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
    }
  }

  topNavClick(stepItem, push) {
    push(stepItem.id);
  }

  onClickNext(goToNext, steps, step) {
    step.isDone = true;
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
            <TopNavigation className="justify-content-center" disableNav={false} topNavClick={this.topNavClick} />
            <Steps>
              <Step id="step1" name="Competencia I" desc="" >
                <PicPreguntasCompetenciasI 
                encabezado="Aplicación derecho TACI" 
                pregunta = "Importancia para mi cargo"/>
              </Step>
              <Step id="step2" name="Competencia II" desc="" >
                <PicPreguntasCompetenciasI 
                encabezado="Comprensión y aplicación del marco regulatorio del proceso de recaudo y administración de cartera." 
                pregunta = "Importancia para mi cargo"/>
              </Step>
              <Step id="step3" name="Competencia III" desc="" >
                <PicPreguntasCompetenciasI 
                encabezado="Conocimiento y aplicación del marco normativo del proceso de recaudación." 
                pregunta = "Importancia para mi cargo"/>
              </Step>
              <Step id="step4" name="Competencia IV" desc="" >
                <PicPreguntasCompetenciasI 
                encabezado="Identificación de conductas objeto de sanción fiscal" 
                pregunta = "Importancia para mi cargo"/>
              </Step>
              <Step id="step5" hideTopNav={true}>
                <div className="wizard-basic-step text-center">
                </div>
              </Step>
            </Steps>
            <BottomNavigation onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel={"Anterior"} nextLabel={"Siguiente"} />
          </Wizard>
        </CardBody>
      </Card>
    );
  }
}

export default PicSeccionPreguntasI;