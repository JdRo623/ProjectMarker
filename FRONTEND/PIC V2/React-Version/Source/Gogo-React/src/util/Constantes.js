const constantes = {
   urlServer : 'http://pic-dian.eastus.cloudapp.azure.com:10010',
   servicios : {
         autenticarAgente : '/identificacionUsuario',
         registrarPreguntas : '/registrarPreguntas',
         registrarPreguntasSeccionI : '/registrarPreguntasSeccionI',
         obtenerPreguntasSeccionI : '/obtenerPreguntasSeccionI',
         registrarPregunta : '/registrarPregunta',
         obtenerPreguntas : '/obtenerPreguntas',
         obtenerCargos : '/obtenerCargos',
         obtenerSubprocesos : '/obtenerSubprocesos',
         obtenerCompetencias : '/obtenerCompetencias',
         registrarEmpleados : '/registrarEmpleados',
         obtenerProcesos : '/obtenerProcesos',
         registrarActividades : '/registrarActividades',
         obtenerEmpleado : '/obtenerEmpleado'
   },
   mensajes : {
       ERROR : 'Error'
   },
   propiedades : {
       recaptchaKey : '6Lf7X7wUAAAAAHAr0mw3Ioojfme2ZvLMzwgLPDpb'
   },
   tiposArchivos : {
       '1' : 'Certificado Existencia o equivalente', 
       '2' : 'Estatuto o equivalente',
       '3' : 'Fuente de Financiación de Recursos o equivalente',
       '4' : 'Manifiesto de Voluntad de Acatamiento o equivalente',
       '5' : 'Acto Administrativo Organización',
       '6' : 'Acto Administrativo Observadores',
       '7' : 'Acreditación de Organización',
       '0' : 'Plantilla para el cargue de Miembros Observadores'
   },
   labels : {
       nameFileObservadores : 'Archivo de Observadores',
       nameFileActoAdmin : 'Archivo Acto Administrativo',
       nameFileArchivoRechazados : 'Archivo de Observadores a Rechazar'

   },
   manifiestoLegal : 'En calidad de representante legal de la organización postulante, manifiesto de manera libre e irrevocable, que toda la información suministrada para ser reconocido como organización de observación electoral y la acreditación de los miembros como observadores para el proceso electoral que se realizará en el presente año 2019, es veraz, fidedigna y cumple con todos los requisitos de la Constitución Política, las Leyes Colombianas, las Resoluciones del Consejo Nacional Electoral, y demás normas vigentes. Así mismo y en atención a lo establecido en la Ley 1581 de 2012, autorizo que la información suministrada pueda ser tratada para los fines pertinentes y relacionados con lo consignado en la Resolución No. 1707 del 08 de mayo del 2019 del Consejo Nacional Electoral, garantizando la confidencialidad de los datos suministrados.',
   
};

export default constantes;