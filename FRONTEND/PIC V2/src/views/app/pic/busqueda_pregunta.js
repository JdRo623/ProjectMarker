import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";

import PicPreguntaCompleta from "../../../components/pic/PicPreguntaCompleta";

class BuscarPregunta extends Component {
  render() {
    return (
      <Fragment>
        <PicPreguntaCompleta />
      </Fragment>
    );
  }
}
export default injectIntl(BuscarPregunta);
