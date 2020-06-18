import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Main = () => {
  /*const cookies = new Cookies();
  const token = cookies.get('token');
  if (token) {
    return <Redirect to='/' />;
  } else {
    return <Redirect to='/user/login' />;
  }*/
  return <Redirect to='/app' />;
};

export default Main;
