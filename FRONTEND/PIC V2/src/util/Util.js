var CryptoJS = require("crypto-js");
const cryptoKeys = "A28893793C608272E0FD794168FF17B8";

function encryptText(text) {
  var response;
  try {
    response = CryptoJS.AES.encrypt(text, cryptoKeys).toString();
  } finally {
    return response;
  }
}

function decryptText(text) {
  var response;

  try {
    var bytes = CryptoJS.AES.decrypt(text, cryptoKeys);
    response = bytes.toString(CryptoJS.enc.Utf8);
  } finally {
    return response;
  }
}

function encryptJson(text) {
  var response;
  try {
    response = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      cryptoKeys
    ).toString();
  } finally {
    return response;
  }
}

function decryptJson(text) {
  var response;
  try {
    var bytes = CryptoJS.AES.decrypt(text, cryptoKeys);
    response = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    console.log(err);
  } finally {
    return response;
  }
}

module.exports = {
  encryptText: encryptText,
  decryptText: decryptText,
  decryptJson: decryptJson,
  encryptJson: encryptJson,
};
