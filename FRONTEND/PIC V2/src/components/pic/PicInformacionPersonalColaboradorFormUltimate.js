import React, { Fragment, useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button } from "reactstrap";

export default function PicInformacionPersonalColaboradorComponent(props) {
  const [listItemsCargos, setListItemsCargos] = useState(null);
  const [listItemsSeccionales, setListItemsSeccionales] = useState(null);
  const [listItemsSubDirecciones, setListItemsSubDirecciones] = useState(null);
  const [listItemsGIT, setListItemsGIT] = useState(null);
  
  useEffect(() => {

    if (props.cargos && listItemsCargos == null){
      setListItemsCargos(
        props.cargos.map((respuesta) => (
          <option value={respuesta.nombre} onClick={manejarEnvio}>
            {respuesta.nombre}
          </option>
        ))
      );
    }

    if (props.listados.seccionales.length > 0  && listItemsSeccionales == null){ 
      setListItemsSeccionales(
        props.listados.seccionales.map((respuesta) => (
          <option value={respuesta.nombre} onClick={manejarEnvio}>
            {respuesta.nombre}
          </option>
        ))
      );
    }

    if (props.listados.subprocesos.length > 0  && listItemsSubDirecciones == null){
      setListItemsSubDirecciones(
        props.listados.subprocesos.map((respuesta) => (
          <option value={respuesta.nombre} onClick={manejarEnvio}>
            {respuesta.nombre}
          </option>
        ))
      );
    }

    if (props.listados.gits.length > 0  && listItemsGIT == null){
      setListItemsGIT(
        props.listados.gits.map((respuesta) => (
          <option value={respuesta.nombre} onClick={manejarEnvio}>
            {respuesta.nombre}
          </option>
        ))
      );
    }
     

  },[props.listados]);
  

  const selecionoCargo = (e) => {
    props.setCargoElegido(e.target.value);
    props.obtenerSeccionales();
  };
  const selecionoSeccional = (e) => {
    setListItemsSubDirecciones(null)
    setListItemsGIT(null)
    props.setSeccionalElegido(e.target.value);
    props.obtenerSubdireccionSeccional(e.target.value)


    };
  const selecionoSubdireccion = (e) => {
    setListItemsGIT(null)
    props.setSubdireccionElegido(e.target.value);
    props.obtenerCoordinacionesSeccional(e.target.value);

  };
  const selecionoGIT = (e) => {
    props.setGITElegido(e.target.value);
  };
  const manejarEnvio = (e) => {
    // props.setElegido(e.target.value);
  };

  return (
    <Fragment>
      <h4 style={{ fontWeight: "bold" }} className="mb-4">
        {props.encabezado}
      </h4>
      <AvForm
        className="av-tooltip tooltip-label-right"
        onChange={manejarEnvio}
      >
        <AvField
          type="select"
          name="select"
          required
          label="Cargo"
          onChange={selecionoCargo}
          errorMessage="¡Por favor seleccione una opción!"
        >
          <option value="0">Seleccione una Opción</option>
          {listItemsCargos}
        </AvField>
        <AvField
          type="select"
          name="select"
          onChange={selecionoSeccional}
          required
          label="Secional o Dirección"
          errorMessage="¡Por favor seleccione una opción!"
        >
          <option value="0">Seleccione una Opción</option>
          {listItemsSeccionales}
        </AvField>
        <AvField
          type="select"
          name="select"
          onChange={selecionoSubdireccion}
          required
          label="Subdirección o división"
          errorMessage="¡Por favor seleccione una opción!"
        >
          <option value="0">Seleccione una Opción</option>
          {listItemsSubDirecciones}
        </AvField>
        <AvField
          type="select"
          name="select"
          onChange={selecionoGIT}
          required
          label="Grupo interno de trabajo, Coordinación o Punto de contacto"
          errorMessage="¡Por favor seleccione una opción!"
        >
          <option value="0">Seleccione una Opción</option>
          {listItemsGIT}
        </AvField>
      </AvForm>
    </Fragment>
  );
}
