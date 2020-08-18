import React, { useState } from "react";

import { Row, Card, CardBody, InputGroup, Input, Modal,
  ModalHeader,
  ModalBody,Button } from "reactstrap";
import constantes from "../../util/Constantes.js";
import HttpUtil from "../../util/HttpService.js";

const PicCargaDocumentos = (props) => {
  const [archivo, setArchivo] = useState("");
  const [modal, setModal] = React.useState(false);

  const handleArchivoChange = (e) => setArchivo(e.target.files);
  const enviarArchivo = () => {
    try {
      let files = archivo;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        setModal(true);
        //const url = constantes.urlServer + constantes.servicios.registrarPreguntas;
        const url = constantes.urlServer + props.servicio;

        let archivoB64 = e.target.result;
        archivoB64 = archivoB64.replace(
          "data:application/octet-stream;base64,",
          ""
        );
        archivoB64 = archivoB64.replace(
          /^ data:application\/octet-stream;base64,/,
          ""
        );
        const infoPreguntas = {
          archivo: archivoB64,
        };
        HttpUtil.requestPost(
          url,
          infoPreguntas,
          (response) => {
            setModal(false);
               },
          () => {
            setModal(false);
        }
        );
      };
    } catch (error) {
      console.error("Error", error);
    }
  };

  const obtenerArchivoPrueba = () => {
    try {
      setModal(true);
      const url = constantes.urlServer + props.ejemplo;

      HttpUtil.requestPost(
        url,
        {},
        (response) => {
          var temp =
            "data:application/vnd.ms-excel;base64," +
            encodeURIComponent(response.data.documento);
          var download = document.createElement("a");
          download.href = temp;
          download.download = response.data.nombreArchivo;
          document.body.appendChild(download);
          download.click();
          document.body.removeChild(download);
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
    <Card className="mb-4">
      <div>
        <Modal isOpen={modal}>
          <ModalHeader>Obteniendo información</ModalHeader>
          <ModalBody>Obteniendo información del Servidor.</ModalBody>
        </Modal>
      </div>
      <CardBody>
        <h3 className="mb-3">{props.titulo}</h3>
        <InputGroup className="mb-3">
          <Input
            placeholder="Archivo"
            labelText="Archivo"
            id="archivo"
            formControlProps={{
              fullWidth: true,
            }}
            type="file"
            files={archivo}
            onChange={handleArchivoChange}
            autoComplete="off"
          />
        </InputGroup>
        <Button color="primary" onClick={enviarArchivo}>
          Cargar
        </Button>
        <Button color="primary" onClick={obtenerArchivoPrueba}>
          Descargar Plantilla
        </Button>
      </CardBody>
    </Card>
  );
};

export default PicCargaDocumentos;
