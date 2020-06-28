'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
var tools = require('../utils/tools.js');
const cuestionarioHandler = require('../../models/Cuestionario.model')
const usuario = require('../../models/user_j.model')
const subgrupo = require('../../models/subdireccion.model')
const coordinacion = require('../../models/coordinacion.model')
const cursoHandler = require('../../models/curso.model')
const PreguntasHandler = require('../../models/preguntas_w.model')
const preguntas_seccionIII = require('../utils/preguntasSeccionIII.js');

module.exports = {
    Cuestionario:Cuestionario,
    completadas:completadas,
    actualizarCompetencia:actualizarCompetencia,
    actualizarPregunta:actualizarPregunta,
    actualizarEstadoCuestionario:actualizarEstadoCuestionario,
    buscarCuestionarioCorreo:buscarCuestionarioCorreo,    
    CuestionarioConsulta:CuestionarioConsulta
}

function actualizarPreguntaIII(req,res){
    try {
        var actu = async(req,res)=>{
            var dec = tools.decryptJson(req.body.data);
            cuestionarioHandler.findOne({email:dec.data.email},(err,cuestionarioBuscado)=>{
                if(err){
                    console.log(err);
                }
                if(!cuestionarioBuscado){
                    return res.status(200).send({
                        estado: 'cuestionario no encontrado',
                        message: util.format('cuestionario no encontrado'),
                        data: Object.assign({})
                    });
                }
                cuestionarioBuscado.listado_preguntas_seccion_iii.forEach(preguntaBuscada=>{
                    if(preguntaBuscada.id_pregunta == dec.data.id_pregunta){
                        preguntaBuscada.valor_respuesta = dec.data.valor_respuesta;
                        preguntaBuscada.estado_preguntas = dec.data.estado_respuesta;
                    }
                });
                cuestionarioHandler.updateOne({email:dec.data.email},cuestionarioBuscado).then(()=>{
                    return res.status(200).send({
                        estado: 'PreguntaIII Actualizada',
                        message: util.format('PreguntaIII Actualizada'),
                        data: Object.assign(cuestionarioBuscado)
                    });
                })
            })
        }
        actu(req,res);
    } catch (error) {
        
    }
}

function buscarCuestionarioCorreo(req,res){
    try {
        var buscar = async(req,res)=>{
            console.log(req.body);
            var dec = tools.decryptJson(req.body.data);
            
            cuestionarioHandler.findOne({email:dec.data.email},(err,cuestionarioBuscado)=>{
                if(err){
                    console.log(err)
                }
                if(!cuestionarioBuscado){
                    return res.status(200).send({
                        estado: 'No existe el cuestionario',
                        message: util.format('no existe el cuestionario')
                    });
                }
                return res.status(200).send({
                    estado: 'Cuestionario encontrado',
                    message: util.format('Cuestionario encontrado'),
                    data: Object.assign(cuestionarioBuscado)
                });
            });
        }
        buscar(req,res);
    } catch (error) {
        throw boom.boomify(err)
    }

}

function actualizarEstadoCuestionario(req, res) {
    try {
        var actualizando = async (req, res) => {
            var dec = tools.decryptJson(req.body.data);
            var respondido = true;
            cuestionario.findOne({ email: dec.data.email }, (err, cuestionarioBuscado) => {
                if (err) {
                    console.log(err)
                }
                if (!cuestionarioBuscado) {
                    return res.status(601).send({
                        estado: 'No existe el cuestionario',
                        message: util.format('no existe el cuestionario')
                    });
                }

                if (respondido) {
                    cuestionarioBuscado.listado_competencias.forEach(element => {
                        if (element.estado_respuesta != 'Respondida') {
                            respondido = false;
                            break;
                        }
                    });
                }
                if (respondido) {
                    cuestionarioBuscado.listado_preguntas.forEach(element => {
                        if (element.estado_respuesta != 'Respondida') {
                            respondido = false;
                            break;
                        }
                    });
                }
                if (respondido) {
                    cuestionarioBuscado.listado_preguntas_seccion_iii.forEach(element => {
                        if (element.estado_respuesta != 'Respondida') {
                            respondido = false;
                            break;
                        }
                    });
                }

                if (respondido) {
                    cuestionarioBuscado.estado_cuestionario = 'Respondido';
                    cuestionario.updateOne({ email: dec.data.email }, cuestionarioBuscado).then(() => {
                        return res.status(200).send({
                            estado: 'Exito',
                            message: util.format('cuestionario actualizado'),
                            data: Object.assign(cuestionarioBuscado)
                        });

                    })
                } else {
                    return res.status(200).send({
                        estado: 'no se actualizo cuestionario',
                        message: util.format('no se han respondido todos los campos'),
                        data: Object.assign(cuestionarioBuscado)
                    });
                }

            })
        }
        actualizando(req, res);
    } catch (error) {
        throw boom.boomify(err)
    }
}

