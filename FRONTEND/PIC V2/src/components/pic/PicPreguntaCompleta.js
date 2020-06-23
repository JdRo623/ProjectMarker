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
    Form,
    Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../helpers/IntlMessages";
import SingleLightbox from "../../components/pages/SingleLightbox";
import constantes from "../../util/Constantes.js"
import HttpUtil from '../../util/HttpService.js';

export default function PicPreguntaCompleta(props) {

    const [modal, setModal] = useState(false);
    const [pregunta, setPregunta] = useState({});
    const [numeroPregunta, setNumeroPregunta] = useState(0);

    const keyPressed = (event) => {
        console.log(event.key)
        if (event.key === "Enter") {
            obtenerPreguntaEspecifica()
        }
      }
    const obtenerPreguntaEspecifica = () => {
        try {
            setModal(true);
            const url = constantes.urlServer + constantes.servicios.buscarPreguntasPorID;
            const filtros = {
                id: numeroPregunta
            }

            HttpUtil.requestPost(url, filtros,
                (response) => {
                    console.log(response.data)

                    setPregunta(response.data)
                    setModal(false);
                },
                () => {
                    setPregunta({})
                    setModal(false);
                });
        } catch (error) {
            setModal(false);
        }

    }

    return (
        <Fragment>
            <div>
                <Modal isOpen={modal} >
                    <ModalHeader>
                        Obteniendo información
                    </ModalHeader>
                    <ModalBody>
                        Obteniendo Pregunta del Servidor.
                    </ModalBody>
                </Modal>
            </div>
            <Card>
                <CardBody>
                    <CardTitle>
                        Ingrese el numero de la pregunta
                            </CardTitle>
                        <Label className="form-group has-float-label">
                            <Input
                                type="text"
                                onKeyPress={keyPressed}
                                value={numeroPregunta}
                                onChange={e => setNumeroPregunta(e.target.value)}
                            />
                                Número de la pregunta
                            </Label>
                        <Button color="primary" onClick={obtenerPreguntaEspecifica}>
                            Buscar Pregunta
                                </Button>
                </CardBody>

            </Card>
            <Card className="mb-4">
                <CardBody>
                    <p className="text-muted text-small mb-2">Número Pregunta:</p>
                    <p className="mb-3">

                        {pregunta.numero_pregunta}
                    </p>
                    <p className="text-muted text-small mb-2">Situación problema:</p>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: pregunta.situacion_problema }}/>
                    <p className="text-muted text-small mb-2">Encabezado de la pregunta:</p>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: pregunta.encabezado_pregunta }}/>
                    <p className="text-muted text-small mb-2">Opciones de respuesta: A:</p>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: pregunta.respuesta1 }} />
                    <p className="text-muted text-small mb-2">Opciones de respuesta: B:</p>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: pregunta.respuesta2 }} />
                    <p className="text-muted text-small mb-2">Opciones de respuesta: C:</p>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: pregunta.respuesta3 }} />   
                    <p className="text-muted text-small mb-2">Competencia:</p>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: pregunta.competencia }} />
                    <p className="text-muted text-small mb-2">Nivel:</p>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: pregunta.nivel }} />
                    <p className="text-muted text-small mb-2">Curso:</p>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: pregunta.curso }} />
                    <p className="text-muted text-small mb-2">Codificación:</p>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: pregunta.codificacion }} />
                    <p className="text-muted text-small mb-2">Clave:</p>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: pregunta.clave }} />
                    <p className="text-muted text-small mb-2">Justificación respuesta clave:</p>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: pregunta.justificacion_respuesta_clave }} />
                    <p className="text-muted text-small mb-2">Justificación respuestas incorrectas:</p>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: pregunta.justificacion_incorrectas }} />
                    <p className="text-muted text-small mb-2">Bibliografía:</p>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: pregunta.bibliografia }} />
                </CardBody>
            </Card>
        </Fragment>

    )
};