import React, { Fragment, useEffect, useState } from "react";

import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../helpers/IntlMessages";
import SingleLightbox from "../../components/pages/SingleLightbox";
import constantes from "../../util/Constantes.js";
import HttpUtil from "../../util/HttpService.js";

export default function PicPreguntaCompleta(props) {
  const [modal, setModal] = useState(false);
  const [pregunta, setPregunta] = useState({});
  const [numeroPregunta, setNumeroPregunta] = useState(0);

  const keyPressed = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      obtenerPreguntaEspecifica();
    }
  };
  const obtenerPreguntaEspecifica = () => {
    try {
      setModal(true);
      const url =
        constantes.urlServer + constantes.servicios.buscarPreguntasPorID;
      const filtros = {
        id: numeroPregunta,
      };

      HttpUtil.requestPost(
        url,
        filtros,
        (response) => {
          console.log(response.data);

          setPregunta(response.data);
          setModal(false);
        },
        () => {
          setPregunta({});
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
          <ModalBody>Obteniendo Pregunta del Servidor.</ModalBody>
        </Modal>
      </div>
      <Card>
        <CardBody>
          <CardTitle>Ingrese el numero de la pregunta</CardTitle>
          <h4>Número de la pregunta</h4>
          <Label className="form-group has-float-label">
  
            <Input
              type="text"
              onKeyPress={keyPressed}
              value={numeroPregunta}
              onChange={(e) => setNumeroPregunta(e.target.value)}
            />
          </Label>
          <Button color="primary" onClick={obtenerPreguntaEspecifica}>
            Buscar Pregunta
          </Button>
        </CardBody>
      </Card>
      <Card className="mb-4">
        <CardBody>
          <h4 style= {{ fontWeight: 'bold' }}>Número Pregunta:</h4>
          <p className="mb-3">{pregunta.numero_pregunta}</p>

          <Table responsive>
            <tbody>
              <tr>
              <h4 style= {{ fontWeight: 'bold' }}>
                  Situación problema:
                </h4>
                <p
                  className="mb-3"
                  dangerouslySetInnerHTML={{
                    __html: pregunta.situacion_problema,
                  }}
                />
                <h4 style= {{ fontWeight: 'bold' }}>
                  Encabezado de la pregunta:
                </h4>
                <p
                  className="mb-3"
                  dangerouslySetInnerHTML={{
                    __html: pregunta.encabezado_pregunta,
                  }}
                />
              </tr>
            </tbody>
          </Table>

          <Table responsive>
            <tbody>
              <tr>
                <h4 style= {{ fontWeight: 'bold' }}>
                  Opciones de respuesta: A:
                </h4>
                <p
                  className="mb-3"
                  dangerouslySetInnerHTML={{ __html: pregunta.respuesta1 }}
                />
               <h4 style= {{ fontWeight: 'bold' }}>
                  Opciones de respuesta: B:
                </h4>
                <p
                  className="mb-3"
                  dangerouslySetInnerHTML={{ __html: pregunta.respuesta2 }}
                />
              <h4 style= {{ fontWeight: 'bold' }}>
                  Opciones de respuesta: C:
                </h4>
                <p
                  className="mb-3"
                  dangerouslySetInnerHTML={{ __html: pregunta.respuesta3 }}
                />
              </tr>
            </tbody>
          </Table>

          <h4 style= {{ fontWeight: 'bold' }}>Competencia:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: pregunta.competencia }}
          />
          <h4 style= {{ fontWeight: 'bold' }}>Nivel:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: pregunta.nivel }}
          />
          <h4 style= {{ fontWeight: 'bold' }}>Curso:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: pregunta.curso }}
          />
          <h4 style= {{ fontWeight: 'bold' }}>Codificación:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: pregunta.codificacion }}
          />
          <h4  style= {{ fontWeight: 'bold' }} >Clave:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: pregunta.clave }}
          />
          <h4  style= {{ fontWeight: 'bold' }}>
            Justificación respuesta clave:
          </h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{
              __html: pregunta.justificacion_respuesta_clave,
            }}
          />
          <h4 style= {{ fontWeight: 'bold' }}>
            Justificación respuestas incorrectas:
          </h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{
              __html: pregunta.justificacion_incorrectas,
            }}
          />
          <h4 style= {{ fontWeight: 'bold' }}>Bibliografía:</h4>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: pregunta.bibliografia }}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
}
