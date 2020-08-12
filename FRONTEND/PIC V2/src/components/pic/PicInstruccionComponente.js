import React, { Fragment, useEffect } from "react";

export default function PicInstruccionComponente(props) {
  useEffect(() => {});
  return (
    <Fragment>
      <div className="wizard-basic-step">
        <center>
        
          <h4 style={{ fontWeight: "bold" }}>{props.encabezado}</h4>
          <h6>{props.descriptor}</h6>
        </center>
      </div>
    </Fragment>
  );
}
