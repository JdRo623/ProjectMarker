import React, { Fragment, useState, useEffect } from "react";
import { AvForm, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import { Table, FormGroup, Row } from "reactstrap";
import Timer from "react-compound-timer";
import { Colxx } from "../../components/common/CustomBootstrap";
import constantes from "../../util/Constantes.js";
import HttpUtil from "../../util/HttpService.js";

export default function PicPreguntaComponente(props) {
  const [listItems, setListItems] = useState(null);
  const [estadoOpciones, setEstadoOpciones] = useState(false);
  const [idPregunta, setIdPregunta] = useState(props.idPregunta);
  const [columna, setColumna] = useState(props.columa);
  const [contador, setContador] = useState("Obteniendo..."); //119999
  const [contadoEstado, setContadorEstado] = useState(false); //119999

  var contadorReloj = 0;
  var componenteActivado = false;
  //var contador = "Obteniendo..."
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
                  //className="mb-3"
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

  useEffect(() => {

  }, [contador]);

  useEffect(() => {
    props.setElegido("");
    props.setIdElegido("");
    obtenerCuestionario();
  }, []);

  const obtenerCuestionario = () => {
    try {
      // setModal(true);
      const url =
        constantes.urlServer +
        constantes.servicios.obtenerTemporizadorPreguntas;
      const filtros = {
        email: localStorage.getItem("email"),
        codigo_pregunta: idPregunta,
        seccion: props.seccion,
      };

      HttpUtil.requestPost(
        url,
        filtros,
        (response) => {
          //  setContador(response.data);
          contadorReloj = response.data;
          componenteActivado = true;
          if (contadorReloj == 0) {
            setContador("00:00");
          }
          //  setModal(false);
        },
        () => {
          //   setModal(false);
        }
      );
    } catch (error) {
      //  setModal(false);
    }
  };

  const tick = () => {

    if (componenteActivado) {
      var minutes = Math.floor(
        (contadorReloj % (1000 * 60 * 60)) / (1000 * 60)
      );
      var seconds = Math.floor((contadorReloj % (1000 * 60)) / 1000);
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;
      contadorReloj -= 1000;

      if (contadorReloj > -1000) {
        setContador(minutes + ":" + seconds);
      }else{
        setContador("00:00");
      }

      if (contadorReloj <= 0) {
        setEstadoOpciones(true);
        props.setIdElegido(idPregunta);
        switch (props.seccion) {
          case "1":
            props.setElegido("1");
            break;
          default:
            props.setElegido("Tiempo Vencido");
            break;
        }
        clearInterval(refreshIntervalId);

      }
    }
  };

  var refreshIntervalId = setInterval(tick, 1000);
  return (
    <Fragment>
      <div className="wizard-basic-step">
        <FormGroup>
          <Table responsive>
            <tbody>
              <tr>
                <div>
                  <p
                    className="mb-3"
                    dangerouslySetInnerHTML={{
                      __html: props.encabezado,
                    }}
                  />
                  <p
                    className="mb-3"
                    dangerouslySetInnerHTML={{
                      __html: props.descriptor,
                    }}
                  />
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
                <Table responsive>
                  <tbody>
                    <Row>{listItems}</Row>
                  </tbody>
                </Table>
              </div>
            </AvRadioGroup>
          </AvForm>
        </FormGroup>
        <center>
          <h5>Tiempo restante: {contador}</h5>
        </center>
      </div>
    </Fragment>
  );
}
