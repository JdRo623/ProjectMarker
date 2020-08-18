import React, { Fragment, useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import {
  Row,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,

} from "reactstrap";

import PicSeccionInformacionPersonal from "../../../components/pic/PicSeccionInformacionPersonalValidacion";

export default function ConsultarCuestionario(props) {
  const [modal, setModal] = useState(false);
  const [cuestionarioUsuario, setCuestionario] = useState({
    listado_competencias: [],
  });
  const [
    informacionPersonalCompleto,
    setInformacionPersonalCompleto,
  ] = useState(false);

  useEffect(() => {
    localStorage.getItem("rol");
  }, []);

  const mostarInfo = () => {};
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
      <PicSeccionInformacionPersonal
        setCuestionario={setCuestionario}
        pruebas={true}
        setEstadoPaso={setInformacionPersonalCompleto}
        pasoSiguiente={mostarInfo}
      />

      <Card className="mb-4">
        <CardBody>
          <h4 style={{ fontWeight: "bold" }}>Coordinación:</h4>
          <p className="mb-3">{cuestionarioUsuario.coordinacion}</p>
          <h4 style={{ fontWeight: "bold" }}>Email:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: cuestionarioUsuario.email }}
          />
          <h4 style={{ fontWeight: "bold" }}>Rol:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: cuestionarioUsuario.rol }}
          />
          <h4 style={{ fontWeight: "bold" }}>Subgrupo:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: cuestionarioUsuario.subgrupo }}
          />
          <h4 style={{ fontWeight: "bold" }}>Seccional:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: cuestionarioUsuario.seccional }}
          />
          <h4 style={{ fontWeight: "bold" }}>Listado Cursos:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{
              __html: cuestionarioUsuario.listado_cursos,
            }}
          />
          <h4 style={{ fontWeight: "bold" }}>Listado Competencias:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{
              __html: cuestionarioUsuario.listado_competencias,
            }}
          />
          <h4 style={{ fontWeight: "bold" }}>Listado Preguntas:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{
              __html: cuestionarioUsuario.listado_preguntas,
            }}
          />
          <h4 style={{ fontWeight: "bold" }}>Listado Preguntas nivel III:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{
              __html: cuestionarioUsuario.listado_preguntas_seccion_iii,
            }}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
}
