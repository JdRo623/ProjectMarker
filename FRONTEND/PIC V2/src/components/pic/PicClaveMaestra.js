import React, { Fragment, useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";


const PicClaveMaestra = (props) => {
  const [claveMaestra, setClaveMaestra] = useState("");


  useEffect(() => {},[props.claveMaestra]);

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
                <h4>Ingrese identificación del usuario</h4>
                <Field className="form-control" name="name" />
                {errors.name && touched.name && (
                  <div className="invalid-feedback d-block">{errors.name}</div>
                )}
              </FormGroup>
              <div>
                <h4>Clave Maestra : {props.claveMaestra}</h4>
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
export default PicClaveMaestra;
