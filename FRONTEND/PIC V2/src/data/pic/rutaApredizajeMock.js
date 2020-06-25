
const rutaAprendizaje = {
    idColaborador: "623",
    fechaCreacion: "01/03/1996",
    fechaActualizacion: "27/05/2020",
    numeroPagina: "1",
    numeroTotalPagina: "2",
    elementosPagina: "10",
    totalItems: "20",
    listado_competencias: [
        {
            nombre_competencia: "Identificación de conductas objeto de sanción fiscal",
            colorEstado_basico: "primary", //primary/#b69329/error
            colorEstado_medio: "#b69329", //primary/#b69329/error
            colorEstado_alto: "error", //primary/#b69329/error
            colorEstado_superior: "error", //primary/#b69329/error
            listado_cursos_basicos: [{
                idCurso: "01",
                nombreCurso: "Diplomado NIC-NIIF",
                fechaActualizacion: "27/05/2020",
                estado: "Aprobado",
                nivel: "BÁSICO",
                colorEstado: "primary" //primary/#b69329/error
            },
            {
                idCurso: "02",
                nombreCurso: "Modelos de negocio y financiación",
                fechaActualizacion: "27/05/2020",
                estado: "Aprobado",
                nivel: "BÁSICO",
                colorEstado: "primary" //primary/#b69329/error
            }
            ],
            listado_cursos_medios: [
                {
                    idCurso: "03",
                    nombreCurso: "Auditoría fiscal TACI y detección del fraude",
                    competencia: "Identificación de conductas objeto de sanción fiscal",
                    fechaActualizacion: "27/05/2020",
                    estado: "Cursando",
                    nivel: "MEDIO",
                    colorEstado: "#DFD800" //primary/#b69329/error
                },
                {
                    idCurso: "04",
                    nombreCurso: "Investigación del fraude fiscal",
                    competencia: "Identificación de conductas objeto de sanción fiscal",
                    fechaActualizacion: "27/05/2020",
                    estado: "Aprobado",
                    nivel: "MEDIO",
                    colorEstado: "primary" //primary/#b69329/error
                }
            ],
            listado_cursos_altos: [
                {
                    idCurso: "05",
                    nombreCurso: "Análisis de caso del fraude fiscal en la auditoría TACI",
                    competencia: "Identificación de conductas objeto de sanción fiscal",
                    fechaActualizacion: "27/05/2020",
                    estado: "Por Cursar",
                    nivel: "ALTO",
                    colorEstado: "error" //primary/#b69329/error
                },
                {
                    idCurso: "06",
                    nombreCurso: "Metodologías de la investigación fiscal",
                    competencia: "Identificación de conductas objeto de sanción fiscal",
                    fechaActualizacion: "27/05/2020",
                    estado: "Cursando",
                    nivel: "ALTO",
                    colorEstado: "#DFD800" //primary/#b69329/error
                }
            ],
            listado_cursos_superiores: [
                {
                    idCurso: "07",
                    nombreCurso: "Fuentes de información digital y fiscalización internacional",
                    competencia: "Identificación de conductas objeto de sanción fiscal",
                    fechaActualizacion: "27/05/2020",
                    estado: "Por Cursar",
                    nivel: "SUPERIOR",
                    colorEstado: "error" //primary/#b69329/error
                },
                {
                    idCurso: "08",
                    nombreCurso: "Análisis de datos y toma de decisiones en la investigación fiscal",
                    competencia: "Identificación de conductas objeto de sanción fiscal",
                    fechaActualizacion: "27/05/2020",
                    estado: "Por Cursar",
                    nivel: "SUPERIOR",
                    colorEstado: "error" //primary/#b69329/error
                }
            ],
        },
    ]
}

export default rutaAprendizaje;

