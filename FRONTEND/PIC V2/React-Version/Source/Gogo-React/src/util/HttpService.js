import React from 'react';
import axios from 'axios';
import keyczar from './keyczar';


function createInstance(){
  const keys = {
    meta: '{\"name\":\"\",\"purpose\":\"DECRYPT_AND_ENCRYPT\",\"type\":\"AES\",\"versions\":[{\"exportable\":false,\"status\":\"PRIMARY\",\"versionNumber\":1}],\"encrypted\":false}',
    1: '{\"aesKeyString\":\"JfEMByS4DjhzoPGJRtiF1A\",\"hmacKey\":{\"hmacKeyString\":\"cijFnmB6azfcR7wKOjbQHAU2ihPjenQI2hwM9kO4f78\",\"size\":256},\"mode\":\"CBC\",\"size\":128}'
};
  const instance = keyczar.fromJson(JSON.stringify(keys));

  return instance;
};

function cifrar(text){
  const instance = createInstance();
  return instance.encrypt(text);
}

function decifrar(text){
  try {
    const instance = createInstance();
    return instance.decrypt(text);
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

    today.getMinutes()+':'+today.getSeconds()+':'+ 
    today.getMilliseconds());
    const dataRequest = {
      data : cifrar(JSON.stringify(data))
    }
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