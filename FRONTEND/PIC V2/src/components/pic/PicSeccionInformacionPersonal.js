import React, { Fragment, useState, useEffect } from "react";
import {
    Card, CardBody, Modal,
    ModalHeader,
    ModalBody, Form, FormGroup, Input, Label
} from "reactstrap";
import { Wizard, Steps, Step } from 'react-albus';
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import PicInformacionPersonalColaboradorForm from "./PicInformacionPersonalColaboradorForm";
import PicInstruccionComponente from "../../components/pic/PicInstruccionComponente";
import PicFinalSeccionComponente from "../../components/pic/PicFinalSeccionComponente";
import constantes from "../../util/Constantes.js"
import HttpUtil from '../../util/HttpService.js'

export default function PicSeccionInformacionPersonal(props) {

    const [bottomNavHidden, setBottomNavHidden] = useState(false);
    const [topNavDisabled, setTopNavDisabled] = useState(false);
    const [modal, setModal] = useState(false);
    const [cargoListado, setCargoListado] = useState([]);
    const [seccionalListado, setSeccionalListado] = useState([]);
    const [subprocesoListado, setSubprocesoListado] = useState([]);
    const [coordinacionesListado, setCoordinacionesListado] = useState([]);
    const [cargoSeleccionado, setCargoSeleccionado] = useState("");
    const [seccionalSeleccionada, setSeccionalSeleccionada] = useState("");
    const [subprocesoSeleccionado, setSubprocesoSeleccionado] = useState("");
    const [coordinacionSeleccionado, setCoordinacionSeleccionado] = useState("");
    const [cuestionarioUsuario, setCuestionarioUsuario] = useState("");

    const obtenerCargos = (goToNext) => {
        try {
            setModal(true);
            const url = constantes.urlServer + constantes.servicios.obtenerCargosPic;
            HttpUtil.requestPost(url, {},
                (response) => {
                    setCargoListado(response.data)
                    goToNext()
                    setModal(false);
                },
                () => {
                    setModal(false);
                });
        } catch (error) {
            setModal(false);
        }

    }

    const obtenerSeccionales = (goToNext) => {
        try {
            setModal(true);
            const url = constantes.urlServer + constantes.servicios.obtenerSeccionales;
            HttpUtil.requestPost(url, {},
                (response) => {
                    setSeccionalListado(response.data)
                    goToNext()
                    setModal(false);
                },
                () => {
                    setModal(false);
                });
        } catch (error) {
            setModal(false);

        }

    }
    const obtenerSubdireccionSeccional = (goToNext) => {
        try {
            setModal(true);
            const url = constantes.urlServer + constantes.servicios.subdireccionSeccional;
            const filtros = {
                seccional: seccionalSeleccionada
            }
            console.log(seccionalSeleccionada)

            HttpUtil.requestPost(url, filtros,
                (response) => {
                    setSubprocesoListado(response.data)
                    goToNext()
                    setModal(false);
                },
                () => {
                    setModal(false);
                });
        } catch (error) {
            setModal(false);
        }

    }
    const obtenerCoordinacionesSeccional = (goToNext) => {
        try {
            const url = constantes.urlServer + constantes.servicios.coordinacionesSeccional;
            setModal(true);
            const filtros = {
                seccional: seccionalSeleccionada
            }
            console.log(seccionalSeleccionada)

            HttpUtil.requestPost(url, filtros,
                (response) => {
                    console.log(response)
                    setCoordinacionesListado(response.data)
                    goToNext()
                    setModal(false);
                },
                () => {
                    setModal(false);
                });
        } catch (error) {
            setModal(false);

        }

    }

    const enviarInformacionPersonal = (goToNext) => {
        try {
            const url = constantes.urlServer + constantes.servicios.cuestionario;
            setModal(true);
            const filtros = {
                email: "",
                seccional: seccionalSeleccionada,
                coordinacion: coordinacionSeleccionado,
                rol: cargoSeleccionado,
                subgrupo: subprocesoSeleccionado
            }
            console.log(seccionalSeleccionada)

            HttpUtil.requestPost(url, filtros,
                (response) => {
                    console.log(response)
                    props.setEstadoPaso(true)
                    props.setCuestionario(response.data)
                    goToNext()
                    setModal(false);
                },
                () => {
                    setModal(false);
                });
        } catch (error) {
            setModal(true);

        }
    }


    const topNavClick = (stepItem, push) => {
        if (topNavDisabled) {
            return;
        }
        push(stepItem.id);
    }

    const clickSiguiente = (goToNext, step) => {
        console.log(step.id)
        switch (step.id) {
            case "0":
                obtenerCargos(goToNext)
                break;
            case "1":
                obtenerSeccionales(goToNext)
                break;
            case "2":
                obtenerSubdireccionSeccional(goToNext)
                break;
            case "3":
                obtenerCoordinacionesSeccional(goToNext)
                break;
            case "4":
                enviarInformacionPersonal(goToNext)
                break;
            default:
                goToNext(goToNext)
                break;
        }
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
        clickSiguiente(goToNext, step)
        //        goToNext();
    }

    const onClickPrev = (goToPrev, steps, step) => {
        if (steps.indexOf(step) <= 0) {
            return;
        }
        goToPrev();
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
                                    encabezado="Instrucción de información personal"
                                    descriptor="Contenido de la instrucción"
                                />
                            </Step>
                            <Step id="1" name="" desc="" >
                                <PicInformacionPersonalColaboradorForm
                                    encabezado="Cargo"
                                    elegido={cargoSeleccionado}
                                    setElegido={setCargoSeleccionado}
                                    respuestas={cargoListado}
                                />
                            </Step>
                            <Step id="2" name="" desc="" >
                                <PicInformacionPersonalColaboradorForm
                                    encabezado="Secional o Dirección"
                                    respuestas={seccionalListado}
                                    setElegido={setSeccionalSeleccionada}
                                    elegido={seccionalSeleccionada}

                                />
                            </Step>
                            <Step id="3" name="" desc="" >
                                <PicInformacionPersonalColaboradorForm
                                    encabezado="Subdirección o división"
                                    respuestas={subprocesoListado}
                                    elegido={subprocesoSeleccionado}
                                    setElegido={setSubprocesoSeleccionado}

                                />
                            </Step>
                            <Step id="4" name="" desc="" >
                                <PicInformacionPersonalColaboradorForm
                                    encabezado="Grupo interno de trabajo, Coordinación o Punto de contacto"
                                    respuestas={coordinacionesListado}
                                    elegido={coordinacionSeleccionado}
                                    setElegido={setCoordinacionSeleccionado}

                                />
                            </Step>
                            <Step id="5" name="Final de Sección" desc="" >
                                <PicFinalSeccionComponente
                                    encabezado="Final de Sección de registro de Información Personal"
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


