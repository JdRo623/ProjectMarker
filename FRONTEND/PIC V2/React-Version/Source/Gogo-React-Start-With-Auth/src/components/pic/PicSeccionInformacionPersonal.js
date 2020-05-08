import React, { Component } from "react";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import { Wizard, Steps, Step } from 'react-albus';
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import PicInformacionPersonalColaboradorForm from "./PicInformacionPersonalColaboradorForm";
import PicInstruccionComponente from "../../components/pic/PicInstruccionComponente";
import PicFinalSeccionComponente from "../../components/pic/PicFinalSeccionComponente";
import cargoListado from "../../data/pic/cargo";
import grupoListado from "../../data/pic/grupo";
import seccionalListado from "../../data/pic/seccional";
import nivelCentralListado from "../../data/pic/nivelCentral";
import subprocesoListado from "../../data/pic/subproceso";

class PicSeccionInformacionPersonal extends Component {

    constructor(props) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.topNavClick = this.topNavClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            bottomNavHidden: false,
            topNavDisabled: false,
        }
    }
    componentDidMount() {
    }
    componentDidUpdate() {
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
                                    encabezado="Instrucción de información personal"
                                    descriptor="Contenido de la instrucción"
                                />
                            </Step>
                            <Step id="1" name="" desc="" >
                                <PicInformacionPersonalColaboradorForm
                                    encabezado="Cargo"
                                    respuestas={cargoListado}
                                />
                            </Step>
                            <Step id="2" name="" desc="" >
                                <PicInformacionPersonalColaboradorForm
                                    encabezado="Secional"
                                    respuestas={nivelCentralListado}
                                />
                            </Step>
                            <Step id="3" name="" desc="" >
                                <PicInformacionPersonalColaboradorForm
                                    encabezado="Dirección"
                                    respuestas={seccionalListado}

                                />
                            </Step>
                            <Step id="4" name="" desc="" >
                                <PicInformacionPersonalColaboradorForm
                                    encabezado="Subdirección o división"
                                    respuestas={subprocesoListado}

                                />
                            </Step>
                            <Step id="5" name="" desc="" >
                                <PicInformacionPersonalColaboradorForm
                                    encabezado="Grupo interno de trabajo, Coordinación o Punto de contacto"
                                    respuestas={grupoListado}

                                />
                            </Step>
                            <Step id="6" name="Final de Sección" desc="" >
                                <PicFinalSeccionComponente
                                    encabezado="Final de Sección de registro de Información Personal"
                                    descriptor="Contenido de final de sección"
                                    pasoSiguiente={this.props.pasoSiguiente}
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

export default PicSeccionInformacionPersonal;