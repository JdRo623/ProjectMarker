import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import PicCargaPreguntas from '../../../components/pic/PicCargaPreguntas';

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


