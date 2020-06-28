import React from "react";
import axios from "axios";
import keyczar from "./keyczar";
import Util from "./Util";
import { NotificationManager } from "../components/common/react-notifications";

export function cifrar(text) {
  return Util.encryptText(text);
}

export function decifrar(text) {
  try {
    return Util.decryptJson(text);
  } catch (error) {
    return text;
  }
}

class HttpUtil extends React.Component {
  static async requestPost(url, data, sucessCallBack, errorCallBack, message) {
    const userInfoStr = localStorage.getItem("userInfo");
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr);
      data.token = userInfo.token;
    }

    var today = new Date();

    console.log(
      "Antes de: url" +
        url +
        " " +
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds() +
        ":" +
        today.getMilliseconds()
    );
    const dataRequest = {
      data: cifrar(JSON.stringify(data)),
    };
    console.log(
      "Despues de: " +
        url +
        " " +
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds() +
        ":" +
        today.getMilliseconds()
    );

    await axios
      .post(url, dataRequest)
      .then(function (response) {
        const dataDecrypt = JSON.parse(decifrar(response.data.respuesta));
        console.log(dataDecrypt);
        NotificationManager.success(
          dataDecrypt.message,
          dataDecrypt.estado,
          5000,
          null,
          null,
          "filled"
        );
        if (sucessCallBack != null && sucessCallBack !== undefined)
          sucessCallBack(dataDecrypt);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          const dataDecrypt = JSON.parse(
            decifrar(error.response.data.respuesta)
          );
          NotificationManager.error(
            dataDecrypt.message,
            dataDecrypt.estado,
            5000,
            () => {
              alert("callback");
            },
            null,
            "filled"
          );
        } else {
          NotificationManager.error(
            "Ha ocurrido un error con el Servidor, por favor contacte al supervisor del sistema",
            "Error",
            5000,
            () => {
              alert("callback");
            },
            null,
            "filled"
          );
        }
        // console.log(dataDecrypt);
        if (errorCallBack != null && errorCallBack !== undefined)
          errorCallBack(error.response);
      });
  }

  static requestGet(url, sucessCallBack, errorCallBack) {
    axios
      .get(url)
      .then(function (response) {
        console.log(response);
        if (sucessCallBack != null && sucessCallBack !== undefined)
          sucessCallBack(response.data);
      })
      .catch(function (error) {
        console.log(error);
        if (errorCallBack != null && errorCallBack !== undefined)
          errorCallBack(error);
      });
  }

  render() {
    return;
  }
}

export default HttpUtil;
