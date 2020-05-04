import React, { Component, Fragment } from "react";
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
import classnames from "classnames";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import PicColaboradorCard from "../../../components/pic/PicColaboradorCard";
import PicSeccionInformacionPersonal from "../../../components/pic/PicSeccionInformacionPersonal";

import PicSeccionPreguntasI from "../../../components/pic/PicSeccionPreguntasI";
import PicSeccionPreguntasII from "../../../components/pic/PicSeccionPreguntasII";

class Cuestionario extends Component {
  state = {
    activeTab: "1",
    totalPasos: "4"
  };

  toggleTab(tab) {
    console.log(tab)
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  pasoSiguiente = ()=>{
    switch (this.state.activeTab ) {
      case "1":
        this.toggleTab("2")
        break;
        case "2":
        this.toggleTab("3")
        break;
        case "3":
        this.toggleTab("4")
        break;
        case "4":
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" lg="5" xl="4" className="mb-3">
            
          </Colxx>

          <Colxx xxs="12" lg="12" xl="12" className="mb-3">
          <PicColaboradorCard />

            <Nav tabs className="separator-tabs ml-0 mb-5">
              <NavItem>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === "1", "nav-link": true })}
                  onClick={() => { this.toggleTab("1"); }} to="#" location={{}}>
                  Información Personal
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === "2", "nav-link": true })}
                  onClick={() => { this.toggleTab("2"); }} to="#" location={{}}>
                  Sección I
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === "3", "nav-link": true })}
                  onClick={() => { this.toggleTab("3"); }}
                  to="#" location={{}}>
                  Sección II
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === "4", "nav-link": true })}
                  to="#" location={{}}>
                  Sección III
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <PicSeccionInformacionPersonal pasoSiguiente = {this.pasoSiguiente}/>
              </TabPane>
              <TabPane tabId="2">
                <PicSeccionPreguntasI pasoSiguiente = {this.pasoSiguiente}/>
              </TabPane>
              <TabPane tabId="3">
                <PicSeccionPreguntasII pasoSiguiente = {this.pasoSiguiente}/>
              </TabPane>
              <TabPane tabId="4">
                <PicSeccionInformacionPersonal pasoSiguiente = {this.pasoSiguiente}/>
              </TabPane>
            </TabContent>

          </Colxx>
        </Row>
      </Fragment>
    )
  }
}
export default injectIntl(Cuestionario);

