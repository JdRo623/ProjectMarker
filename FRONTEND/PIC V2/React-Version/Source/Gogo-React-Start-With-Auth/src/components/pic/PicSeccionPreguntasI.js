import React, { Component } from "react";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import { Wizard, Steps, Step } from 'react-albus';
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import PicPreguntasCompetenciasI from "../../components/pic/PicPreguntasCompetenciasI";
import competenciasListado from "../../data/pic/competencias";
import preguntasCompetencias from "../../data/pic/preguntasCompetencias";

class PicSeccionPreguntasI extends Component {

  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.topNavClick = this.topNavClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      respuestas: [],
      competencias: competenciasListado,
      competenciasCards: null
    }

    this.competenciasCards = this.state.competencias.map((competencia) =>
      <Step id={competencia.idCompetencia} name="" desc="" >
        <PicPreguntasCompetenciasI
          encabezado={competencia.nombreCompetencia}
          pregunta="Importancia para mi cargo"
          descriptor={competencia.descripcionCompetencia}
          respuestas={preguntasCompetencias} />
      </Step>
    )

  }
  componentDidMount() {
    this.setState({ competencias: [] })

    //Consulta servicio web
    /*this.setState({ respuestas: preguntasCompetencias })
    this.setState({ competencias: competenciasListado })*/


  }
  componentDidUpdate() {
    if(this.state.competenciasCards == null)
    this.setState({competenciasCards: this.state.competencias.map((competencia) =>
      <Step id={competencia.idCompetencia} name="" desc="" >
        <PicPreguntasCompetenciasI
          encabezado={competencia.nombreCompetencia}
          pregunta="Importancia para mi cargo"
          descriptor={competencia.descripcionCompetencia}
          respuestas={preguntasCompetencias} />
      </Step>
    )})
    /* if(this.state.competenciasCards == null)
     this.setState({
       competenciasCards: 
     })*/
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
              {this.competenciasCards}
            </Steps>
            <BottomNavigation onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel={"Anterior"} nextLabel={"Siguiente"} />
          </Wizard>
        </CardBody>
      </Card>
    );
  }
}

export default PicSeccionPreguntasI;