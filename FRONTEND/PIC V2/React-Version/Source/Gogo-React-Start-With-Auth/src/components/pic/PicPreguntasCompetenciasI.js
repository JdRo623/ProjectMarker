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

export default function PicPreguntasCompetenciasI(props) {
    const [listItems, setListItems] = useState(null);
  
    useEffect(() => {
        console.log(props.respuestas)
        if (props.respuestas && listItems==null) 
                setListItems(props.respuestas.map((respuesta) =>
            <AvRadio customInput label={respuesta.enunciadoRespuesta} value={respuesta.value} />
        ))
    })
    return (
        <Fragment>
            <div className="wizard-basic-step">
                <FormGroup>
                    <center>
                        <h5>
                            {props.encabezado}
                        </h5>
                        <h6>
                            {props.descriptor}
                        </h6>
                    </center>
                    <AvForm
                        className="av-tooltip tooltip-label-right"
                        onSubmit={props.handleSubmit}>
                        <AvRadioGroup
                            className="error-l-150"
                            name="radioPersonasCargo"
                            required>
                            <h6>{props.pregunta}</h6>
                            <div>{listItems}</div>
                        </AvRadioGroup>
                    </AvForm>
                </FormGroup>
            </div>

        </Fragment>
    );
};
