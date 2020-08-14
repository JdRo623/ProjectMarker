"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const boom = require("boom");
const config = require("../../config.json");
const CursosHandler = require("../../models/curso.model");
const SeccionalHandler = require("../../models/seccionales.model");
const SubdireccionHandler = require("../../models/subdireccion.model");
const CoordinacionHandler = require("../../models/coordinacion.model");
const ExcepcionesHandler = require("../../models/excepciones_roles.model");
const CargosHandler = require("../../models/cargos.model");
const NivelHandler = require("../../models/nivel.model");

var base64 = require("file-base64");
var tools = require("../utils/tools.js");
var Excel = require("exceljs");

module.exports = {
  registrarActividades: registrarActividades,
  informePIC: informePIC,
  informePICRoles: informePICRoles,
};

function verificarExistencia(seccionales, seccionalCheck) {
  var rolEncontrado;
  if (seccionalCheck.nombre) {
    seccionales.forEach((element) => {
      if (element.nombre) {
        if (element.nombre.localeCompare(seccionalCheck.nombre) == 0) {
          rolEncontrado = true;
        }
      }
    });
  }
  return rolEncontrado;
}

function verificarExistenciaCargo(cargos, cargoCheck) {
  var rolEncontrado;

  cargos.forEach((element) => {
    if (element) {
      if (element.localeCompare(cargoCheck) == 0) {
        rolEncontrado = true;
      }
    }
  });
  return rolEncontrado;
}

function verificarExistenciaCurso(cursos, cursoCheck) {
  var rolEncontrado;

  cursos.forEach((element) => {
    if (element) {
      if (element.localeCompare(cursoCheck) == 0) {
        rolEncontrado = true;
      }
    }
  });
  return rolEncontrado;
}

function registrarActividades(req, res) {
  try {
    var cargar = async (req, res) => {
      try {
        var reqDecrypt = tools.decryptJson(req.body.data);
        var fecha = tools.getFechaActual(); /*.replace(':','');
                fecha = fecha.replace(' ','');*/
        var data = reqDecrypt.archivo;
        data = data.replace(/^data:image\/png;base64,/, "");
        let buff = new Buffer(data, "base64");

        var workbook = new Excel.Workbook();
        workbook.xlsx.load(buff).then(function () {
          try {
            var listadoNiveles = [];
            var nivelTemporal = {
                cargos: []
            };
            var cargoTemporal = {};

            const worksheet = workbook.getWorksheet("Hoja1");
            worksheet.eachRow(function (row, rowNumber) {
              if (rowNumber >= 5 && rowNumber<=2055) {
                if ((row.getCell(1).value+"").trim().toUpperCase()  == "x".toUpperCase() ) {
                  listadoNiveles.push(nivelTemporal);
                  nivelTemporal = {
                      cargos: []
                  };
                  nivelTemporal.nombre = (row.getCell(2).value + "").trim().toUpperCase();
                  cargoTemporal = {
                    nombreCargo: "GENERAL",
                    cursos: [],
                  };
                  for (var i = 3; i <= 186; i++) {
                    if ((row.getCell(i).value+"").trim().toUpperCase()  == "x".toUpperCase() ) {
                      cargoTemporal.cursos.push(i - 2 + "");
                    }
                  }
                  nivelTemporal.cargos.push(cargoTemporal);
                } else {
                  cargoTemporal = {
                    nombreCargo: (row.getCell(2).value + "").trim().toUpperCase(),
                    cursos: [],
                  };
                  for (var i = 3; i <= 186; i++) {
                    if ((row.getCell(i).value+"").trim().toUpperCase()  == "x".toUpperCase() ) {
                      cargoTemporal.cursos.push(i - 2 + "");
                    }
                  }
                  nivelTemporal.cargos.push(cargoTemporal);
                }
              }
            });

            NivelHandler.bulkWrite(
              listadoNiveles.map((nivel) => ({
                updateMany: {
                  filter: { nombre: nivel.nombre },
                  update: { $set: { cargos: nivel.cargos } },
                  upsert: true,
                },
              })),
              (err, nivelesActualizados) => {
                if (err)
                  return res.status(500).send({
                    estado: "Error",
                    message: "Error en la petición",
                    data: Object.assign({ error: err }),
                  });
                if (!nivelesActualizados)
                  return res.status(200).send({
                    estado: "Error",
                    message: "No fue posible registrar los roles",
                    data: Object.assign({}),
                  });
                return res.status(200).send({
                  estado: "Actividades registradas",
                  message: util.format("Archivo procesado exitosamente"),
                  data: Object.assign({}),
                });
              }
            );
          } catch (err) {
            console.error(err);
            return res.status(200).send({
              estado: "Actividades NO registradas",
              message: util.format("Formato del documento no es valido " + err),
              data: Object.assign({}),
            });
          }
        });
      } catch (err) {
        console.error(err);

        return res.status(200).send({
          estado: "Preguntas NO registradas",
          message: util.format("Formato del documento no es valido " + err),
          data: Object.assign({}),
        });
      }
    };
    cargar(req, res);
  } catch (err) {
    res.json(err);
    throw boom.boomify(err);
  }
}

