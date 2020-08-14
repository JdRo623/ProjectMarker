import React, { Fragment, useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";

export default function PicInformacionPersonalColaboradorComponent(props) {
  const [listItems, setListItems] = useState(null);

  useEffect(() => {
    if (props.respuestas && listItems == null)
      setListItems(
        props.respuestas.map((respuesta) => (
          <option value={0 /*respuesta.id*/}>
            {respuesta.enunciadoRespuesta}
          </option>
        ))
      );
  });
  return (
    <Fragment>
      <h6 className="mb-4">{props.encabezado}</h6>
      <AvForm className="av-tooltip tooltip-label-right">
        <AvField
          type="select"
          name="select"
          required
          label={props.variable}
          errorMessage="Por favor seleccione una opcioón!"
        >
          {listItems}
        </AvField>
      </AvForm>
    </Fragment>
  );
}
