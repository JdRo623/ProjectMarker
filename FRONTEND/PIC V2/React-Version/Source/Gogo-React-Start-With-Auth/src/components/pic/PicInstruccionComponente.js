import React, { Fragment, useEffect } from "react";

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
                    </center>
            </div>

        </Fragment>
    );
};