import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  CardTitle,
  Label,
  Button,
  Form,
} from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import { useInputValue } from '../../hooks/useInputValue';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import constantes from '../../util/Constantes.js';
import HttpUtil from '../../util/HttpService.js';

export function PicAgregarEmpleado(props) {
  const [modal, setModal] = useState(false);
  const identificacion = useInputValue('');
  const nombres = useInputValue('');
  const apellidos = useInputValue('');
  const nombres_jefe = useInputValue('');
  const apellidos_jefe = useInputValue('');
  const email = useInputValue('');
  const ciudad = useInputValue('');

  const enviarPregunta = async () => {
    setModal(true);
    try {
      setModal(false);
      const url = constantes.urlServer + constantes.servicios.crearNuevoUsuario;
      const form = {
        identificacion,
        nombres,
        apellidos,
        nombres_jefe,
        apellidos_jefe,
        email,
        ciudad,
      };
      identificacion.value = '';
      nombres.value = '';
      apellidos.value = '';
      nombres_jefe.value = '';
      apellidos_jefe.value = '';
      email.value = '';
      ciudad.value = '';
      await HttpUtil.requestPost(url, form);
    } catch (error) {
      setModal(false);
      console.error('Error', error);
    }
  };

  return (
    <>
      <div>
        <div>
          <Modal isOpen={modal}>
            <ModalHeader>Enviando información</ModalHeader>
            <ModalBody>Registrando Empleado</ModalBody>
          </Modal>
        </div>
        <Row className='mb-4'>
          <Colxx xxs='12'>
            <Card>
              <CardBody>
                <CardTitle>Agregar empleado</CardTitle>
                <Form>
                  <Label className='form-group has-float-label'>
                    <Input type='text' {...identificacion} />
                    <IntlMessages id='empleado.identificacion' />
                  </Label>
                  <Label className='form-group has-float-label'>
                    <Input type='text' {...nombres} />
                    <IntlMessages id='empleado.nombres' />
                  </Label>
                  <Label className='form-group has-float-label'>
                    <Input type='text' {...apellidos} />
                    <IntlMessages id='empleado.apellidos' />
                  </Label>
                  <Label className='form-group has-float-label'>
                    <Input type='text' {...nombres_jefe} />
                    <IntlMessages id='empleado.nombresjefe' />
                  </Label>
                  <Label className='form-group has-float-label'>
                    <Input type='text' {...apellidos_jefe} />
                    <IntlMessages id='empleado.apellidosjefe' />
                  </Label>
                  <Label className='form-group has-float-label'>
                    <Input type='email' {...email} />
                    <IntlMessages id='empleado.email' />
                  </Label>
                  <Label className='form-group has-float-label'>
                    <Input type='text' {...ciudad} />
                    <IntlMessages id='empleado.ciudad' />
                  </Label>
                  <Button color='primary' onClick={enviarPregunta}>
                    <IntlMessages id='empleado.submit' />
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
    </>
  );
}
