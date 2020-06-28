import React, { Fragment, useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button } from "reactstrap";

export default function PicInformacionPersonalColaboradorComponent(props) {
  const [listItems, setListItems] = useState(null);

  useEffect(() => {
    if (props.respuestas && listItems == null)
      setListItems(
        props.respuestas.map((respuesta) => (
          <option value={respuesta.nombre} onClick={manejarEnvio}>
            {respuesta.nombre}
          </option>
        ))
      );
  });

  const manejarEnvio = (e) => {
    props.setElegido(e.target.value);
  };

  return (
    <Fragment>
      <h6 className="mb-4">{props.encabezado}</h6>
      <AvForm
        className="av-tooltip tooltip-label-right"
        onChange={manejarEnvio}
      >
        <AvField
          type="select"
          name="select"
          required
          label={props.variable}
          errorMessage="Por favor seleccione una opción!"
        >
          <option value="0">Seleccione una Opción</option>
          {listItems}
        </AvField>
      </AvForm>
    </Fragment>
  );
}
