import React, { Fragment, useState, useEffect } from "react";
import { AvForm, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import {
  Row,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  Badge,
  Table,
  Button,
} from "reactstrap";
import { Colxx } from "../common/CustomBootstrap";

import constantes from "../../util/Constantes.js";
import HttpUtil from "../../util/HttpService.js";

const PicColaboradorCard = (props) => {
  const [modal, setModal] = useState(false);
  const [Cedula, setCedula] = useState(false);
  const [nivel1, setNivel1] = useState(false);
  const [nivel2, setNivel2] = useState(false);
  const [nivel3, setNivel3] = useState(false);
  const [nivel4, setNivel4] = useState(false);
  const [estado_cuestionario, setEstado] = useState(false);
  const [cargo, setCargo] = useState(false);
  const [nombres, setNombres] = useState(false);
  const [apellidos, setApellidos] = useState(false);

  const manejarCambio = (e) => {
    console.log(e.target.value)
    props.SetInfoValidada(e.target.value)
  };

  useEffect(() => {
    obtenerInformacionFuncionario();
  }, []);

  const obtenerInformacionFuncionario = () => {
    try {
      setModal(true);
      const url = constantes.urlServer + constantes.servicios.traerUsuario;
      const filtros = {
        email: localStorage.getItem("email"),
      };

      HttpUtil.requestPost(
        url,
        filtros,
        (response) => {
          setNombres(response.data.nombres);
          setApellidos(response.data.apellidos);
          setCedula(response.data.identificacion);
          setNivel1(response.data.nivel1);
          setNivel2(response.data.nivel2);
          props.setSeccionalElegido(response.data.nivel2)
          setNivel3(response.data.nivel3);
          props.setSubdireccionElegido(response.data.nivel3)
          setNivel4(response.data.nivel4);
          props.setGITElegido(response.data.nivel4)
          setCargo(response.data.cargo);
          props.setCargoElegido(response.data.cargo)
          setEstado(response.data.estado_cuestionario);
          setModal(false);
        },
        () => {
          setModal(false);
        }
      );
    } catch (error) {
      setModal(false);
    }
  };

  return (
    <Fragment>
      <div>
        <Modal isOpen={modal}>
          <ModalHeader>Obteniendo información</ModalHeader>
          <ModalBody>
            Obteniendo opciones de información personal del servidor
          </ModalBody>
        </Modal>
      </div>
      <Row className="h-100">
        <Colxx xxs="12" md="12" className="mx-auto my-auto">
          <div className="form-side">
            <Table style={{ height: "100%" }}>
              <tbody>
                <tr>
                  <td className="align-middle">
                    <h2 className="text-left">{nombres + " " + apellidos}</h2>
                    <p className="text-muted  mb-2">Cedula:</p>
                    <p className="mb-3">{Cedula}</p>
                    <p className="text-muted mb-2">Dirección o Seccional:</p>
                    <p className="mb-3">{nivel2}</p>
                    <p className="text-muted  mb-2">Subdirección o División:</p>
                    <p className="mb-3">{nivel3}</p>
                    <p className="text-muted  mb-2">
                      Grupo interno de trabajo, Coordinación o Punto de
                      contacto:
                    </p>
                    <p className="mb-3">{nivel4}</p>
                    <p className="text-muted mb-2">Cargo:</p>
                    <p className="mb-3">{cargo}</p>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle">
                    {"¿Esta información es correcta?"}

                    <AvForm
                      className="av-tooltip tooltip-label-right"
                      onChange={manejarCambio}
                    >
                      <AvRadioGroup
                        disabled={false}
                        className="error-l-150"
                        name="radioPersonasCargo"
                        required
                      >
                        <AvRadio
                          customInput
                          label={<p className="mb-3">Sí</p>}
                          value={"true"}
                        />
                        <AvRadio
                          customInput
                          label={<p className="mb-3">No</p>}
                          value={"false"}
                        />
                      </AvRadioGroup>
                    </AvForm>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Colxx>
      </Row>
    </Fragment>
  );
};

export default PicColaboradorCard;