function registrarActividadesViejo(req, res) {
  try {
    var cargar = async (req, res) => {
      try {
        var reqDecrypt = tools.decryptJson(req.body.data);
        var fecha = tools.getFechaActual(); /*.replace(':','');
                fecha = fecha.replace(' ','');*/
        var data = reqDecrypt.archivo;
        data = data.replace(/^data:image\/png;base64,/, "");
        let buff = new Buffer(data, "base64");

        var workbook = new Excel.Workbook();
        workbook.xlsx.load(buff).then(function () {
          try {
            var rowCount = 3;
            var columCountRol = 27;
            var actividades = [];
            var seccionales = [];
            var subGrupos = [];
            var coordinaciones = [];
            var excepciones = [];
            var seccional = {};
            var subgrupoTempo;
            var coordinacionTempo;
            var excepcionTempo;
            var cursosTemp = [];
            var cursoTemp;
            var row;
            var colum;
            var cargosTemp;
            var cargosGuardar = [];
            var cargosGuardarDef = [];
            var cargoGuardar = {};
            const worksheet = workbook.getWorksheet("Cursos");

            do {
              colum = worksheet.getColumn(columCountRol);
              cursosTemp = [];
              subgrupoTempo = {
                fecha_registro: fecha,
              };
              coordinacionTempo = {
                fecha_registro: fecha,
              };
              excepcionTempo = {
                fecha_registro: fecha,
              };
              seccional = { fecha_registro: fecha };
              colum.eachCell(function (cell, rowNumber) {
                cursoTemp = {};
                cargosTemp = [];
                if (cell.value) {
                  if (rowNumber == 1) {
                    seccional.nombre = cell.value + "";
                    subgrupoTempo.seccional = cell.value + "";
                    coordinacionTempo.seccional = cell.value + "";
                  } else if (rowNumber == 2) {
                    if (cell.value.includes("Rol ")) {
                      excepcionTempo.nombre = cell.value + "";
                    } else if (
                      cell.value.includes("Subdirección") ||
                      cell.value.includes("Dirección") ||
                      cell.value.includes("División")
                    ) {
                      subgrupoTempo.nombre = cell.value + "";
                    } else {
                      coordinacionTempo.nombre = cell.value + "";
                    }
                  } else {
                    cursoTemp.idCurso =
                      worksheet.getRow(rowNumber).getCell(1).value + "";
                    cursoTemp.cargos = cell.value
                      .replace(/\n/g, "")
                      .replace(/\r/g, "")
                      .split(";");
                    cursoTemp.cargos.forEach((cargo) => {
                      if (cargo.localeCompare("") != 0) {
                        cargo = cargo.trim();
                        cargosTemp.push(cargo);
                        if (!verificarExistenciaCargo(cargosGuardar, cargo)) {
                          //  console.log(cargosGuardar.length);
                          cargosGuardar.push(cargo);
                        }
                      }
                    });
                    cursoTemp.cargos = cargosTemp;
                    cursosTemp.push(cursoTemp);
                  }
                }
              });
              subgrupoTempo.cursos = cursosTemp;
              coordinacionTempo.cursos = cursosTemp;
              excepcionTempo.cursos = cursosTemp;
              if (seccional.nombre) {
                if (!verificarExistencia(seccionales, seccional))
                  seccionales.push(seccional);
              }

              if (subgrupoTempo.nombre) {
                subGrupos.push(subgrupoTempo);
              }
              if (coordinacionTempo.nombre) {
                coordinaciones.push(coordinacionTempo);
              }
              if (excepcionTempo.nombre) {
                excepciones.push(excepcionTempo);
              }
              columCountRol++;
            } while (columCountRol <= 754);
            do {
              var actividad = {
                fecha_registro: fecha,
              };
              row = worksheet.getRow(rowCount);

              var numValues = row.actualCellCount;
              if (numValues == 0) break;
              if (!row.getCell(1).value) break;

              actividad.consecutivo = row.getCell(1).value + "";
              actividad.proceso = row.getCell(2).value + "";
              actividad.proceso_comun = row.getCell(3).value + "";
              actividad.competencia = row.getCell(4).value + "";
              actividad.descripcion_competencia = row.getCell(5).value + "";
              actividad.eje_funcion_publica = row.getCell(6).value + "";
              actividad.eje_pilar_dian = row.getCell(7).value + "";
              actividad.eje_tematico_pic = row.getCell(8).value + "";
              actividad.tema_central = row.getCell(9).value + "";
              actividad.nombre_actividad = row.getCell(10).value + "";
              actividad.modalidad = row.getCell(11).value + "";
              actividad.tipo_oferta = row.getCell(12).value + "";
              actividad.relacion_programas_anteriores =
                row.getCell(13).value + "";
              actividad.cantidad_participantes_sugerida_total =
                row.getCell(14).value + "";
              actividad.cantidad_participantes_sugerida_grupo =
                row.getCell(15).value + "";
              actividad.cantidad_participantes = row.getCell(16).value + "";
              actividad.nivel_ruta = row.getCell(17).value + "";
              actividad.intencidad_horaria = row.getCell(18).value + "";
              actividad.objetivo_actividad = row.getCell(19).value + "";
              actividad.resumen_contenido = row.getCell(20).value + "";
              actividad.bibliografia = row.getCell(21).value + "";
              actividad.perfil_conferencista = row.getCell(22).value + "";
              actividad.pre_requisitos = row.getCell(23).value + "";
              actividad.fecha_ejecucion = row.getCell(24).value + "";
              actividad.necesidad_capacitacion = row.getCell(25).value + "";
              actividad.incidentes_criticos = row.getCell(26).value + "";
              actividades.push(actividad);
              rowCount++;
            } while (rowCount <= 200);
            // var old = JSON.stringify(actividades).replace(/null/g, 'N/A'); //convert to JSON string
            // var newArray = JSON.parse(old);
            // console.log(cargosGuardar);
            cargosGuardar.forEach((cargo) => {
              cargoGuardar = {
                fecha_registro: fecha,
                nombre: cargo,
              };
              if (cargoGuardar.nombre) {
                cargosGuardarDef.push(cargoGuardar);
              }
            });
            CursosHandler.insertMany(actividades, (err, actividades) => {
              if (err)
                return res.status(500).send({
                  estado: "Error",
                  message: "Error en la petición",
                  data: Object.assign({ error: err }),
                });
              if (!actividades)
                return res.status(200).send({
                  estado: "Error",
                  message: "No fue posible registrar las actividades",
                  data: Object.assign({}),
                });
              //old = JSON.stringify(subGrupos).replace(/null/g, 'N/A'); //convert to JSON string
              //newArray = JSON.parse(old);
              SubdireccionHandler.insertMany(subGrupos, (err, roles) => {
                if (err)
                  return res.status(500).send({
                    estado: "Error",
                    message: "Error en la petición",
                    data: Object.assign({ error: err }),
                  });
                if (!roles)
                  return res.status(200).send({
                    estado: "Error",
                    message: "No fue posible registrar las Subdirecciones",
                    data: Object.assign({}),
                  });
                ExcepcionesHandler.insertMany(
                  excepciones,
                  (err, excepcionesGuardadas) => {
                    if (err)
                      return res.status(500).send({
                        estado: "Error",
                        message: "Error en la petición",
                        data: Object.assign({ error: err }),
                      });
                    if (!excepcionesGuardadas)
                      return res.status(200).send({
                        estado: "Error",
                        message: "No fue posible registrar las excepciones",
                        data: Object.assign({}),
                      });
                    CoordinacionHandler.insertMany(
                      coordinaciones,
                      (err, coordinacionesGuardadas) => {
                        if (err)
                          return res.status(500).send({
                            estado: "Error",
                            message: "Error en la petición",
                            data: Object.assign({ error: err }),
                          });
                        if (!coordinacionesGuardadas)
                          return res.status(200).send({
                            estado: "Error",
                            message:
                              "No fue posible registrar las coordinaciones",
                            data: Object.assign({}),
                          });
                        SeccionalHandler.insertMany(seccionales, (err, sec) => {
                          if (err)
                            return res.status(500).send({
                              estado: "Error",
                              message: "Error en la petición",
                              data: Object.assign({ error: err }),
                            });
                          if (!sec)
                            return res.status(200).send({
                              estado: "Error",
                              message: "No fue posible registrar los roles",
                              data: Object.assign({}),
                            });
                          CargosHandler.insertMany(
                            cargosGuardarDef,
                            (err, car) => {
                              if (err)
                                return res.status(500).send({
                                  estado: "Error",
                                  message: "Error en la petición",
                                  data: Object.assign({ error: err }),
                                });
                              if (!car)
                                return res.status(200).send({
                                  estado: "Error",
                                  message: "No fue posible registrar los roles",
                                  data: Object.assign({}),
                                });
                              return res.status(200).send({
                                estado: "Actividades registradas",
                                message: util.format(
                                  "Archivo procesado exitosamente"
                                ),
                                data: Object.assign({}),
                              });
                            }
                          );
                        });
                      }
                    );
                  }
                );
              });
            });
          } catch (err) {
            console.error(err);
            return res.status(200).send({
              estado: "Actividades NO registradas",
              message: util.format("Formato del documento no es valido " + err),
              data: Object.assign({}),
            });
          }
        });
      } catch (err) {
        console.error(err);

        return res.status(200).send({
          estado: "Preguntas NO registradas",
          message: util.format("Formato del documento no es valido " + err),
          data: Object.assign({}),
        });
      }
    };
    cargar(req, res);
  } catch (err) {
    res.json(err);
    throw boom.boomify(err);
  }
}
function informePIC(req, res) {
  try {
    var cargar = async (req, res) => {
      try {
        var fecha = tools.getFechaActual(); /*.replace(':','');
                fecha = fecha.replace(' ','');*/
        var cursos = [];
        var filtroRol = {};
        var matrizCursosSeccional = [];
        var columnaCarrier = 3;
        var documentName = "C:/Software/plantilla.xlsx";
        var dobCol;
        var workbook = new Excel.Workbook();
        workbook.xlsx.readFile(documentName).then(function () {
          try {
            const worksheet = workbook.getWorksheet("Cursos");
            SeccionalHandler.find({}, (err, seccionales) => {
              seccionales.forEach((seccional) => {
                if (seccional.nombre) {
                  //worksheet.getRow(1).getCell(columnaCarrier).value =
                  //dobCol.values = [,'X','X']
                  RolHandler.find(
                    { direccion: seccional.nombre },
                    (err, subObt) => {
                      if (err)
                        return res.status(500).send({
                          estado: "Error",
                          message: "Error en la petición",
                          data: Object.assign({ error: err }),
                        });
                      if (!subObt)
                        return res.status(200).send({
                          estado: "Error",
                          message: "No fue posible registrar los roles",
                          data: Object.assign({}),
                        });
                      var dobCol = worksheet.getColumn(columnaCarrier);
                      dobCol.header = seccional.nombre;
                      dobCol.key = seccional.nombre;
                      subObt.forEach((subGrupo) => {
                        matrizCursosSeccional.push([2, columnaCarrier]);
                        subGrupo.cursos.forEach((curso) => {
                          //  console.log(parseInt(curso.idCurso) + 1,columnaCarrier)
                          worksheet
                            .getRow(parseInt(curso.idCurso) + 1)
                            .getCell(columnaCarrier).value = "X";
                          //console.log('Row ' + (parseInt(curso.idCurso) + 1) + ' = ' + JSON.stringify(worksheet.getRow(parseInt(curso.idCurso) + 1).values));
                          //   console.log('Valor',worksheet.getRow(parseInt(curso.idCurso) + 1).getCell(columnaCarrier).value)
                          // console.log('Valor', curso)

                          /* var dobCol = worksheet.getColumn(columnaCarrier);
                                                     dobCol.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
                                                         if ((parseInt(curso.idCurso) + 1) == rowNumber) {
                                                             cell.value = "X"
                                                         }
                                                     });*/
                        });
                      });
                      if (columnaCarrier == seccionales.length + 2) {
                        workbook.xlsx
                          .writeFile(documentName)
                          .then(() => {
                            base64.encode(documentName, function (
                              err,
                              base64String
                            ) {
                              var respuesta = { documento: base64String };
                              return res.status(200).send({
                                estado: "Registrados",
                                message: util.format(
                                  "Archivo procesado exitosamente"
                                ),
                                data: Object.assign({}),
                              });
                            });
                          })
                          .catch((err) => {
                            return res.status(200).send({
                              estado: "Error",
                              message: util.format(
                                "Error al almacenar el archivo"
                              ),
                              data: Object.assign({ error: err }),
                            });
                          });
                      } else {
                        columnaCarrier++;
                      }
                    }
                  );
                }
              });
            });
          } catch (err) {
            console.error(err);
            return res.status(200).send({
              estado: "Preguntas NO registradas",
              message: util.format("Formato del documento no es valido " + err),
              data: Object.assign({}),
            });
          }
        });
      } catch (err) {
        console.error(err);
        return res.status(200).send({
          estado: "Preguntas NO registradas",
          message: util.format("Formato del documento no es valido " + err),
          data: Object.assign({}),
        });
      }
    };
    cargar(req, res);
  } catch (err) {
    res.json(err);
    throw boom.boomify(err);
  }
}
function informePICRoles(req, res) {
  try {
    var cargar = async (req, res) => {
      try {
        var fecha = tools.getFechaActual(); /*.replace(':','');
                fecha = fecha.replace(' ','');*/
        var hojasCount = 0;
        var filtroRol = {};
        var matrizCursosSeccional = [];
        var columnaCarrier = 3;
        var documentName = "C:/Software/plantilla.xlsx";
        var dobCol;
        var workbook = new Excel.Workbook();
        workbook.xlsx.readFile(documentName).then(function () {
          try {
            CargosHandler.deleteMany({ nombre: "" }, (err, result) => {
              CargosHandler.find({}, (err, cargosOnt) => {
                SeccionalHandler.find({}, (err, seccionales) => {
                  RolHandler.find({}, (err, subObt) => {
                    if (err)
                      return res.status(500).send({
                        estado: "Error",
                        message: "Error en la petición",
                        data: Object.assign({ error: err }),
                      });
                    if (!subObt)
                      return res.status(200).send({
                        estado: "Error",
                        message: "No fue posible registrar los roles",
                        data: Object.assign({}),
                      });
                    cargosOnt.forEach((cargoObt) => {
                      // var cargoObt = cargosOnt[0]
                      columnaCarrier = 3;
                      hojasCount++;
                      const worksheet = workbook.addWorksheet(
                        cargoObt.nombre
                          .replace("de", "")
                          .replace("Subdirector", "SubD.")
                          .replace("Gestión", "G.")
                          .replace("Técnica", "Tec.")
                          .replace("Grupo Interno de Trabajo", "GIT")
                          .replace("Coordinador", "Coor.")
                          .replace("Coordinación", "Coor.")
                          .replace("Auditoría", "Aud.")
                          .replace("Fiscalización", "Fisca.")
                          .replace("División", "Div")
                          .replace("Administrativa", "Admin.")
                          .replace(/ /g, "")
                          .replace("Financiera", "Fin")
                      );
                      // worksheet.getRow(1).getCell(1).value =cargoObt.nombre
                      var dobCol = worksheet.getColumn(1);
                      dobCol.header = "Id Curso";
                      dobCol.key = "Id Curso";
                      var dobCol = worksheet.getColumn(2);
                      dobCol.header = "Nombre Curso";
                      dobCol.key = "Nombre Curso";
                      columnas.forEach((fila) => {
                        worksheet.getRow(fila[0] + 1).getCell(1).value =
                          fila[0];
                        worksheet.getRow(fila[0] + 1).getCell(2).value =
                          fila[1];
                      });
                      worksheet.getRow(186).getCell(1).value = "CARGO";
                      worksheet.getRow(186).getCell(2).value = cargoObt.nombre;
                      seccionales.forEach((seccionalObt) => {
                        if (seccionalObt.nombre) {
                          dobCol = worksheet.getColumn(columnaCarrier);
                          dobCol.header = seccionalObt.nombre;
                          dobCol.key = seccionalObt.nombre;
                          var newSubArray = subObt.filter(function (el) {
                            return el.direccion == seccionalObt.nombre;
                          });
                          newSubArray.forEach((subGrupo) => {
                            if (seccionalObt.nombre)
                              subGrupo.cursos.forEach((curso) => {
                                //   worksheet.getRow(parseInt(curso.idCurso) + 1).getCell(columnaCarrier).value = curso.cargos
                                //   console.log(cargoObt.nombre)
                                if (curso.cargos.includes(cargoObt.nombre)) {
                                  worksheet
                                    .getRow(parseInt(curso.idCurso) + 1)
                                    .getCell(columnaCarrier).value = "X";
                                }
                              });
                          });
                          columnaCarrier++;
                        }
                      });
                    });
                    workbook.xlsx
                      .writeFile(documentName)
                      .then(() => {
                        base64.encode(documentName, function (
                          err,
                          base64String
                        ) {
                          var respuesta = { documento: base64String };
                          return res.status(200).send({
                            estado: "Registrados",
                            message: util.format(
                              "Archivo procesado exitosamente"
                            ),
                            data: Object.assign({}),
                          });
                        });
                      })
                      .catch((err) => {
                        return res.status(200).send({
                          estado: "Error",
                          message: util.format("Error al almacenar el archivo"),
                          data: Object.assign({ error: err }),
                        });
                      });
                  });
                });
              });
            });
          } catch (err) {
            console.error(err);
            return res.status(200).send({
              estado: "Preguntas NO registradas",
              message: util.format("Formato del documento no es valido " + err),
              data: Object.assign({}),
            });
          }
        });
      } catch (err) {
        console.error(err);
        return res.status(200).send({
          estado: "Preguntas NO registradas",
          message: util.format("Formato del documento no es valido " + err),
          data: Object.assign({}),
        });
      }
    };
    cargar(req, res);
  } catch (err) {
    res.json(err);
    throw boom.boomify(err);
  }
}

