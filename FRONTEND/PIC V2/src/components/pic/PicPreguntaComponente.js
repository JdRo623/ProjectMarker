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
  
    useEffect(() => {
        console.log(props.respuestas)
        if (props.respuestas && listItems==null) 
                setListItems(props.respuestas.map((respuesta) =>
            <AvRadio customInput label={respuesta.enunciadoRespuesta} value={respuesta.id} />
        ))
    })
    return (
        <Fragment>
            <div className="wizard-basic-step">
                <FormGroup>
                    <center>
                        <h4>
                            {props.encabezado}
                        </h4>
                        <h5>
                            {props.descriptor}
                        </h5>
                    </center>
                    <AvForm
                        className="av-tooltip tooltip-label-right"
                        onSubmit={props.handleSubmit}>
                        <AvRadioGroup
                            className="error-l-150"
                            name="radioPersonasCargo"
                            required>
                            <h5>{props.pregunta}</h5>
                            <div>{listItems}</div>
                        </AvRadioGroup>
                    </AvForm>
                </FormGroup>
            </div>

        </Fragment>
    );
};
