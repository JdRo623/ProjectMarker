import React, { Component } from "react";
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
import { Button, Label, Card, CardBody } from "reactstrap";

class AvailityBasic extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        <CardBody>
          <h6 className="mb-4">Información Personal</h6>
          <AvForm
            className="av-tooltip tooltip-label-right"
            onSubmit={this.handleSubmit}>

            <AvField
              type="select"
              name="select"
              required
              label="Proceso"
              errorMessage="Please select an option!">
              <option value="0" />
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </AvField>


            <AvField
              type="select"
              name="select"
              required
              label="Subproceso"
              errorMessage="Please select an option!">
              <option value="0" />
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </AvField>


            <AvField
              type="select"
              name="select"
              required
              label="Ciudad"
              errorMessage="Please select an option!">
              <option value="0" />
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </AvField>


            <AvField
              type="select"
              name="select"
              required
              label="Seccional"
              errorMessage="Please select an option!">
              <option value="0" />
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </AvField>

            <AvRadioGroup
              className="error-l-150"
              name="radioPersonasCargo"
              required>
              <Label className="d-block">¿Tiene personas a cargo?</Label>
              <AvRadio customInput label="Si" value="Si" />
              <AvRadio customInput label="No" value="No" />
            </AvRadioGroup>

            <AvRadioGroup
              className="error-l-150"
              name="radioCoordina"
              required>
              <Label className="d-block">¿Coordina algún equipo de trabajo?</Label>
              <AvRadio customInput label="Si" value="Si" />
              <AvRadio customInput label="No" value="No" />
            </AvRadioGroup>


            <Button color="primary">Ingresar</Button>
          </AvForm>
        </CardBody>
      </Card>
    );
  }
}

export default AvailityBasic;