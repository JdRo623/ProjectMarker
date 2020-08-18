import React, { Fragment, useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";

const PicEncriptar = (props) => {
  const [textoProcesado, setTextoProcesado] = useState("");

  useEffect(() => {});

  return (
    <Card>
      <CardBody>
        <Formik
          initialValues={{
            name: "",
          }}
          onSubmit={props.handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="av-tooltip tooltip-label-right">
              <FormGroup>
                <Label>{props.titulo}</Label>
                <Field className="form-control" name="name" />
                {errors.name && touched.name && (
                  <div className="invalid-feedback d-block">{errors.name}</div>
                )}
              </FormGroup>

              <div>
                <h4></h4>
              </div>

              <Button color="primary" type="submit">
                Enviar
              </Button>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};
export default PicEncriptar;
