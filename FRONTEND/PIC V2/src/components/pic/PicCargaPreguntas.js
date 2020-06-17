import React, { Fragment, useEffect, useState } from "react";
import {
    Row,
    Card,
    CardBody,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CardTitle,
    Label,
    Button,
    Form
} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import 'react-quill/dist/quill.bubble.css';
import constantes from "../../util/Constantes.js"
import HttpUtil from '../../util/HttpService.js';


const quillModules = {
    toolbar: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
        ],
        ["link", "image"],
        ["clean"]
    ]
};

const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
];

export default function PicCargaPreguntas(props) {

    const [modal, setModal] = useState(false);

    const [numero_pregunta, setNumeroPregunta] = useState("");
    const [situacion_problema, setSituacionProblema] = useState("");
    const [encabezado_pregunta, setEncabezadoPregunta] = useState("");
    const [respuesta1, setRespuesta1] = useState("");
    const [respuesta2, setRespuesta2] = useState("");
    const [respuesta3, setRespuesta3] = useState("");
    const [competencia, setCompetencia] = useState("");
    const [nivel, setNivel] = useState("");
    const [curso, setCurso] = useState("");
    const [codificacion, setCodificacion] = useState("");
    const [clave, setClave] = useState("");
    const [justificacion_respuesta_clave, setJustificacionRespuestaClave] = useState("");
    const [justificacion_incorrectas, setJustificacionIncorrectas] = useState("")
    const [bibliografia, setBibliografia] = useState("");

    const enviarPregunta = () => {
        try {
            console.log(numero_pregunta);
            setModal(true);
            const url = constantes.urlServer + constantes.servicios.agregarPregunta;

            const pregunta = {
                numero_pregunta: numero_pregunta,
                situacion_problema: situacion_problema,
                encabezado_pregunta: encabezado_pregunta,
                respuesta1: respuesta1,
                respuesta2: respuesta2,
                respuesta3: respuesta3,
                competencia: competencia,
                nivel: nivel,
                curso: curso,
                codificacion: codificacion,
                clave: clave,
                justificacion_respuesta_clave: justificacion_respuesta_clave,
                justificacion_incorrectas: justificacion_incorrectas,
                bibliografia: bibliografia
            }
            const envio = {
                pregunta: pregunta
            }
            // console.warn("data aaaa mostrar ", archivoB64);
            HttpUtil.requestPost(url, envio,
                (response) => {
                    setModal(false);
                    setNumeroPregunta("");
                    setSituacionProblema("");
                    setEncabezadoPregunta("");
                    setRespuesta1("");
                    setRespuesta2("");
                    setRespuesta3("");
                    setCompetencia("");
                    setNivel("");
                    setCurso("");
                    setCodificacion("");
                    setClave("");
                    setJustificacionRespuestaClave("");
                    setJustificacionIncorrectas("");
                    setBibliografia("");

                    console.log("Cargado")
                    /*if (['Aprobado', 'Aprobada'].indexOf(response.estado) > -1) {
                        localStorage.setItem('userInfo', JSON.stringify(response.data));
                        props.history.push("/admin");
                        //     history.push("/admin");
                        //  this.setState({redirect : true, showLoader : false, user : response.data});

                    }*/
                },
                (response) => {
                    setModal(false);
                    console.warn("A Ocurrido un error al almacenar la pregunta, por favor revise el número de la pregunta");
                    /*  this.setState({
                          alertTitle: 'Error!',
                          alertMessage: 'Ocurrio un error al autenticarce, por favor intenta de nuevo',
                          alertType: 'error',
                          showLoader: false
                      });*/
                });
        } catch (error) {
            console.error("Error", error)
        }
    }

    useEffect(() => { })
    return (
        <Fragment>
            <div>
                <Modal isOpen={modal} >
                    <ModalHeader>
                        Enviando información
                    </ModalHeader>
                    <ModalBody>
                        Registrando Preguntas
                    </ModalBody>
                </Modal>
            </div>
            <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                Cargue de Preguntas
                            </CardTitle>

                            <Form>
                                <Label className="form-group has-float-label">
                                    <Input
                                        type="text"
                                        value={numero_pregunta}
                                        onChange={e => setNumeroPregunta(e.target.value)}
                                    />
                                    <IntlMessages id="preguntas.numero_pregunta" />
                                </Label>
                                <Row className="mb-4">
                                    <Colxx xxs="12">
                                        <Label className="form-group has-float-label">
                                            <IntlMessages id="preguntas.situacion_problema" />
                                        </Label>
                                        <ReactQuill
                                            theme="snow"
                                            value={situacion_problema}
                                            onChange={setSituacionProblema}
                                            modules={quillModules}
                                            formats={quillFormats} />
                                    </Colxx>
                                </Row>
                                <Row className="mb-4">
                                    <Colxx xxs="12">
                                        <Label className="form-group has-float-label">
                                            <IntlMessages id="preguntas.encabezado" />
                                        </Label>
                                        <ReactQuill
                                            theme="snow"
                                            value={encabezado_pregunta}
                                            onChange={setEncabezadoPregunta}
                                            modules={quillModules}
                                            formats={quillFormats} />
                                    </Colxx>
                                </Row>
                                <Label className="form-group has-float-label">
                                    <ReactQuill
                                        theme="snow"
                                        value={respuesta1}
                                        onChange={setRespuesta1}
                                        modules={quillModules}
                                        formats={quillFormats} />
                                    <IntlMessages id="preguntas.opciones_respuestas_a" />
                                </Label>
                                <Label className="form-group has-float-label">
                                    <ReactQuill
                                        theme="snow"
                                        value={respuesta2}
                                        onChange={setRespuesta2}
                                        modules={quillModules}
                                        formats={quillFormats} />
                                    <IntlMessages id="preguntas.opciones_respuestas_b" />
                                </Label>
                                <Label className="form-group has-float-label">
                                    <ReactQuill
                                        theme="snow"
                                        value={respuesta3}
                                        onChange={setRespuesta3}
                                        modules={quillModules}
                                        formats={quillFormats} />
                                    <IntlMessages id="preguntas.opciones_respuestas_c" />
                                </Label>
                                <Label className="form-group has-float-label">
                                    <Input type="text"
                                        value={competencia}
                                        onChange={e => setCompetencia(e.target.value)} />
                                    <IntlMessages id="preguntas.competencia" />
                                </Label>
                                <Label className="form-group has-float-label">
                                    <Input type="text"
                                        value={nivel}
                                        onChange={e => setNivel(e.target.value)} />
                                    <IntlMessages id="preguntas.nivel" />
                                </Label>
                                <Label className="form-group has-float-label">
                                    <Input type="text"
                                        value={curso}
                                        onChange={e => setCurso(e.target.value)} />
                                    <IntlMessages id="preguntas.curso" />
                                </Label>
                                <Label className="form-group has-float-label">
                                    <Input type="text"
                                        value={codificacion}
                                        onChange={e => setCodificacion(e.target.value)} />
                                    <IntlMessages id="preguntas.codificacion" />
                                </Label>
                                <Label className="form-group has-float-label">
                                    <Input type="text"
                                        value={clave}
                                        onChange={e => setClave(e.target.value)} />
                                    <IntlMessages id="preguntas.clave" />
                                </Label>
                                <Row className="mb-4">
                                    <Colxx xxs="12">
                                        <Label className="form-group has-float-label">
                                            <IntlMessages id="preguntas.justificacion_clave" />
                                        </Label>
                                        <ReactQuill
                                            theme="bubble"
                                            value={justificacion_respuesta_clave}
                                            onChange={setJustificacionRespuestaClave}
                                        />
                                    </Colxx>
                                </Row>
                                <Row className="mb-4">
                                    <Colxx xxs="12">
                                        <Label className="form-group has-float-label">
                                            <IntlMessages id="preguntas.justificacion_incorrectas" />
                                        </Label>
                                        <ReactQuill
                                            theme="bubble"
                                            value={justificacion_incorrectas}
                                            onChange={setJustificacionIncorrectas}
                                        />
                                    </Colxx>
                                </Row>
                                <Row className="mb-4">
                                    <Colxx xxs="12">
                                        <Label className="form-group has-float-label">
                                            <IntlMessages id="preguntas.bibliografia" />
                                        </Label>
                                        <ReactQuill
                                            theme="bubble"
                                            value={bibliografia}
                                            onChange={setBibliografia}
                                        />
                                    </Colxx>
                                </Row>
                                <Button color="primary" onClick={enviarPregunta}>
                                    <IntlMessages id="preguntas.submit" />
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Colxx>
            </Row>
        </Fragment>
    );
};