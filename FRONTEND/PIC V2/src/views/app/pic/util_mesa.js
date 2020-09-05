import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import PicEncriptarDesencriptar from "../../../components/pic/PicClaveMaestra";
import constantes from "../../../util/Constantes.js";
import HttpUtil from "../../../util/HttpService.js";

class Util extends Component {
  constructor(props) {
    super(props);
    this.obtenerSeccionales = this.obtenerSeccionales.bind(this);
    this.state = {claveMaestra: ""}
  }

  obtenerSeccionales(values) {
    try {
      const url =
        constantes.urlServer + constantes.servicios.obtenerClaveMaestra;
      HttpUtil.requestPost(
        url,
        {identificacion: values.name},
        (response) => {
          this.setState({claveMaestra: response.data})
        },
        () => {
        }
      );
    } catch (error) {
    }
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" lg="5" xl="4" className="mb-3">
            <PicEncriptarDesencriptar
              handleSubmit={this.obtenerSeccionales}
              claveMaestra = {this.state.claveMaestra}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(Util);
