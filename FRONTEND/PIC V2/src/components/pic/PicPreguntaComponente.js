import React, { Fragment, useState, useEffect } from "react";
import {
    AvForm,
    AvField,
    AvGroup,
    AvInput,
    AvFeedback,
    AvRadioGroup,
    AvRadio,
    AvCheckboxGroup,
    AvCheckbox
} from "availity-reactstrap-validation";
import { Wizard, Steps, Step } from 'react-albus';
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import Timer from 'react-compound-timer';

export default function PicPreguntaComponente(props) {
    const [listItems, setListItems] = useState(null);
    const [estadoOpciones, setEstadoOpciones] = useState(false)
    const manejarEnvio = (e) => {
        props.setElegido(e.target.value)
    }
    useEffect(() => {
        if (props.respuestas && listItems == null)
            setListItems(props.respuestas.map((respuesta) =>
                <AvRadio customInput label={
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: respuesta.enunciadoRespuesta }} />
                } value={respuesta.id} />
            ))
    })

    const tiempoAcabado = (getTimerState) => {
        if (getTimerState() == 'STOPPED') {
            setEstadoOpciones(true)
            console.log(estadoOpciones)
            props.setElegido("Tiempo Vencido")
            return ''
        }
        return ''
    }
    return (
        <Fragment>
            <div className="wizard-basic-step">

                <FormGroup>
                    <center>
                        <h4 dangerouslySetInnerHTML={{ __html: props.encabezado }}>
                        </h4>
                        <h5 dangerouslySetInnerHTML={{ __html: props.descriptor }}>
                        </h5>
                    </center>
                    <AvForm
                        className="av-tooltip tooltip-label-right"
                        onChange={manejarEnvio}>
                        <AvRadioGroup
                            disabled={estadoOpciones}
                            className="error-l-150"
                            name="radioPersonasCargo"
                            required>
                            <h5 dangerouslySetInnerHTML={{ __html: props.pregunta }}></h5>
                            <div>{listItems}</div>
                        </AvRadioGroup>
                    </AvForm>
                </FormGroup>
                <Timer
                    initialTime={120000}
                    direction="backward"
                    startImmediately={true}
                    onStart={() => console.log('onStart hook')}
                    onResume={() => console.log('onResume hook')}
                    onPause={() => console.log('onPause hook')}
                    onStop={() => console.log('onStop hook')}
                    onReset={() => console.log('onReset hook')}
                >
                    {({ start, resume, pause, stop, reset, getTimerState, getTime }) => (
                        <React.Fragment>
                            <center>
                                <h5>
                                    Tiempo restante: 0 
                                <Timer.Minutes />:
                                    <Timer.Seconds />
                                </h5>
                                <div>{tiempoAcabado(getTimerState)}</div>

                            </center>

                        </React.Fragment>
                    )}
                </Timer>
            </div>

        </Fragment>
    );
};
