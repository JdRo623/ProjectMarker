import React from "react";

import {
  Row,
  Card,
  CardBody,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardTitle,
  Table,
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";

import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo_dian_h.jpg";
import estudiando from "../../assets/img/estudiando-logo.png";
import unal from "../../assets/img/estudiando-logo.png";

import IntlMessages from "../../helpers/IntlMessages";
import SingleLightbox from "../../components/pages/SingleLightbox";
import userDummy from "../../data/pic/dummyUser";

const PicColaboradorCard = (props) => {
  return (
    <Row className="h-100">
      <Colxx xxs="12" md="8" className="mx-auto my-auto">
        <Card className="auth-card" style={{ borderRadius: 10 }}>
          <div className="position-relative image-side ">
            <Table style={{ height: "100%" }}>
              <tbody>
                <tr>
                  <td className="align-middle">
                    <center>
                      <img src={logo} width="150" height="150" />
                    </center>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle">
                    <center>
                      <img src={unal} width="150" height="150" />
                    </center>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle">
                    <center>
                      <img src={estudiando} width="150" height="150" />
                    </center>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="form-side">
            <div className="text-center pt-4">
              <h2 className="text-left">
                {userDummy.nombres + " " + userDummy.apellidos}
              </h2>
            </div>
            <p className="text-muted text-small mb-2">Cedula:</p>
            <p className="mb-3">{userDummy.identificacion}</p>
            <p className="text-muted text-small mb-2">Seccional:</p>
            <p className="mb-3">{userDummy.nivel1}</p>
            <p className="text-muted text-small mb-2">Dirección:</p>
            <p className="mb-3">{userDummy.nivel2}</p>
            <p className="text-muted text-small mb-2">
              Subdirección o División:
            </p>
            <p className="mb-3">{userDummy.nivel3}</p>
            <p className="text-muted text-small mb-2">
              Grupo interno de trabajo, Coordinación o Punto de contacto:
            </p>
            <p className="mb-3">{userDummy.nivel4}</p>
            <p className="text-muted text-small mb-2">Cargo:</p>
            <p className="mb-3">{userDummy.cargo}</p>
            {/* <p className="text-muted text-small mb-2">Estado Cuestionario:</p>
            <p className="mb-3">
              <Badge color="outline-secondary" className="mb-1 mr-1" pill>
                {userDummy.estado_cuestionario}
              </Badge>
            </p> */}
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

export default PicColaboradorCard;
