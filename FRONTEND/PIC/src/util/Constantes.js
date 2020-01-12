const constantes = {
    /*
   Para despliegue en Azure
   urlServerOrganizaciones : 'http://cne-app-node-02.eastus.cloudapp.azure.com:10010',
   urlServer : 'http://cne-app-node-02.eastus.cloudapp.azure.com:10011',
   */
   /*
   Para pruebas en servidor local
   urlServerOrganizaciones : 'http://localhost:10010',
   urlServer : 'http://localhost:10011',*/
   
   //Producción
  // urlServer : 'http://pic-dian.eastus.cloudapp.azure.com:10010/',
   urlServer : 'http://pic-dian.eastus.cloudapp.azure.com:10010',
   servicios : {
         autenticarAgente : '/identificacionUsuario',
         registrarPreguntas : '/registrarPreguntas',
         registrarPregunta : '/registrarPregunta',
         obtenerPreguntas : '/obtenerPreguntas',
         obtenerPreguntas : '/obtenerCargos',
         obtenerPreguntas : '/obtenerSubprocesos',
         obtenerProcesos : '/obtenerProcesos'



   },
   mensajes : {
       errorNumCiudadanos : 'Deben existir minimo tres (3) y máximo seis (6) integrantes para que la veeduría sea valida.',
       errorMaxNumCiudadanos : 'El número máximo de veedores para una veeduría es de 6',
       errorNumCedulaExist : 'Ya existe un miembro de dirección con el mismo número de cédula en la organización.',
       errorTitleNumCiudadanos : '¡Número de integrantes no valido!',
       errorSaveOrganizacion : 'Ocurrio un error mientras se guardaba la organización de observación electoral.',
       errorSetStateOrganizacion : 'Ocurrio un error mientras se modificaba el estado de la organización.',
       errorGetOrganizacion : 'Hubo un problema obteniendo los datos de la organización, por favor intente nuevamente.',
       errorCaptchaUndef : 'Por favor valide el captcha antes de continuar',
       errorFileMaxSize : 'El archivo cargado excede el tamaño máximo permitido',
       errorFileExtInvalida : 'El archivo cargado tiene una extensión inválida',
       errorFileUploadGeneral : 'Ocurrio un problema al cargar el archivo, por favor intente de nuevo',
       errorFileDownLoad : 'Ocurrio un problema al descargar el archivo, por favor intente de nuevo',
       errorMinMiembros : 'Por favor registre por lo menos un miembro de dirección',
       errorNoFileMiembros : 'Por favor seleccione un archivo para poder realizar la carga de observadores',
       errorUploadingFileMiembros : 'Ha ocurrido un problema realizando el cargue de observadores, por favor intente nuevamente',
       errorChangeStateMiembro : 'Ha ocurrido un problema cambiando el estado del observador, por favor intente nuevamente',
       errorNoFileActoAdmin : 'Por favor seleccione el archivo de acto administrativo para poder cambiar el estado de la organización',
       errorNoFileRechazado : 'Por favor seleccione el archivo de Archivo de Observadores Rechazados para poder cambiar el estado de los Observadores',
       errorFileRechazado : 'Ha ocurrido un problema realizando el cargue de observadores, por favor intente nuevamente',
       warningDeleteMiembro : '¿Desea eliminar a este miembro de dirección? Recuerde que este proceso no se puede revertir',
       warningManifestacionNoAceptada : 'Se debe aceptar la manifestación legal para poder guardar la organización de observación electoral',
       successAddMiembro : 'Miembro de dirección agregado correctamente',
       successDeleteMiembro : 'Miembro de dirección eliminado con éxito',
       successSetStateOrganizacion : 'Estado de la organización modificado con éxito',
       succesSaveOrganizacion : 'Organización registrada exitosamente'
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