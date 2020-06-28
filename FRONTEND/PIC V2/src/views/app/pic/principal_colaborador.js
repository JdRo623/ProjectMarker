import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import PicColaboradorCard from "../../../components/pic/PicColaboradorCard";
import { Colxx } from "../../../components/common/CustomBootstrap";

export default function PrincipalColaborador(props) {
  return (
    <Fragment>
      <Row>
        <Colxx xxs="12" lg="12" xl="12" className="mb-3">
          <PicColaboradorCard />
        </Colxx>
      </Row>
    </Fragment>
  );
}