function actualizarPregunta(req, res) {
    try {
        var actualizando = async (req, res) => {
            var dec = tools.decryptJson(req.body.data);

            cuestionarioHandler.findOne({ email: dec.data.email }, (err, cuestionarioBuscado) => {
                if (err) {
                    console.log(err)
                }
                if (!cuestionarioBuscado) {
                    return res.status(601).send({
                        estado: 'No existe el cuestionario',
                        message: util.format('no existe el cuestionario')
                    });
                }

                cuestionarioBuscado.listado_preguntas.forEach(element => {
                    if (element.id_pregunta == dec.data.id_pregunta) {

                        element.valor_respuesta = dec.data.valor_respuesta;
                        element.estado_respuesta = dec.data.estado_respuesta;
                    }
                });
                cuestionarioHandler.updateOne({ email: dec.data.email }, cuestionarioBuscado).then(() => {
                    return res.status(200).send({
                        estado: 'Exito',
                        message: util.format('cuestionario actualizado'),
                        data: Object.assign(cuestionarioBuscado)
                    });

                })

            })
        }
        actualizando(req, res);
    } catch (error) {
        throw boom.boomify(err)
    }
}


function actualizarCompetencia(req, res) {
    try {
        var actualizando = async (req, res) => {
            var dec = tools.decryptJson(req.body.data);

            cuestionarioHandler.findOne({ email: dec.data.email }, (err, cuestionarioBuscado) => {
                if (err) {
                    console.log(err)
                }
                if (!cuestionarioBuscado) {
                    return res.status(601).send({
                        estado: 'No existe el cuestionario',
                        message: util.format('no existe el cuestionario')
                    });
                }

                cuestionarioBuscado.listado_competencias.forEach(element => {
                    if (element.nombreCompetencia == dec.data.competencia) {
                        element.valor_respuesta = dec.data.valor_respuesta;
                        element.estado_respuesta = dec.data.estado_respuesta;
                    }
                });
                cuestionarioHandler.updateOne({ email: dec.data.email }, cuestionarioBuscado).then(() => {
                    return res.status(200).send({
                        estado: 'Exito',
                        message: util.format('cuestionario actualizado'),
                        data: Object.assign(cuestionarioBuscado)
                    });

                })

            })

        }
        actualizando(req, res);
    } catch (error) {
        throw boom.boomify(err)
    }
}

