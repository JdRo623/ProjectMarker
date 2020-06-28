"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const boom = require("boom");
const config = require("../../config.json");
const user_jModel = require("../../models/user_j.model");
var tools = require("../utils/tools.js");
var Excel = require("exceljs");

module.exports = {
  CargarEmpleado: CargarEmpleado,
  buscarEmpleado: buscarEmpleado,
  listaNiveles: listaNiveles,
  cambioPassword: cambioPassword,
  crearNuevoUsuario: crearNuevoUsuario,
};

function crearNuevoUsuario(req, res) {
  try {
    var crear = async (req, res) => {
      var dec = tools.decryptJson(req.body.data);
      user_jModel.findOne({ email: dec.email }, (err, UsuarioBuscado) => {
        if (err) {
          console.log(err);
        }
        if (!UsuarioBuscado) {
          var usuarioNuevo = {
            nombres: tools.encrypt(dec.nombres),
            apellidos: tools.encrypt(dec.apellidos),
            nombres_jefe: tools.encrypt(dec.nombres_jefe),
            apellidos_jefe: tools.encrypt(dec.apellidos_jefe),
            email: dec.email,
            identificacion: tools.encrypt(dec.identificacion),
            ciudad: tools.encrypt(dec.ciudad),
          };
          console.log("creando usuario");
          user_jModel.create(usuarioNuevo);
          return res.status(200).send({
            estado: "Usuario creado",
            message: "Usuario Creado",
            data: Object.assign(usuarioNuevo),
          });
        }
        return res.status(200).send({
          estado: "El usuario ya existe",
          message: "El usuario ya existe",
          data: Object.assign(UsuarioBuscado),
        });
      });
    };
    crear(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}

function cambioPassword(req, res) {
  try {
    var datos = async (req, res) => {
      try {
        var dec = tools.decryptJson(req.body.data);
        const filtro = {
          email: tools.decrypt(dec.email),
        };
        user_jModel.findOne(filtro, (err, usuarioBuscado) => {
          if (err) {
            console.log(err);
          }
          if (!usuarioBuscado) {
            return res.status(200).send({
              estado: "Usuario no encontrado",
              message: util.format("usuario no encontrado"),
              data: Object.assign({}),
            });
          }
          usuarioBuscado.password = tools.encrypt(dec.password);
          user_jModel.updateOne(filtro, usuarioBuscado).then(() => {
            return res.status(200).send({
              estado: "Contraseña actualizada",
              message: util.format("Contraseña Actualizada"),
              data: Object.assign(cuestionarioBuscado),
            });
          });
        });
      } catch (error) {
        throw boom.boomify(error);
      }
    };
    datos(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}

function CargarEmpleado(req, res) {
  try {
    var carga = async (req, res) => {
      try {
        var obtener = tools.decryptJson(req.body.data);
        var data = obtener.archivo.replace(/^data:image\/png;base64,/, "");
        let buff = new Buffer(data, "base64");
        var workbook = new Excel.Workbook();
        const fecha = tools.getFechaActual();
        workbook.xlsx.load(buff).then(function () {
          try {
            var users = [];
            var worksheet = workbook.getWorksheet(1);

            let aux = true;
            worksheet.eachRow(function (row, rowNumber) {
              var user_j = {
                nombres: String,
                apellidos: String,
                nombres_jefe: String,
                apellidos_jefe: String,
                Fecha_Inicio: String,
                email: String,
                identificacion: String,
                ciudad: String,
                cargo: String,
                descripccion_cargo: String,
                nivel1: String,
                nivel2: String,
                nivel3: String,
                nivel4: String,
                fecha_registro: String,
                estado_encuesta: String,
              };
              user_j.nombres = tools.encrypt(row.getCell(10).value + "");
              user_j.apellidos = tools.encrypt(row.getCell(11).value + "");
              user_j.nombres_jefe = tools.encrypt(row.getCell(15).value + "");
              user_j.apellidos_jefe = tools.encrypt(row.getCell(16).value + "");
              user_j.Fecha_Inicio = tools.encrypt(row.getCell(13).value + "");
              user_j.email = row.getCell(9).value + "";
              user_j.identificacion = tools.encrypt(row.getCell(8).value + "");
              user_j.ciudad = row.getCell(7).value + "";
              user_j.cargo = tools.encrypt(row.getCell(1).value + "");
              user_j.descripccion_cargo = tools.encrypt(
                row.getCell(6).value + ""
              );
              user_j.nivel1 = tools.encrypt(row.getCell(2).value + "");
              user_j.nivel2 = tools.encrypt(row.getCell(3).value + "");
              user_j.nivel3 = tools.encrypt(row.getCell(4).value + "");
              user_j.nivel4 = tools.encrypt(row.getCell(5).value + "");
              user_j.fecha_registro = fecha;
              user_j.estado_encuesta;
              users.push(user_j);
            });

            //  console.log(users.length);

            var old = JSON.stringify(users).replace(/null/g, "N/A"); //convert to JSON string
            var newArray = JSON.parse(old);
            user_jModel.insertMany(newArray, (error, usuarios) => {
              if (error) {
                console.log(error);
                return res.status(603).send({
                  estado: "Error",
                  message: util.format(error),
                  data: Object.assign({}),
                });
              }
              if (!usuarios) {
                console.log(error);
                return res.status(604).send({
                  estado: "Error",
                  message: util.format(
                    "No ha sido posible almacenar los empleados"
                  ),
                  data: Object.assign({}),
                });
              }

              return res.status(200).send({
                estado: "Empleados almacenados",
                message: util.format(
                  "Los empleados han sido registrados correctamente en el sistema."
                ),
                data: Object.assign({}),
              });
            });
          } catch (error) {
            console.log(error);
            return res.status(601).send({
              estado: "Empleados vacios",
              message: util.format("No hay registros"),
              data: Object.assign({}),
            });
          }
        });
      } catch (error) {
        console.log(error);
        return res.status(602).send({
          estado: "demoro",
          message: util.format("Error procesando el archivo"),
          data: Object.assign({}),
        });
      }
    };
    carga(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}

function buscarEmpleado(req, res) {
  try {
    var traer = async (req, res) => {
      var dec = tools.decryptJson(req.body.data);
      const filtro = {
        email: dec.email,
      };
      await user_jModel.findOne(filtro, (err, user) => {
        if (err) {
          console.log(err);
        }
        if (!user) {
          return res.status(640).send({
            estado: "Error",
            message: "No existe el empleado",
            //data: Object.assign(user)
          });
        } else {
          console.log(user);
          var user_decript = {};
          user_decript.nombres = tools.decrypt(user.nombres);
          user_decript.apellidos = tools.decrypt(user.apellidos);
          user_decript.nombres_jefe = tools.decrypt(user.nombres_jefe);
          user_decript.apellidos_jefe = tools.decrypt(user.apellidos_jefe);
          user_decript.Fecha_Inicio = tools.decrypt(user.Fecha_Inicio);
          user_decript.email = user.email;
          user_decript.identificacion = tools.decrypt(user.identificacion);
          user_decript.ciudad = user.ciudad;
          user_decript.cargo = tools.decrypt(user.cargo);
          user_decript.descripccion_cargo = tools.decrypt(
            user.descripccion_cargo
          );
          user_decript.nivel1 = tools.decrypt(user.nivel1);
          user_decript.nivel2 = tools.decrypt(user.nivel2);
          user_decript.nivel3 = tools.decrypt(user.nivel3);
          user_decript.nivel4 = tools.decrypt(user.nivel4);

          return res.status(200).send({
            estado: "Empleado Encontrado",
            message: util.format("Información Obtenida"),
            data: Object.assign(user_decript),
          });
        }
      });
    };
    traer(req, res);
  } catch (error) {
    console.log(error);
  }
}

function listaNiveles(req, res) {
  try {
    var niveles = [];
    var listar = async (req, res) => {
      await user_jModel.find((err, users) => {
        if (err) {
          console.log(err);
        }
        if (!users) {
          return res.status(601).send({
            estado: "usuarios no encontrados",
            message: util.format("no obtenida"),
            data: Object.assign(err),
          });
        } else {
          users.forEach((element) => {
            var lvl = {
              nivel: String,
              nombre: String,
            };
            lvl.nivel = "nivel 1";
            lvl.nombre = tools.decrypt(element.nivel1);
            niveles.push(lvl);
          });
          users.forEach((element) => {
            var lvl = {
              nivel: String,
              nombre: String,
            };
            lvl.nivel = "nivel 2";
            lvl.nombre = tools.decrypt(element.nivel2);
            niveles.push(lvl);
          });
          users.forEach((element) => {
            var lvl = {
              nivel: String,
              nombre: String,
            };
            lvl.nivel = "nivel 3";
            lvl.nombre = tools.decrypt(element.nivel3);
            niveles.push(lvl);
          });
          users.forEach((element) => {
            var lvl = {
              nivel: String,
              nombre: String,
            };
            lvl.nivel = "nivel 4";
            lvl.nombre = tools.decrypt(element.nivel4);
            niveles.push(lvl);
          });

          for (let i = 0; i < niveles.length; i++) {
            if (niveles[i].nombre == "") {
              niveles.splice(i, i);
            } else {
              for (let j = i + 1; j < niveles.length; j++) {
                if (niveles[i].nombre == niveles[j].nombre) {
                  niveles.splice(j, j);
                }
              }
            }
          }

          return res.status(200).send({
            estado: "niveles",
            message: util.format("listado de niveles"),
            data: Object.assign(niveles),
          });
        }
      });
    };
    listar(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}
