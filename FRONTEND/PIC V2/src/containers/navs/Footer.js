import React from "react";
import { NavLink } from "react-router-dom";
import { Row } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";

import logo from "../../assets/img/estudiando-logo.svg";
import logoDian from "../../assets/img/logo-dian-principal_recortado.png";
import unal from "../../assets/img/unal-logo.png";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="container-fluid">
          <Row>
            <Colxx xxs="4" sm="4">
              <center>
                <img className="mb-0" src={logoDian} width="200" height="68" />
              </center>
            </Colxx>
            <Colxx xxs="4" sm="4">
              <center>
                <img className="mb-0" src={unal} width="160" height="74" />
              </center>
            </Colxx>

            <Colxx xxs="4" sm="4">
              <center>
                <img className="mb-0" src={logo} width="60" height="60" />
              </center>
            </Colxx>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
