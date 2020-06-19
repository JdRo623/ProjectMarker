
const rutaAprendizaje = {
    idColaborador: "623",
    fechaCreacion: "01/03/1996",
    fechaActualizacion: "27/05/2020",
    numeroPagina: "1",
    numeroTotalPagina: "2",
    elementosPagina: "10",
    totalItems: "20",
    competencias: [
        {
            nombre_competencia: "Identificación de conductas objeto de sanción fiscal",
            colorEstado_basico: "primary", //primary/#b69329/error
            colorEstado_medio: "#b69329", //primary/#b69329/error
            colorEstado_alto: "error", //primary/#b69329/error
            colorEstado_superior: "error", //primary/#b69329/error
            cursos_basicos: [{
                idCurso: "01",
                nombreCurso: "Diplomado NIC-NIIF",
                fechaActualizacion: "27/05/2020",
                estado: "Aprobado",
                nivel: "BÁSICO",
                colorEstado: "primary" //primary/warning/error
            },
            {
                idCurso: "02",
                nombreCurso: "Modelos de negocio y financiación",
                fechaActualizacion: "27/05/2020",
                estado: "Aprobado",
                nivel: "BÁSICO",
                colorEstado: "primary" //primary/secondary/error
            }
            ],
            cursos_medios: [
                {
                    idCurso: "03",
                    nombreCurso: "Auditoría fiscal TACI y detección del fraude",
                    competencia: "Identificación de conductas objeto de sanción fiscal",
                    fechaActualizacion: "27/05/2020",
                    estado: "Cursando",
                    nivel: "MEDIO",
                    colorEstado: "#b69329" //primary/#b69329/error
                },
                {
                    idCurso: "04",
                    nombreCurso: "Investigación del fraude fiscal",
                    competencia: "Identificación de conductas objeto de sanción fiscal",
                    fechaActualizacion: "27/05/2020",
                    estado: "Cursando",
                    nivel: "MEDIO",
                    colorEstado: "#b69329" //primary/secondary/error
                }
            ],
            cursos_alto: [
                {
                    idCurso: "05",
                    nombreCurso: "Análisis de caso del fraude fiscal en la auditoría TACI",
                    competencia: "Identificación de conductas objeto de sanción fiscal",
                    fechaActualizacion: "27/05/2020",
                    estado: "Por Cursar",
                    nivel: "ALTO",
                    colorEstado: "error" //primary/secondary/error
                },
                {
                    idCurso: "06",
                    nombreCurso: "Metodologías de la investigación fiscal",
                    competencia: "Identificación de conductas objeto de sanción fiscal",
                    fechaActualizacion: "27/05/2020",
                    estado: "Por Cursar",
                    nivel: "ALTO",
                    colorEstado: "error" //primary/secondary/error
                }
            ],
            cursos_superior: [
                {
                    idCurso: "07",
                    nombreCurso: "Fuentes de información digital y fiscalización internacional",
                    competencia: "Identificación de conductas objeto de sanción fiscal",
                    fechaActualizacion: "27/05/2020",
                    estado: "Por Cursar",
                    nivel: "SUPERIOR",
                    colorEstado: "error" //primary/secondary/error
                },
                {
                    idCurso: "08",
                    nombreCurso: "Análisis de datos y toma de decisiones en la investigación fiscal",
                    competencia: "Identificación de conductas objeto de sanción fiscal",
                    fechaActualizacion: "27/05/2020",
                    estado: "Por Cursar",
                    nivel: "SUPERIOR",
                    colorEstado: "error" //primary/secondary/error
                }
            ],
        }
    ]
}

export default rutaAprendizaje;
