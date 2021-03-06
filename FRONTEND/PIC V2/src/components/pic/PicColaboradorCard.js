import React, { Fragment, useState, useEffect } from "react";

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
import { Colxx } from "../../components/common/CustomBootstrap";
import logo from "../../assets/img/logo-dian-principal_recortado.png";
import estudiando from "../../assets/img/estudiando-logo.png";
import unal from "../../assets/img/unal-logo.png";
import { NavLink } from "react-router-dom";

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
  const [estado_ruta, setEstadoRuta] = useState(false);
  const [cargo, setCargo] = useState(false);
  const [nombres, setNombres] = useState(false);
  const [apellidos, setApellidos] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("rol") == "1") {
      setNombres("Administrador");
      setApellidos("");
      setCedula("N/A");
      setNivel1("N/A");
      setNivel2("N/A");
      setNivel3("N/A");
      setNivel4("N/A");
      setCargo("N/A");
      setEstado("N/A");
      setEstadoRuta("N/A");
    } else {
      obtenerInformacionFuncionario();
    }
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
          setNivel3(response.data.nivel3);
          setNivel4(response.data.nivel4);
          setCargo(response.data.cargo);
          setEstado(response.data.estado_cuestionario);
          setEstadoRuta(response.data.estado_ruta);
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

  const renderAuthButton = () => {
    if (estado_cuestionario == "No ha iniciado el cuestionario") {
      // return <Button onClick={IrAlCuestionario}>Realizar el Cuestionario</Button>
      return (
        <NavLink activeClassName="active" to="/app/pic/cuestionario">
          <Button>Realizar el Cuestionario</Button>
        </NavLink>
      );
    } else if(estado_cuestionario == "No ha finalizado el Cuestionario"){
      return (
        <NavLink activeClassName="active" to="/app/pic/cuestionario">
          <Button>Realizar el Cuestionario</Button>
        </NavLink>
      );
    }
    else {
      if (estado_ruta == 1) {
        return (
          <NavLink activeClassName="active" to="/app/pic/rutaAprendizaje">
            <Button>Ver Ruta de Aprendizaje</Button>
          </NavLink>
        );
      } else {
        return <div></div>;
      }
    }
  };

  const IrAlCuestionario = () => {
    props.history.push("/app/pic/cuestionario");
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
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card" style={{ borderRadius: 10 }}>
            <div className="position-relative image-side ">
              <Table style={{ height: "100%" }}>
                <tbody>
                  <tr>
                    <td className="align-middle">
                      <center>
                        <img src={logo} width="205" height="75" />
                      </center>
                    </td>
                  </tr>
                  <tr>
                    <td className="align-middle">
                      <center>
                        <img src={unal} width="200" height="85" />
                      </center>
                    </td>
                  </tr>
                  <tr>
                    <td className="align-middle">
                      <center>
                        <img src={estudiando} width="120" height="120" />
                      </center>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
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
                      <p className="text-muted  mb-2">
                        Subdirección o División:
                      </p>
                      <p className="mb-3">{nivel3}</p>
                      <p className="text-muted  mb-2">
                        Grupo interno de trabajo, Coordinación o Punto de
                        contacto:
                      </p>
                      <p className="mb-3">{nivel4}</p>
                      <p className="text-muted mb-2">Cargo:</p>
                      <p className="mb-3">{cargo}</p>
                      <p className="text-muted  mb-2">Estado Cuestionario:</p>
                      <p className="mb-3">
                        <Badge
                          color="outline-secondary"
                          className="mb-1 mr-1"
                          style={{ textTransform: "uppercase" }}
                          pill
                        >
                          {estado_cuestionario}
                        </Badge>
                      </p>
                      {renderAuthButton()}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Card>
        </Colxx>
      </Row>
    </Fragment>
  );
};

export default PicColaboradorCard;
