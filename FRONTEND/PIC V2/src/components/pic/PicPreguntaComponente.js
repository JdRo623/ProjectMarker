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

export default function PicPreguntaComponente(props) {
    const [listItems, setListItems] = useState(null);
    const manejarEnvio=(e) =>{
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
                            className="error-l-150"
                            name="radioPersonasCargo"
                            required>
                            <h5 dangerouslySetInnerHTML={{ __html: props.pregunta }}></h5>
                            <div>{listItems}</div>
                        </AvRadioGroup>
                    </AvForm>
                </FormGroup>
            </div>

        </Fragment>
    );
};
