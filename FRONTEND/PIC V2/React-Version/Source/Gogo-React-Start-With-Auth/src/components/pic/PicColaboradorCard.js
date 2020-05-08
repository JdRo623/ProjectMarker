import React from "react";

import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardTitle,
} from "reactstrap";
import { NavLink } from "react-router-dom";

import IntlMessages from "../../helpers/IntlMessages";
import SingleLightbox from "../../components/pages/SingleLightbox";
import userDummy from "../../data/pic/dummyUser";

const picColaboradorCard = (props) => {
  return (
    <Card className="mb-4">
      {/*<SingleLightbox thumb="/assets/img/logo-dian.png" large="/assets/img/profile-pic.jpg" className="img-thumbnail card-img social-profile-img" />*/}

      <CardBody>
        <div className="text-center pt-4">
          <h2>{userDummy.nombres + " " + userDummy.apellidos}</h2>
        </div>
        <p className="text-muted text-small mb-2">Cedula:</p>
        <p className="mb-3">
          {userDummy.identificacion}
        </p>
        <p className="text-muted text-small mb-2">Seccional:</p>
        <p className="mb-3">
          {userDummy.nivel1}
        </p>
        <p className="text-muted text-small mb-2">Dirección:</p>
        <p className="mb-3">
          {userDummy.nivel2}
        </p>
        <p className="text-muted text-small mb-2">Subdirección o División:</p>
        <p className="mb-3">
          {userDummy.nivel3}
        </p>
        <p className="text-muted text-small mb-2">Grupo interno de trabajo, Coordinación o Punto de contacto:</p>
        <p className="mb-3">
          {userDummy.nivel4}
        </p>
        <p className="text-muted text-small mb-2">Cargo</p>
        <p className="mb-3">
          <Badge color="outline-secondary" className="mb-1 mr-1" pill>{userDummy.cargo}</Badge>
        </p>

      </CardBody>
    </Card>
  )
};

export default picColaboradorCard;