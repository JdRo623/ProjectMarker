import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  CardHeader,
} from "reactstrap";
import { Wizard, Steps, Step } from "react-albus";
import { BottomNavigation } from "../wizard/BottomNavigation";
import { TopNavigation } from "../wizard/TopNavigation";
import PicInformacionPersonalColaboradorForm from "./PicInformacionPersonalColaboradorForm";
import PicInstruccionComponente from "./PicInstruccionComponente";
import PicFinalSeccionComponente from "./PicFinalSeccionComponente";
import constantes from "../../util/Constantes.js";
import HttpUtil from "../../util/HttpService.js";
import { NotificationManager } from "../common/react-notifications";
import InstruccionImg from "../../assets/img/instrucciones-i.png";
import BienvenidosImg from "../../assets/img/bienvenidos-i.png";
import AntesImg from "../../assets/img/antes.png";
import InstruccionInfoPersonalImg from "../../assets/img/ip-inicio.png";
import FinalImg from "../../assets/img/ip-final.png";
import { Picture } from "react-responsive-picture";

export default function PicSeccionInformacionPersonal(props) {
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);
  const [modal, setModal] = useState(false);
  const [cargoSeleccionado, setCargoSeleccionado] = useState("");
  const [seccionalSeleccionada, setSeccionalSeleccionada] = useState("");
  const [subprocesoSeleccionado, setSubprocesoSeleccionado] = useState("");
  const [coordinacionSeleccionado, setCoordinacionSeleccionado] = useState("");


  const mostrarMensajeError = (tittle, message) => {
    NotificationManager.error(
      message,
      tittle,
      3000,
      () => {
        alert("callback");
      },
      null,
      "filled"
    );
  };

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 2 <= steps.indexOf(step)) {
      setBottomNavHidden(true);
      setTopNavDisabled(true);
    }
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const hStyle = { color: "#191b32" };

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
      <Card className="mb-5" style={{ borderRadius: 10 }}>
        <CardBody className="wizard wizard-default">
          <br></br>
          <br></br>

          <Wizard>
            <Steps>
            <Step id="-1" name="Final de Sección" desc="">
                <PicFinalSeccionComponente
                  encabezado="Finalización - Sección III"
                  descriptor="Contenido de final de sección"
                  pasoSiguiente={props.pasoSiguiente}
                  descriptor={
                    <div>
                      <p>
                        ¡Qué bien siente el aire puro que recorre la cima de las
                        montañas y la satisfacción del trabajo realizado!
                      </p>
                      <img src={FinalImg} width="850" height="540" />
                    </div>
                  }
                />
              </Step>
            </Steps>
          </Wizard>
        </CardBody>
      </Card>
    </Fragment>
  );
}
