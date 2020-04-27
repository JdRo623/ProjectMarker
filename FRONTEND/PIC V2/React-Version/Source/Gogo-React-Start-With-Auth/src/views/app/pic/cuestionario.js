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
import PicInformacionPersonalColaboradorForm from "../../../components/pic/PicInformacionPersonalColaboradorForm";

import PicSeccionPreguntasI from "../../../components/pic/PicSeccionPreguntasI";
import PicSeccionPreguntasII from "../../../components/pic/PicSeccionPreguntasII";

class Cuestionario extends Component {
  state = {
    activeTab: "1",
    totalPasos: "5"
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab && this.state.totalPasos>=tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  pasoSiguiente(){
    this.toggleTab(this.state.activeTab++)
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" lg="5" xl="4" className="col-left">
            <PicColaboradorCard />
            <PicInformacionPersonalColaboradorForm />
          </Colxx>

          <Colxx xxs="12" lg="7" xl="8" className="mb-3">

            <Nav tabs className="separator-tabs ml-0 mb-5">
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === "1", "nav-link": true })}
                  onClick={() => { this.toggleTab("1"); }} to="#" location={{}}>
                  Instrucciones Información Personal
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === "2", "nav-link": true })}
                  onClick={() => { this.toggleTab("2"); }} to="#" location={{}}>
                  Información Personal
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === "3", "nav-link": true })}
                  onClick={() => { this.toggleTab("3"); }} to="#" location={{}}>
                  Sección I
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === "4", "nav-link": true })}
                  onClick={() => { this.toggleTab("4"); }}
                  to="#" location={{}}>
                  Sección II
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === "5", "nav-link": true })}
                  to="#" location={{}}>
                  Sección III
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <PicSeccionPreguntasI />
              </TabPane>
              <TabPane tabId="2">
                <PicInformacionPersonalColaboradorForm />
              </TabPane>
              <TabPane tabId="3">
                <PicSeccionPreguntasI />
              </TabPane>
              <TabPane tabId="4">
                <PicSeccionPreguntasII />
              </TabPane>
              <TabPane tabId="5">
                <PicInformacionPersonalColaboradorForm />
              </TabPane>
            </TabContent>

          </Colxx>
        </Row>
      </Fragment>
    )
  }
}
export default injectIntl(Cuestionario);

