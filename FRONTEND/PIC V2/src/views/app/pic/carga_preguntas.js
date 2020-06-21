import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import PicCargaPreguntas from '../../../components/pic/PicCargaPreguntas';

class CargaPreguntas extends Component {
  state = {
    activeTab: '1',
    totalPasos: '4',
  };

  toggleTab(tab) {
    console.log(tab);
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  pasoSiguiente = () => {
    switch (this.state.activeTab) {
      case '1':
        this.toggleTab('2');
        break;
      case '2':
        this.toggleTab('3');
        break;
      case '3':
        this.toggleTab('4');
        break;
      case '4':
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Fragment>
        <PicCargaPreguntas />
      </Fragment>
    );
  }
}
export default injectIntl(CargaPreguntas);
