import React, { useState } from "react";
import {
  Row,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  CardTitle,
  Label,
  Button,
  Form,
} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";
import { useInputValue } from "../../hooks/useInputValue";
import { NotificationManager } from "../../components/common/react-notifications";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import constantes from "../../util/Constantes.js";
import HttpUtil from "../../util/HttpService.js";

export function PicAgregarEmpleado(props) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const identificacion = useInputValue("");
  const nombres = useInputValue("");
  const apellidos = useInputValue("");
  const nombres_jefe = useInputValue("");
  const apellidos_jefe = useInputValue("");
  const email = useInputValue("");
  const ciudad = useInputValue("");

  const registrarEmpleado = async (e) => {
    e.preventDefault();
    setLoading(true);
    setModal(true);
    try {
      setModal(false);
      const url = constantes.urlServer + constantes.servicios.crearNuevoUsuario;
      const form = {
        identificacion: identificacion.value,
        nombres: nombres.value,
        apellidos: apellidos.value,
        nombres_jefe: nombres_jefe.value,
        apellidos_jefe: apellidos_jefe.value,
        email: email.value,
        ciudad: ciudad.value,
      };
      if (
        form.identificacion &&
        form.nombres &&
        form.apellidos &&
        form.nombres_jefe &&
        form.apellidos_jefe &&
        form.email &&
        form.ciudad
      ) {
        HttpUtil.requestPost(url, form, (response) => {
          if (response) {
            console.log("response", response);
            identificacion.value = "";
            nombres.value = "";
            apellidos.value = "";
            nombres_jefe.value = "";
            apellidos_jefe.value = "";
            email.value = "";
            ciudad.value = "";
            setLoading(false);
          } else {
            console.log("no hay respuesta");
            setLoading(false);
            NotificationManager.error(
              "Ha ocurrido un error al crear el empleado",
              "Error",
              5000,
              () => {},
              null,
              "filled"
            );
          }
        });
      } else {
        NotificationManager.error(
          "Rellene todos los campos para continuar",
          "Error",
          5000,
          () => {},
          null,
          "filled"
        );
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setModal(false);
      NotificationManager.error(
        "Ha ocurrido un error al crear el empleado",
        "Error",
        5000,
        () => {},
        null,
        "filled"
      );
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div>
          <Modal isOpen={modal}>
            <ModalHeader>Enviando información</ModalHeader>
            <ModalBody>Registrando Empleado</ModalBody>
          </Modal>
        </div>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>Agregar empleado</CardTitle>
                <Form onSubmit={registrarEmpleado}>
                  <Label className="form-group has-float-label">
                    <Input type="text" {...identificacion} />
                    <IntlMessages id="empleado.identificacion" />
                  </Label>
                  <Label className="form-group has-float-label">
                    <Input type="text" {...nombres} />
                    <IntlMessages id="empleado.nombres" />
                  </Label>
                  <Label className="form-group has-float-label">
                    <Input type="text" {...apellidos} />
                    <IntlMessages id="empleado.apellidos" />
                  </Label>
                  <Label className="form-group has-float-label">
                    <Input type="text" {...nombres_jefe} />
                    <IntlMessages id="empleado.nombresjefe" />
                  </Label>
                  <Label className="form-group has-float-label">
                    <Input type="text" {...apellidos_jefe} />
                    <IntlMessages id="empleado.apellidosjefe" />
                  </Label>
                  <Label className="form-group has-float-label">
                    <Input type="email" {...email} />
                    <IntlMessages id="empleado.email" />
                  </Label>
                  <Label className="form-group has-float-label">
                    <Input type="text" {...ciudad} />
                    <IntlMessages id="empleado.ciudad" />
                  </Label>
                  <Button
                    color="primary"
                    className={`btn-shadow btn-multiple-state ${
                      loading ? "show-spinner" : ""
                    }`}
                    size="lg"
                    type="submit"
                    disabled={loading}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <IntlMessages id="empleado.submit" />
                    </span>
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
    </>
  );
}
