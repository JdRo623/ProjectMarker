import React from 'react';
import { Redirect } from 'react-router-dom';

const Main = () => {
  const cambio = localStorage.getItem('cambio');
  if (cambio) {
    return <Redirect to='/user/reset' />;
  }
  return <Redirect to='/app' />;
};

export default Main;
