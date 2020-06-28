import React, { Fragment, useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Modal,
  ModalHeader,
  ModalBody,
  TabContent,
  TabPane,
  Badge,
  CardTitle,
} from "reactstrap";
import PicPreguntaCompleta from "../../../components/pic/PicPreguntaCompleta";
import constantes from "../../../util/Constantes.js";
import HttpUtil from "../../../util/HttpService.js";
import PicSeccionInformacionPersonal from "../../../components/pic/PicSeccionInformacionPersonal";

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
    localStorage.getItem('rol');

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
          <p className="text-muted text-small mb-2">Coordinación:</p>
          <p className="mb-3">{cuestionarioUsuario.coordinacion}</p>
          <p className="text-muted text-small mb-2">Email:</p>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: cuestionarioUsuario.email }}
          />
          <p className="text-muted text-small mb-2">Rol:</p>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: cuestionarioUsuario.rol }}
          />
          <p className="text-muted text-small mb-2">Subgrupo:</p>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: cuestionarioUsuario.subgrupo }}
          />
          <p className="text-muted text-small mb-2">Seccional:</p>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: cuestionarioUsuario.seccional }}
          />
          <p className="text-muted text-small mb-2">Listado Cursos:</p>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{
              __html: cuestionarioUsuario.listado_cursos,
            }}
          />
          <p className="text-muted text-small mb-2">Listado Competencias:</p>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{
              __html: cuestionarioUsuario.listado_competencias,
            }}
          />
          <p className="text-muted text-small mb-2">Listado Preguntas:</p>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{
              __html: cuestionarioUsuario.listado_preguntas,
            }}
          />
          <p className="text-muted text-small mb-2">
            Listado Preguntas nivel III:
          </p>
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