function completadas(req, res) {
    try {
        var traer = async (req, res) => {
            var respondidas = 0;
            var noRespondidas = 0;
            cuestionarioHandler.find((err, cuestionarios) => {
                if (err) {
                    console.log(err);
                }
                if (!cuestionarios) {
                    return res.status(200).send({
                        estado: 'No Hay Cuestionarios',
                        message: util.format(err)
                    });
                }

                cuestionarios.forEach(element => {
                    console.log(element);
                    if (element.estado_cuestionario == 'Pendiente') {
                        noRespondidas++;
                    } else {
                        respondidas++;
                    }
                });
                var encuestasRespondidas = {
                    resueltas: respondidas,
                    norespondidas: noRespondidas
                }
                return res.status(200).send({
                    estado: 'Exito',
                    message: util.format('contestadas'),
                    data: Object.assign(encuestasRespondidas)
                });

            })
        }
        traer(req, res);
    } catch (error) {
        throw boom.boomify(err)
    }
}
function Cuestionario(req, res) {
    try {
        var agregar = async (req, res) => {
            var newCuestionario;
            var cues = (tools.decryptJson(req.body.data))
            var competencias = [];
            var encontrado = false;
            var cursos = [];
            console.log(cues);
            await cuestionarioHandler.findOne({ email: cues.email }, (err, cuestionario) => {
                if (err) {
                    console.log(err);
                    return res.status(601).send({
                        estado: 'error',
                        message: util.format(err),
                        data: Object.assign({})
                    });
                }
                if (!cuestionario) {
                    newCuestionario = {
                        id_Cuestionario: cues.email,
                        email: cues.email,
                        coordinacion: cues.coordinacion,
                        rol: cues.rol,
                        subgrupo: cues.subgrupo,
                        seccional: cues.seccional,
                        listado_competencias: [],
                        listado_cursos: [],
                        listado_preguntas: [],
                        listado_preguntas_seccion_iii: [],
                        estado_cuestionario: "Pendiente"
                    }
                    subgrupo.findOne({ nombre: cues.subgrupo }, (err, subgrupoElegido) => {

                        if (err) {
                            console.log(err);
                            return res.status(601).send({
                                estado: 'error',
                                message: util.format(err),
                                data: Object.assign({})
                            });
                        }

                        //console.log(subgrupoElegido)
                        if (subgrupoElegido.cursos.length != 0) {
                            subgrupoElegido.cursos.forEach(cursoSubGrupo => {
                                if (cursoSubGrupo.cargos.length != 0) {
                                    cursoSubGrupo.cargos.forEach(cargoCurso => {
                                        if (cargoCurso == cues.rol) {
                                            //TODO ACTIVAR
                                            // cursos.push({ idCurso: cursoCoordinacion.idCurso });
                                        }
                                    });
                                }
                            })
                        }
                        coordinacion.findOne({ nombre: cues.coordinacion }, (err, coordinacionObtenida) => {
                            if (err) {
                                console.log(err);
                                return res.status(601).send({
                                    estado: 'error',
                                    message: util.format(err),
                                    data: Object.assign({})
                                });
                            }

                            console.log(coordinacionObtenida)
                            cursos = [];
                            //TODO: VALIDACION DE SI SI SELECCIONÓ COORDINACIÓN O GIT
                            if (coordinacionObtenida.cursos.length != 0) {
                                coordinacionObtenida.cursos.forEach(cursoCoordinacion => {
                                    if (cursoCoordinacion.cargos.length != 0) {
                                        cursoCoordinacion.cargos.forEach(cargoCurso => {
                                            if (cargoCurso == cues.rol) {
                                                cursos.push(cursoCoordinacion.idCurso);
                                            }
                                        });
                                    }
                                })
                            }
                            console.log(cursos);

                            cursos.forEach(cursoEspecifico => {
                                newCuestionario.listado_cursos.push({ idCurso: cursoEspecifico })
                            })

                            cursoHandler.find((err, listadoCursosObtenidos) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(601).send({
                                        estado: 'error',
                                        message: util.format(err),
                                        data: Object.assign({})

                                    });
                                }

                                var competenciasGuardar = []
                                newCuestionario.listado_cursos.forEach(cursoEspecifico => {
                                    listadoCursosObtenidos.forEach(cursoObtenido => {
                                        if (cursoObtenido.consecutivo == cursoEspecifico.idCurso) {
                                            console.log(competencias.includes(cursoObtenido.competencia))
                                            if (!competencias.includes(cursoObtenido.competencia)) {
                                                competencias.push(cursoObtenido.competencia);
                                                competenciasGuardar.push({
                                                    nombreCompetencia: cursoObtenido.competencia,
                                                    descripcionCompetencia: cursoObtenido.descripcion_competencia
                                                })
                                            }
                                        }
                                    })
                                })
                                newCuestionario.listado_competencias = competenciasGuardar
                                preguntas_seccionIII.preguntasMock.forEach(preguntaSeccionIII => {
                                    newCuestionario.listado_preguntas_seccion_iii.push({ id_pregunta: preguntaSeccionIII.idPregunta })
                                })
                                //  newCuestionario.listado_competencias = competencias
                                PreguntasHandler.find({ codificacion: { $in: cursos } }, (err, listadoPreguntas) => {
                                    listadoPreguntas.forEach(preguntaEspecifica => {
                                        newCuestionario.listado_preguntas.push({ id_pregunta: preguntaEspecifica.numero_pregunta })
                                    })
                                    console.log(newCuestionario)
                                    var CuestionarioGuardar = new cuestionarioHandler(newCuestionario);
                                    CuestionarioGuardar.save((err, cuestionarioCreado) => {
                                        if (err) {
                                            return res.status(601).send({
                                                estado: 'error',
                                                message: util.format(err),
                                                data: Object.assign({})
                                            });
                                        }
                                        if (cuestionarioCreado) {
                                            // console.log(cuestionarioCreado);
                                            return res.status(200).send({
                                                estado: 'Exito',
                                                message: util.format('Cuestionario registrado Exitosamente'),
                                                data: Object.assign(cuestionarioCreado)
                                            });
                                        } else {
                                            return res.status(601).send({
                                                estado: 'Error',
                                                message: util.format('No fue posible crear el Cuestionario'),
                                                data: Object.assign({})
                                            });
                                        }

                                    })

                                })
                            })


                        });
                    });
                } else {
                    return res.status(200).send({
                        estado: 'Ya existe el cuestionario',
                        message: util.format('Ya existe el cuestionario'),
                        data: Object.assign(cuestionario)
                    });
                }
            })
        }
        agregar(req, res);
    } catch (error) {
        throw boom.boomify(err)
    }
}


