import React, { Component } from "react";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import { Wizard, Steps, Step } from 'react-albus';
import { BottomNavigation } from "../wizard/BottomNavigation";
import { TopNavigation } from "../wizard/TopNavigation";
import PicPreguntasCompetenciasI from "./PicPreguntasCompetenciasI";

class PicSeccionPreguntasII extends Component {

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
      respuestas : [
        { "enunciadoRespuesta": "1 [Nada importante]", "value": "1"},
        { "enunciadoRespuesta": "2", "value": "2" },
        { "enunciadoRespuesta": "3", "value": "3"},
        { "enunciadoRespuesta": "4", "value": "4" },
        { "enunciadoRespuesta": "5 [Muy importante]", "value": "5"}
    ],
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
              <Step id="step1" name="Pregunta I" desc="" >
                <PicPreguntasCompetenciasI 
                encabezado="Usted es funcionario de fiscalización y recibe un derecho de petición en el que se relata el caso de una empresa de Bogotá que desde hace dos años venden mercancías de contrabando y no emiten factura por las ventas realizadas." 
                pregunta = "De acuerdo con lo anterior, decide:"/>
              </Step>
              <Step id="step2" name="Pregunta II" desc="" >
                <PicPreguntasCompetenciasI 
                encabezado="Usted es jefe de la unidad de fiscalización y está revisando el caso de una empresa que hizo la declaración de renta del año pasado, la cual evidencia que los ingresos brutos son diferentes a los reportados en la declaración. Usted decide hacer una notificación a la empresa, explicando los hechos de la inexactitud, calculando el valor que debe corregir, el impuesto y las sanciones que debe hacer a la liquidación privada." 
                pregunta = "La notificación que debe realizar es:"/>
              </Step>
              <Step id="step3" name="Pregunta III" desc="" >
                <PicPreguntasCompetenciasI 
                encabezado="Como funcionario de fiscalización revisa el caso de una empresa en el que determina que la retención en la fuente efectuada es mayor a la declarada en el formulario de renta. De lo anterior, usted identifica una conducta sancionable del contribuyente, por lo cual procede aplicar la sanción correspondiente." 
                pregunta = "De acuerdo con lo anterior, el tipo de sanción que debe hacer es:"/>
              </Step>
              <Step id="step4" name="Pregunta IV" desc="" >
                <PicPreguntasCompetenciasI 
                encabezado="Mariana Vélez jefe de Cobranza de la seccional recibe un comunicado de una empresa responsable del IVA que no ha pagado los impuestos sobre las ventas en los últimos 6 años. Sin embargo, argumenta que está dispuesta a pagar de forma voluntaria el impuesto de los últimos 5 años asumiendo las sanciones y beneficios que la norma estipula." 
                pregunta = "La decisión que Mariana debe tomar es:"/>
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

export default PicSeccionPreguntasII;