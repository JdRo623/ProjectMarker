import React from "react";
import axios from "axios";
import keyczar from "./keyczar";
import Util from "./Util";

function cifrar(text) {
  return Util.encryptText(text);
}

function decifrar(text) {
  try {
    return Util.decryptJson(text);
  } catch (error) {
    return text;
  }
}

class HttpUtil extends React.Component {
  static requestPost(url, data, sucessCallBack, errorCallBack) {
    const userInfoStr = localStorage.getItem("userInfo");

    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr);
      data.token = userInfo.token;
    }

    var today = new Date();

    const dataRequest = {
      data: cifrar(JSON.stringify(data)),
    };

    axios
      .post(url, dataRequest)
      .then(function (response) {
        const dataDecrypt = JSON.parse(decifrar(response.data.respuesta));
        if (sucessCallBack != null && sucessCallBack !== undefined)
          sucessCallBack(dataDecrypt);
      })
      .catch(function (error) {
        if (errorCallBack != null && errorCallBack !== undefined)
          errorCallBack(error.response);
      });
  }

  static requestGet(url, sucessCallBack, errorCallBack) {
    axios
      .get(url)
      .then(function (response) {
        if (sucessCallBack != null && sucessCallBack !== undefined)
          sucessCallBack(response.data);
      })
      .catch(function (error) {
        if (errorCallBack != null && errorCallBack !== undefined)
          errorCallBack(error);
      });
  }

  render() {
    return;
  }
}

export default HttpUtil;