function CuestionarioConsulta(req, res) {
    try {
        var agregar = async (req, res) => {
            var newCuestionario;
            var cues = (tools.decryptJson(req.body.data))
            var competencias = [];
            var fechaCorreo =  "Prueba."+tools.getFechaActual()+"@dian.gov.co"
            var encontrado = false;
            var cursos = [];
            console.log(cues);
            newCuestionario = {
                id_Cuestionario: fechaCorreo,
                email:fechaCorreo,
                coordinacion: cues.coordinacion,
                rol: cues.rol,
                subgrupo: cues.subgrupo,
                seccional: cues.seccional,
                listado_competencias: [],
                listado_cursos: [],
                listado_preguntas: [],
                listado_preguntas_seccion_iii: [],
                estado_cuestionario: "Pendiente"
            }
            subgrupo.findOne({ nombre: cues.subgrupo }, (err, subgrupoElegido) => {

                if (err) {
                    console.log(err);
                    return res.status(601).send({
                        estado: 'error',
                        message: util.format(err),
                        data: Object.assign({})
                    });
                }

                //console.log(subgrupoElegido)
                if (subgrupoElegido.cursos.length != 0) {
                    subgrupoElegido.cursos.forEach(cursoSubGrupo => {
                        if (cursoSubGrupo.cargos.length != 0) {
                            cursoSubGrupo.cargos.forEach(cargoCurso => {
                                if (cargoCurso == cues.rol) {
                                    //TODO ACTIVAR
                                    // cursos.push({ idCurso: cursoCoordinacion.idCurso });
                                }
                            });
                        }
                    })
                }
                coordinacion.findOne({ nombre: cues.coordinacion }, (err, coordinacionObtenida) => {
                    if (err) {
                        console.log(err);
                        return res.status(601).send({
                            estado: 'error',
                            message: util.format(err),
                            data: Object.assign({})
                        });
                    }

                    console.log(coordinacionObtenida)
                    cursos = [];
                    //TODO: VALIDACION DE SI SI SELECCIONÓ COORDINACIÓN O GIT
                    if (coordinacionObtenida.cursos.length != 0) {
                        coordinacionObtenida.cursos.forEach(cursoCoordinacion => {
                            if (cursoCoordinacion.cargos.length != 0) {
                                cursoCoordinacion.cargos.forEach(cargoCurso => {
                                    if (cargoCurso == cues.rol) {
                                        cursos.push(cursoCoordinacion.idCurso);
                                    }
                                });
                            }
                        })
                    }
                    console.log(cursos);

                    cursos.forEach(cursoEspecifico => {
                        newCuestionario.listado_cursos.push({ idCurso: cursoEspecifico })
                    })

                    cursoHandler.find((err, listadoCursosObtenidos) => {
                        if (err) {
                            console.log(err);
                            return res.status(601).send({
                                estado: 'error',
                                message: util.format(err),
                                data: Object.assign({})

                            });
                        }

                        var competenciasGuardar = []
                        newCuestionario.listado_cursos.forEach(cursoEspecifico => {
                            listadoCursosObtenidos.forEach(cursoObtenido => {
                                if (cursoObtenido.consecutivo == cursoEspecifico.idCurso) {
                                    console.log(competencias.includes(cursoObtenido.competencia))
                                    if (!competencias.includes(cursoObtenido.competencia)) {
                                        competencias.push(cursoObtenido.competencia);
                                        competenciasGuardar.push({
                                            nombreCompetencia: cursoObtenido.competencia,
                                            descripcionCompetencia: cursoObtenido.descripcion_competencia
                                        })
                                    }
                                }
                            })
                        })
                        newCuestionario.listado_competencias = competenciasGuardar
                        preguntas_seccionIII.preguntasMock.forEach(preguntaSeccionIII => {
                            newCuestionario.listado_preguntas_seccion_iii.push({ id_pregunta: preguntaSeccionIII.idPregunta })
                        })
                        //  newCuestionario.listado_competencias = competencias
                        PreguntasHandler.find({ codificacion: { $in: cursos } }, (err, listadoPreguntas) => {
                            listadoPreguntas.forEach(preguntaEspecifica => {
                                newCuestionario.listado_preguntas.push({ id_pregunta: preguntaEspecifica.numero_pregunta })
                            })
                            var CuestionarioGuardar = new cuestionarioHandler(newCuestionario);
                            CuestionarioGuardar.save((err, cuestionarioCreado) => {
                                if (err) {
                                    return res.status(601).send({
                                        estado: 'error',
                                        message: util.format(err),
                                        data: Object.assign({})
                                    });
                                }
                                if (cuestionarioCreado) {
                                    // console.log(cuestionarioCreado);
                                    newCuestionario = {
                                        id_Cuestionario: fechaCorreo,
                                        email: fechaCorreo,
                                        coordinacion: cues.coordinacion,
                                        rol: cues.rol,
                                        subgrupo: cues.subgrupo,
                                        seccional: cues.seccional,
                                        listado_competencias: "",
                                        listado_cursos: "",
                                        listado_preguntas: "",
                                        listado_preguntas_seccion_iii: "",
                                        estado_cuestionario: "Pendiente"
                                    }
                                    var temp =""
                                    cuestionarioCreado.listado_competencias.forEach(cursoObtenido => {
                                        temp+=""+cursoObtenido.nombreCompetencia+" "
                                    })
                                    newCuestionario.listado_competencias = temp

                                    temp =""
                                    cuestionarioCreado.listado_cursos.forEach(cursoObtenido => {
                                        temp+=""+cursoObtenido.idCurso+" "
                                    })
                                    newCuestionario.listado_cursos = temp

                                    temp =""
                                    cuestionarioCreado.listado_preguntas.forEach(cursoObtenido => {
                                        temp+=""+cursoObtenido.id_pregunta+" "
                                    })
                                    newCuestionario.listado_preguntas = temp

                                    temp =""
                                    cuestionarioCreado.listado_preguntas_seccion_iii.forEach(cursoObtenido => {
                                        temp+=""+cursoObtenido.id_pregunta+" "
                                    })
                                    newCuestionario.listado_preguntas_seccion_iii = temp
                                    console.log(newCuestionario)

                                    return res.status(200).send({
                                        estado: 'Exito',
                                        message: util.format('Cuestionario registrado Exitosamente'),
                                        data: Object.assign(newCuestionario)
                                    });
                                } else {
                                    return res.status(601).send({
                                        estado: 'Error',
                                        message: util.format('No fue posible crear el Cuestionario'),
                                        data: Object.assign({})
                                    });
                                }

                            })

                        })
                    })


                });
            })
        }
        agregar(req, res);
    } catch (error) {
        throw boom.boomify(err)
    }
}

