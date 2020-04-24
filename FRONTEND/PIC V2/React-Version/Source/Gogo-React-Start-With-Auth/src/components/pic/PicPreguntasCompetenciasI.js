import React, { Fragment } from "react";
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

const picPreguntasCompetenciasI = (props) => {

    return (
        <Fragment>
            <div className="wizard-basic-step">
                <Form>
                    <FormGroup>
                        <center>
                            <h5>
                               {props.encabezado}
                            </h5>
                        </center>
                        <AvForm
                            className="av-tooltip tooltip-label-right"
                            onSubmit={props.handleSubmit}>
                            <AvRadioGroup
                                className="error-l-150"
                                name="radioPersonasCargo"
                                required>
                                <h6>{props.pregunta}</h6>
                                <AvRadio customInput label="1 [Nada importante]" value="1" />
                                <AvRadio customInput label="2" value="2" />
                                <AvRadio customInput label="3" value="3" />
                                <AvRadio customInput label="4" value="4" />
                                <AvRadio customInput label="5 [Muy importante]" value="5" />
                            </AvRadioGroup>
                        </AvForm>
                    </FormGroup>

                </Form>
            </div>

        </Fragment>
    );
};

export default picPreguntasCompetenciasI;