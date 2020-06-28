import React, { Component } from "react";
import { injectIntl } from "react-intl";

import { PicAgregarEmpleado } from "../../../components/pic/PicAgregarEmpleados";

class CargaPreguntas extends Component {
  render() {
    return (
      <>
        <PicAgregarEmpleado />
      </>
    );
  }
}
export default injectIntl(CargaPreguntas);
