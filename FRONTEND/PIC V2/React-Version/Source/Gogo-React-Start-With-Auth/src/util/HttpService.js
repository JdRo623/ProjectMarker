import React from 'react';
import axios from 'axios';
import keyczar from './keyczar';
import Util from './Util'



function cifrar(text){
  return Util.encryptText(text);
}

function decifrar(text){
  try {
    return Util.decryptJson(text);
  } catch (error) {
    return text;
  }
}

class HttpUtil extends React.Component{
  static requestPost(url, data, sucessCallBack, errorCallBack){
    const userInfoStr = localStorage.getItem('userInfo');
      
    if(userInfoStr){
      const userInfo = JSON.parse(userInfoStr);
      data.token = userInfo.token;
    }

    var today = new Date();

    console.log('Antes de: url'+url+' '+today.getHours()+':'+
    today.getMinutes()+':'+today.getSeconds()+':'+ 
    today.getMilliseconds());
    const dataRequest = {
      data : cifrar(JSON.stringify(data))
    }
    console.log('Despues de: '+url+' '+today.getHours()+':'+
    today.getMinutes()+':'+today.getSeconds()+':'+ 
    today.getMilliseconds());

    axios.post(url, dataRequest)
      .then(function (response) {
        console.log(response);
        const dataDecrypt = JSON.parse(decifrar(response.data.respuesta));
        if(sucessCallBack != null && sucessCallBack !== undefined) sucessCallBack(dataDecrypt);
      })
      .catch(function (error) {
        console.log(error.response);
        if(errorCallBack != null && errorCallBack !== undefined) errorCallBack(error.response);
      });
  }

  static requestGet(url, sucessCallBack, errorCallBack){
    axios.get(url)
      .then(function (response) {
        console.log(response);
        if(sucessCallBack != null && sucessCallBack !== undefined) sucessCallBack(response.data);
      })
      .catch(function (error) {
        console.log(error);
        if(errorCallBack != null && errorCallBack !== undefined) errorCallBack(error);
      });
  }

  render() {
    return;
  }
}

export default HttpUtil;