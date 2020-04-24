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
import GalleryDetail from "../../../containers/pages/GalleryDetail";
import GalleryProfile from "../../../containers/pages/GalleryProfile";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import { injectIntl } from "react-intl";
import whotoFollowData from "../../../data/follow";
import UserFollow from "../../../components/common/UserFollow";
import UserCardBasic from "../../../components/cards/UserCardBasic";
import recentPostsData from "../../../data/recentposts";
import RecentPost from "../../../components/common/RecentPost";
import posts from "../../../data/posts";
import Post from "../../../components/cards/Post";
import PicColaboradorCard from "../../../components/pic/PicColaboradorCard";
import PicInformacionPersonalColaboradorForm from "../../../components/pic/PicInformacionPersonalColaboradorForm";

import PicSeccionPreguntasI from "../../../components/pic/PicSeccionPreguntasI";
import PicSeccionPreguntasII from "../../../components/pic/PicSeccionPreguntasII";

class Cuestionario extends Component {
  state = {
    activeTab: "1"
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
    render(){
        return(
            <Fragment>
                <Row>
                <Colxx xxs="12" lg="5" xl="4" className="col-left">
                  <PicColaboradorCard/>
                  <PicInformacionPersonalColaboradorForm/>
                </Colxx>

                <Colxx xs="12" md="7" xl="8" className="mb-3">

                <Nav tabs className="separator-tabs ml-0 mb-5">
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === "1", "nav-link": true })}
                  onClick={() => { this.toggleTab("1"); }} to="#" location={{}}>
                  Sección I
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === "2", "nav-link": true })}
                  onClick={() => { this.toggleTab("2"); }}
                  to="#" location={{}}>
                  Sección II
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === "3", "nav-link": true })}
                  onClick={() => { this.toggleTab("3"); }}
                  to="#" location={{}}>
                  Sección III
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
              <PicSeccionPreguntasI/>
              </TabPane>
              <TabPane tabId="2">
              <PicSeccionPreguntasII/>
              </TabPane>
              <TabPane tabId="3">
              <PicInformacionPersonalColaboradorForm/>
              </TabPane>
            </TabContent>

                </Colxx>
                </Row>
            </Fragment>
        )
    }
}
export default injectIntl(Cuestionario);

