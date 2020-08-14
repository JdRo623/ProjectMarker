import React, { Fragment, useState, useEffect } from "react";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox,
} from "availity-reactstrap-validation";
import { Wizard, Steps, Step } from "react-albus";
import {
  Card,
  CardBody,
  Table,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Timer from "react-compound-timer";
import { Colxx } from "../../components/common/CustomBootstrap";

export default function PicPreguntaComponente(props) {
  const [listItems, setListItems] = useState(null);
  const [estadoOpciones, setEstadoOpciones] = useState(false);
  const [idPregunta, setIdPregunta] = useState(props.idPregunta);
  const [columna, setColumna] = useState(props.columa);
  const RespuestaAdicional = () => (
    <Colxx xxs="3" lg="3" xl="3" className="mb-3">
      <AvRadio
        customInput
        label={<p className="mb-3">No se la respuesta a esta pregunta</p>}
        value={"NS"}
      />
    </Colxx>
  );

  const manejarEnvio = (e) => {
    props.setElegido(e.target.value);
    props.setIdElegido(idPregunta);
  };

  useEffect(() => {
    if (props.respuestas && listItems == null)
      setListItems(
        props.respuestas.map((respuesta) => (
          <Colxx
            xxs="12"
            lg={props.columna}
            xl={props.columna}
            className="mb-3"
          >
            <AvRadio
              customInput
              label={
                <p
                  className="mb-3"
                  dangerouslySetInnerHTML={{
                    __html: respuesta.enunciadoRespuesta,
                  }}
                />
              }
              value={respuesta.id}
            />
          </Colxx>
        ))
      );
  });

  const tiempoAcabado = (getTimerState) => {
    if (getTimerState() == "STOPPED") {
      setEstadoOpciones(true);
      console.log(estadoOpciones);
      props.setElegido("Tiempo Vencido");
      return "";
    }
    return "";
  };
  return (
    <Fragment>
      <div className="wizard-basic-step">
        <FormGroup>
          <Table>
            <tbody>
              <tr>
                <div>
                  <h4
                    dangerouslySetInnerHTML={{ __html: props.encabezado }}
                  ></h4>
                  <h5
                    dangerouslySetInnerHTML={{ __html: props.descriptor }}
                  ></h5>
                </div>
              </tr>
            </tbody>
          </Table>

          <AvForm
            className="av-tooltip tooltip-label-right"
            onChange={manejarEnvio}
          >
            <AvRadioGroup
              disabled={estadoOpciones}
              className="error-l-150"
              name="radioPersonasCargo"
              required
            >
              <h5 dangerouslySetInnerHTML={{ __html: props.pregunta }}></h5>
              <div>
                <Table>
                  <tbody>
                    <Row>{listItems}</Row>
                  </tbody>
                </Table>
              </div>
            </AvRadioGroup>
          </AvForm>
        </FormGroup>
        <Timer
          initialTime={119999}
          direction="backward"
          startImmediately={true}
          onStart={() => console.log("onStart hook")}
          onResume={() => console.log("onResume hook")}
          onPause={() => console.log("onPause hook")}
          onStop={() => console.log("onStop hook")}
          onReset={() => console.log("onReset hook")}
        >
          {({ start, resume, pause, stop, reset, getTimerState, getTime }) => (
            <React.Fragment>
              <center>
                <h5>
                  Tiempo restante: 0
                  <Timer.Minutes />:
                  <Timer.Seconds />
                </h5>
                <div>{tiempoAcabado(getTimerState)}</div>
              </center>
            </React.Fragment>
          )}
        </Timer>
      </div>
    </Fragment>
  );
}