const columnas = [
  [1, "	Herramientas para el fortalecimiento del aprendizaje organizacional	"],
  [
    2,
    "	Principios, estructura del Estado colombiano y los derechos fundamentales 	",
  ],
  [3, "	Principio, doctrina y fundamentos de la normatividad TACI	"],
  [4, "	Hermenéutica para la interpretación normativa TACI	"],
  [5, "	Redacción Jurídica 	"],
  [6, "	Líneas Doctrinales y Jurisprudenciales TACI	"],
  [
    7,
    "	Políticas de servicio al cliente en entidades públicas, estrategias, ética de la prestación y servicio base 	",
  ],
  [8, "	Principios éticos en el ejercicio del servicio 	"],
  [
    9,
    "	Comportamientos personales, laborales y organizacionales en la norma y la  ética	",
  ],
  [10, "	Transparencia y acceso a la información	"],
  [11, "	Aspectos normativos de la contratación pública	"],
  [12, "	Trámites y procedimientos técnicos en la gestión de contratos	"],
  [13, "	Gestión de riesgos y garantías en la contratación pública	"],
  [14, "	Supervisión de contratos, responsabilidades y acciones disciplinarias	"],
  [15, "	Fundamentos de Régimen legal disciplinario	"],
  [
    16,
    "	Casos prácticos sobre solución de conflictos y arbitraje en contratación pública	",
  ],
  [17, "	Avances internacionales en contratación pública.	"],
  [18, "	Ofimática básica	"],
  [19, "	Funcionalidades de ofimática para presentación de información	"],
  [20, "	Herramientas Colaborativas y comunicación digital	"],
  [
    21,
    "	Ofimática avanzada para análisis de datos, procesamiento de texto y presentación de informes 	",
  ],
  [
    22,
    "	Arquitectura de Información y Organización de Metadatos y Ontologías para la Gestión de Datos y Estadísticas.	",
  ],
  [23, "	Herramientas para la visualización de datos	"],
  [24, "	Predicción y modelos estadísticos para el análisis de datos	"],
  [25, "	Big Data, analítica e inteligencia artificial	"],
  [26, "	Gestión del conocimiento, aprendizaje organizacional y mentoring	"],
  [
    27,
    "	Capacitación de autores a partir de una estrategia pedagógica para el desarrollo de contenidos en procesos misionales y de apoyo de la DIAN	",
  ],
  [
    28,
    "	Capacitación de tutores en estrategia pedagógica para entornos virtuales	",
  ],
  [29, "	Diseño curricular para la capacitación basada en competencias	"],
  [30, "	Legislación documental en el entorno organizacional	"],
  [31, "	Organización documental	"],
  [32, "	Gestión documental para fines especificos	"],
  [33, "	Planeación y valoración de la gestión documental	"],
  [34, "	Comunicación interpersonal en el contexto laboral	"],
  [
    35,
    "	Técnicas de comunicación: Entrevista, presentaciones orales y escritas	",
  ],
  [36, "	Habilidades cognitivas para afrontar situaciones de cambio	"],
  [37, "	Efectividad personal en el ámbito laboral 	"],
  [38, "	Diversidad y cultura organizacional	"],
  [39, "	Toma de decisiones en situaciones de incertidumbre, estrés y riesgo	"],
  [40, "	Equipos efectivos y de alto desempeño	"],
  [41, "	Negociación y desescalamiento del conflicto  en situaciones laborales	"],
  [42, "	Planeación y ejecución operativa	"],
  [
    43,
    "	Análisis de entornos y administración de la interdependencia organizacional	",
  ],
  [44, "	Dirección estratégica: Capacidades, estructuras, procesos y personas	"],
  [45, "	Administración del cambio y la dinámica organizacional	"],
  [46, "	Estilos de liderazgo y toma de decisiones	"],
  [47, "	Influencia y motivación de equipos de trabajo	"],
  [48, "	Supervisión de equipos de trabajo	"],
  [49, "	Administración de las crisis y el conflicto	"],
  [50, "	Diplomado NIC-NIIF	"],
  [51, "	Modelos de negocio y financiación	"],
  [52, "	Auditoría fiscal TACI y detección del fraude	"],
  [53, "	Investigación del fraude fiscal	"],
  [54, "	Análisis de caso del fraude fiscal en la auditoría TACI	"],
  [55, "	Metodologías de la investigación fiscal	"],
  [56, "	Fuentes de información digital y fiscalización internacional	"],
  [57, "	Análisis de datos y toma de decisiones en la investigación fiscal	"],
  [
    58,
    "	Diplomado en régimen probatorio con énfasis tributario, aduanero y cambiario, a partir de una estrategia pedagógica y de contenidos.	",
  ],
  [59, "	Fundamentos de la Operación Aduanera	"],
  [60, "	Actualización en Régimen jurídico aduanero. Estudio de casos.	"],
  [61, "	Auditoría y control a la gestión aduanera 	"],
  [62, "	Derecho aduanero comparado internacional 	"],
  [
    63,
    "	Programa en Clasificación Arancelaria. Módulo 1: Clasificación arancelaria aplicada	",
  ],
  [
    64,
    "	Programa en Clasificación Arancelaria. Módulo 2: clasificación arancelaria de profundización por sectores de la Industria	",
  ],
  [
    65,
    "	Control y auditoría de operaciones de comercio exterior por sectores especializados	",
  ],
  [66, "	Legislación aduanera comparada en sectores especializados	"],
  [67, "	Diplomado OEA	"],
  [68, "	Diplomado Técnica Aduanera	"],
  [69, "	Toma de muestras para pruebas físico-químicas 	"],
  [
    70,
    "	Validación de metodologías analíticas y buenas prácticas de laboratorio.	",
  ],
  [71, "	Norma ISO 17025 y Sistema de gestión en laboratorios 	"],
  [72, "	Herramientas de investigación Jurídica 	"],
  [73, "	Genésis del acto administrativo en materia TACI	"],
  [74, "	Análisis del precedente judicial en Colombia y la ratio decidendi 	"],
  [75, "	Análisis del Riesgo Jurídico en actuación administrativa	"],
  [76, "	Daño Antijurídico	"],
  [77, "	Daño Antijurídico: Medios de impugnación TACI en sede administrativa	"],
  [
    78,
    "	Daño Antijurídico: Estudio Teórico Práctico de Líneas JurisprudencialesTACI	",
  ],
  [79, "	Daño Antijurídico: Técnica legislativa TACI	"],
  [80, "	Habilidades de Oratoria Jurídica	"],
  [81, "	Probatorio Penal: Medios de Prueba.	"],
  [
    82,
    "	Jurisprudencia y aspectos prácticos de las pruebas en el sistema penal acusatorio 	",
  ],
  [83, "	Análisis del Riesgo Jurídico en materia penal	"],
  [
    84,
    "	Introducción a contabilidad y finanzas para juristas y otras profesiones	",
  ],
  [85, "	Contabilidad para la interpretación de peritazgo técnico	"],
  [86, "	Finanzas para la interpretación de peritazgo técnico	"],
  [
    87,
    "	Curso de recaudación - Módulo 2 Control de entidades autorizadas a recaudar	",
  ],
  [88, "	Curso de recaudación - Módulo 3 Devoluciones y/o compensaciones	"],
  [
    89,
    "	Introducción a la contabilidad para entidades recaudadoras y otras entidades públicas	",
  ],
  [
    90,
    "	Contabilidad para entidades recaudadoras y otras entidades públicas – Activos y Pasivos	",
  ],
  [
    91,
    "	Contabilidad para entidades recaudadoras y otras entidades públicas – Información presentada	",
  ],
  [92, "	Análisis Financiero	"],
  [
    93,
    "	Programa en Conocimientos Académicos en Administración de Cartera - Modulo 1 Función Cartera y Modulo 2 Facilidades de pago	",
  ],
  [
    94,
    "	Programa en Conocimientos Académicos en Administración de Cartera - Módulo 3 Cobro Persuasivo, Módulo 4 Medidas Cautelares, Módulo 5 Cobro Coactivo y Módulo 8 Jurisprudencia y Doctrina	",
  ],
  [
    95,
    "	Programa en Conocimientos Académicos en Administración de Cartera - Módulo 6 Procesos especiales.	",
  ],
  [
    96,
    "	Información financiera para diferentes tipos de entidades y su análisis	",
  ],
  [97, "	Introducción normativa al proceso de comercialización	"],
  [
    98,
    "	Normativa de las modalidades de disposición de mercancías ADA en la DIAN 	",
  ],
  [99, "	Análisis y gestión de procesos y operaciones	"],
  [100, "	Gestión estratégica de la cadena de suministro	"],
  [101, "	Gestión del riesgo logístico-operativo	"],
  [
    102,
    "	Planeación financiera y comercial: Modelos de toma de decisión y gestión por indicadores	",
  ],
  [103, "	Fundamentos en gestión de operaciones de instalaciones físicas	"],
  [104, "	Administración de los recursos físicos en el Estado colombiano.	"],
  [105, "	Gestión de riesgos operacionales.	"],
  [106, "	Administración de bienes inmuebles recibidos en dación de pago.	"],
  [107, "	Gestión de proyectos de infraestructura	"],
  [
    108,
    "	Metodologías para la presentación de proyectos en contexto internacional	",
  ],
  [109, "	Formulación de proyectos	"],
  [110, "	Modelos de planeación	"],
  [111, "	Ejecución, seguimiento y evaluación de proyectos	"],
  [112, "	Diseño y gestión de proyectos con MS Project	"],
  [113, "	Evaluación de impacto institucional y propuestas de mejora	"],
  [114, "	Proceso administrativo y desarrollo organizacional	"],
  [115, "	Gestion de procesos	"],
  [116, "	Gestión de la calidad	"],
  [117, "	Alta dirección en gestión y liderazgo estratégico	"],
  [118, "	Estructuración del ecosistema digital	"],
  [119, "	Estrategia del marketing digital	"],
  [120, "	Comunicaciones de marketing en medios digitales	"],
  [121, "	Diseño de estrategias de contenido, medición y análisis	"],
  [122, "	Arquitectura y administración de seguridad de la información.	"],
  [123, "	Análisis forense y evidencia digital	"],
  [124, "	Gestión de continuidad del negocio y riesgos.	"],
  [125, "	Administración y gerencia de seguridad de la información	"],
  [126, "	Sistema presupuestal colombiano y hacienda pública	"],
  [127, "	Gestión del proceso contable, presupuestal y de tesorería	"],
  [128, "	Introducción a la contabilidad presupuestal y pública	"],
  [129, "	Matemáticas financieras en Excel	"],
  [130, "	Gestión financiera pública	"],
  [
    131,
    "	Taller de armonización del catálogo presupuestal y contable - Caso DIAN	",
  ],
  [
    132,
    "	Taller en presupuesto, contabilidad, tesorería y control de gestión - Casos DIAN	",
  ],
  [133, "	Función del Control Interno	"],
  [134, "	Ejecución de la Auditoría Interna	"],
  [135, "	Evaluación del sistema de control interno	"],
  [
    136,
    "	Entrenamiento para certificaciones de auditoría en sistemas de gestión	",
  ],
  [137, "	Entrenamiento para certificaciones específicas del rol de auditoría	"],
  [138, "	Modelos de auditoría avanzada	"],
  [139, "	Generalidades de riesgo"],
  [140, "	Identificación y evaluación de riesgo estratégico	"],
  [141, "	Gestión de riesgos operativos y de cumplimiento	"],
  [142, "	Entrenamiento para certificaciones en auditoría de riesgos	"],
  [143, "	Aspectos Constitucionales del Servicio Público	"],
  [144, "	Procedimiento Administrativo y contencioso administrativo	"],
  [145, "	Técnicas de procedimiento disciplinario verbal	"],
  [146, "	Aplicación del Régimen Disciplinario	"],
  [147, "	Régimen probatorio	"],
  [148, "	Taller de pliego de cargos	"],
  [149, "	Jurisprudencia y doctrina	"],
  [150, "	Redacción jurídica en fallos primera y segunda instancia	"],
  [
    151,
    "	Principios constitucionales (Control de Convencionalidad en el Derecho Disciplinario)	",
  ],
  [
    152,
    "	Planeación Estratégica del servicio, Gerencia de Clientes, Gestión de Brechas 	",
  ],
  [153, "	Diseño de Servicio: Gestión de errores y fallas de servicio	"],
  [154, "	Diseño de Servicio: Proceso y procedimientos	"],
  [155, "	Diseño de experiencias de servicio	"],
  [156, "	Técnicas y pedagogías para intervenir en cultura de la contribución	"],
  [157, "	Apertura a la investigación en servicio	"],
  [158, "	Herramientas para la construcción de investigaciones en servicios	"],
  [159, "	Divulgación de la investigación en servicios	"],
  [
    160,
    "	Liderazgo, proyección y seguimiento de resultados de investigaciones de usuario	",
  ],
  [161, "	Gestión estratégica del recurso humano	"],
  [162, "	Salud y seguridad en el trabajo	"],
  [163, "	Análisis y valoración de riesgos laborales	"],
  [164, "	Desarrollo de personal: Capacitación y competencias	"],
  [165, "	Calidad de vida en el trabajo	"],
  [166, "	Planeación curricular y aseguramiento de la calidad educativa	"],
  [167, "	Gestión de la calidad en servicios de gestión humana 	"],
  [168, "	Innovación curricular	"],
  [169, "	Normativa en gestión humana 	"],
  [170, "	Gestión Humana: Cultura organizacional	"],
  [171, "	Políticas y programas de talento humano para la gestión del cambio 	"],
  [172, "	Mejoramiento del proceso de gestión humana 	"],
  [173, "	Arquitectura Empresarial	"],
  [174, "	Computación en la nube	"],
  [175, "	Gestión de datos 	"],
  [176, "	Gobierno de datos	"],
  [177, "	Tendencias tecnológicas aplicadas al negocio	"],
  [178, "	Gestión de servicios informáticos	"],
  [
    179,
    "	Diseño de servicios digitales (Design thinking y experiencia de usuario)	",
  ],
  [180, "	Transformación Digital: casos de éxito e implementación 	"],
  [181, "	Gestión de proyectos TI	"],
  [182, "	Gestión de portafolio de proyectos de TI 	"],
  [183, "	Vigilancia tecnológica y Planeación estratégica en TI 	"],
  [184, "	Alineación Estratégica de TI 	"],
];