function traerCompetencias(seccional) {
    console.log(seccional);
    var competencias = [];
    var encontrado = false;
    var cursos = [];
    subgrupo.findOne({ seccional: seccional }, (err, subgrupos) => {
        if (err) {
            console.log(err);
        }
        console.log(subgrupos)
        if (subgrupos.length != 0) {
            subgrupos.array.forEach(element => {
                cursos.push(element.idCurso);
            });
        }
        coordinacion.findOne({ seccional: seccional }, (err, coordinacion) => {
            if (err) {
                console.log(err);
            }
            console.log(coordinacion)
            if (coordinacion.length != 0) {
                coordinacion.array.forEach(element => {
                    cursos.push(element.idCurso);
                });
            }
            if (cursos.length == 0) {
                return [];
            } else {
                cursos.array.forEach(element => {

                    curso.findOne({ consecutivo: element }, (err, cursobuscado) => {
                        if (err) {
                            console.log(err);
                        }
                        competencias.array.forEach(compe => {
                            if (cursobuscado === compe) {
                                encontrado = true;
                            }
                        });

                        if (!encontrado) {
                            competencias.push({ nombre_competencia: cursobuscado.competencia });
                        } else {
                            encontrado = false;
                        }
                    })
                });
                return competencias;
            }
        });
    });
}

function traerPreguntas(seccional) {
    var cursos = [];
    var encontrado = false;
    subgrupo.findOne({ seccional: seccional }, (err, subgrupos) => {
        if (err) {
            console.log(err);
        }
        subgrupos.cursos.array.forEach(element => {
            cursos.array.forEach(cur => {
                if (element.idCurso === cur.idCurso) {
                    encontrado = true;
                }
            });

            if (!encontrado) {
                cursos.push({ id_pregunta: element.idCurso });
            } else {
                encontrado = false;
            }
        });
    })
    coordinacion.findOne({ seccional: seccional }, (err, coordinacion) => {
        if (err) {
            console.log(err);
        }
        coordinacion.cursos.array.forEach(element => {
            cursos.array.forEach(cur => {
                if (element.idCurso === cur.idCurso) {
                    encontrado = true;
                }
            });

            if (!encontrado) {
                cursos.push({ id_pregunta: element.idCurso });
            } else {
                encontrado = false;
            }
        });
    })
    return cursos;
}

function traerPreguntas3(seccional) {
    return [];
}