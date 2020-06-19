import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Main = () => {
  const cookies = new Cookies();
  const cambio = cookies.get('cambio');
  if (cambio) {
    return <Redirect to='/user/reset' />;
  }
  return <Redirect to='/app' />;
};

export default Main;
