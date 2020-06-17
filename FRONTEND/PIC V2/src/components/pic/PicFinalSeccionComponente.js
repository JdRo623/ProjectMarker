import React, { Fragment, useEffect } from "react";
import { Button, Label, Card, CardBody } from "reactstrap";

export default function PicInstruccionComponente(props) {
  
    useEffect(() => {})
    return (
        <Fragment>
            <div className="wizard-basic-step">
                    <center>
                        <h5>
                            {props.encabezado}
                        </h5>
                        <h6>
                            {props.descriptor}
                        </h6>
                        <br/>
                        <Button color="primary" onClick={props.pasoSiguiente}>Finalizar</Button>
                    </center>
            </div>

        </Fragment>
    );
};