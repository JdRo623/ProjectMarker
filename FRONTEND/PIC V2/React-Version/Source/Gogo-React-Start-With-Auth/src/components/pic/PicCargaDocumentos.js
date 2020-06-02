import React, { useState } from "react";

import {
    Row,
    Card,
    CardBody,
    InputGroup,
    Input,
    Button,

} from "reactstrap";
import constantes from "../../util/Constantes.js"
import HttpUtil from '../../util/HttpService.js';

const PicCargaDocumentos = (props) => {
    const [archivo, setArchivo] = useState("");
    const [modal, setModal] = React.useState(false);

    const handleArchivoChange = e => setArchivo(e.target.files);
    const enviarArchivo = () => {
        try {

            let files = archivo;
            let reader = new FileReader();
            reader.readAsDataURL(files[0])
            reader.onload = (e) => {
                setModal(true);
                //const url = constantes.urlServer + constantes.servicios.registrarPreguntas;
                const url = constantes.urlServer + props.servicio;

                let archivoB64 = e.target.result;
                archivoB64 = archivoB64.replace("data:application/octet-stream;base64,", "");
                archivoB64 = archivoB64.replace(/^ data:application\/octet-stream;base64,/, "");
                const infoPreguntas = {
                    archivo: archivoB64
                }
                console.warn("data aaaa mostrar ", archivoB64);
                HttpUtil.requestPost(url, infoPreguntas,
                    (response) => {
                        setModal(false);
                        console.log("Cargado")
                        alert("autenticar: " + response.message);
                        /*  if( ['Aprobado', 'Aprobada'].indexOf(response.estado) > -1){
                              localStorage.setItem('userInfo', JSON.stringify(response.data));
                              props.history.push("/admin");
                         //     history.push("/admin");
                           //   this.setState({redirect : true, showLoader : false, user : response.data});*/

                    },
                    () => {
                        setModal(false);
                        console.warn("Ocurrió un error al cargar el archivo");

                        alert("Ocurrió un error al cargar el archivo");

                        /* this.setState({
                             alertTitle : 'Error!',
                             alertMessage : 'Ocurrio un error al autenticarce, por favor intenta de nuevo',
                             alertType : 'error', 
                             showLoader : false
                         });*/
                    });
            }
        } catch (error) {
            console.error("Error", error)
        }
    }

    return (
        <Card className="mb-4">
            <CardBody>
                <p className="mb-3">
                    {props.titulo}
            </p>
                <InputGroup className="mb-3">
                    <Input
                        placeholder="Archivo"
                        labelText="Archivo"
                        id="archivo"
                        formControlProps={{
                            fullWidth: true
                        }}
                        type="file"
                        files = {archivo}
                        onChange = {handleArchivoChange}
                        autoComplete ="off"
                    />
                </InputGroup>
                <Button color="primary" onClick={enviarArchivo}>Cargar</Button>
            </CardBody>
        </Card>
    )

}


export default PicCargaDocumentos;