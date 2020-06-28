import React from "react";
import { NavLink } from "react-router-dom";
import { Row } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";

import logo from "../../assets/img/estudiando-logo.svg";
import logoDian from "../../assets/img/logo-dian-principal.png";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="container-fluid">
          <Row>
            <Colxx xxs="6" sm="6">
              <center>
                <img className="mb-0" src={logo} width="70" height="70" />
              </center>
            </Colxx>
            <Colxx xxs="6" sm="6">
              <center>
                <img className="mb-0" src={logoDian} width="120" height="70" />
              </center>
            </Colxx>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
