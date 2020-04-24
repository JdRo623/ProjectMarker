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

const picColaboradorCard = (props) => {
  return (
    <Card className="mb-4">
      <SingleLightbox thumb="/assets/img/logo-dian.png" large="/assets/img/profile-pic.jpg" className="img-thumbnail card-img social-profile-img" />

      <CardBody>
        <div className="text-center pt-4">
          <p className="list-item-heading pt-2">Joan Duarte</p>
        </div>
        <p className="text-muted text-small mb-2">Cedula:</p>

        <p className="mb-3">
          1018483565
                         </p>
        <p className="text-muted text-small mb-2">Cargo</p>
        <p className="mb-3">
          <Badge color="outline-secondary" className="mb-1 mr-1" pill>Analista III</Badge>
        </p>

      </CardBody>
    </Card>
  )
};

export default picColaboradorCard;