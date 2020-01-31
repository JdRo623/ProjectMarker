import React, { useState }  from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Datetime from "react-datetime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Email from "@material-ui/icons/Email";
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import SubmitComponent from "components/PIC/Utils/SubmitComponent";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import constantes from "util/Constantes.js"
import HttpUtil from 'util/HttpService.js';
import Slide from "@material-ui/core/Slide";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});



export default function Cuestionarios() {

  const [archivo, setArchivo] = useState("");
  const handleArchivoChange = e => setArchivo(e.target.files);

  const [archivoPreguntasI, setArchivoPreguntasI] = useState("");
  const handleArchivoPreguntasIChange = e => setArchivoPreguntasI(e.target.files);


  const [archivoEmpleados, setArchivoEmpleados] = useState("");
  const handleArchivoEmpleadosChange = e => setArchivoEmpleados(e.target.files);



  const [modal, setModal] = React.useState(false);

  const enviarSeccionI = () => {
          try{

            let files = archivoPreguntasI;
            let reader = new FileReader();
            reader.readAsDataURL(files[0])
            reader.onload=(e)=>{
              setModal(true);
                const url = constantes.urlServer + constantes.servicios.registrarPreguntasSeccionI;
            let archivoB64 =  e.target.result;
            archivoB64 = archivoB64.replace("data:application/octet-stream;base64,","");
            archivoB64 = archivoB64.replace(/^ data:application\/octet-stream;base64,/, "")  ;
            const infoPreguntas ={
              archivo: archivoB64
            }
            console.warn("data aaaa mostrar ",archivoB64);
            HttpUtil.requestPost(url, infoPreguntas, 
              (response) => { 
                setModal(false);

                  alert("autenticar: "+ response.message);
                /*  if( ['Aprobado', 'Aprobada'].indexOf(response.estado) > -1){
                      localStorage.setItem('userInfo', JSON.stringify(response.data));
                      props.history.push("/admin");
                 //     history.push("/admin");
                   //   this.setState({redirect : true, showLoader : false, user : response.data});*/
                 
              }, 
                () => {
                  setModal(false);

                  alert("Error al autenticar: Ocurrio un error al autenticarce, por favor intenta de nuevo");

                 /* this.setState({
                      alertTitle : 'Error!',
                      alertMessage : 'Ocurrio un error al autenticarce, por favor intenta de nuevo',
                      alertType : 'error', 
                      showLoader : false
                  });*/
              });
            }
        }catch(error){
            console.error("Error",error)
        }
  }

  const enviarSeccionII = () => {
    try{

      let files = archivo;
      let reader = new FileReader();
      reader.readAsDataURL(files[0])
      reader.onload=(e)=>{
        setModal(true);
          const url = constantes.urlServer + constantes.servicios.registrarPreguntas;
      let archivoB64 =  e.target.result;
      archivoB64 = archivoB64.replace("data:application/octet-stream;base64,","");
      archivoB64 = archivoB64.replace(/^ data:application\/octet-stream;base64,/, "")  ;
      const infoPreguntas ={
        archivo: archivoB64
      }
      console.warn("data aaaa mostrar ",archivoB64);
      HttpUtil.requestPost(url, infoPreguntas, 
        (response) => { 
          setModal(false);

            alert("autenticar: "+ response.message);
          /*  if( ['Aprobado', 'Aprobada'].indexOf(response.estado) > -1){
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                props.history.push("/admin");
           //     history.push("/admin");
             //   this.setState({redirect : true, showLoader : false, user : response.data});*/
           
        }, 
          () => {
            setModal(false);

            alert("Error al autenticar: Ocurrio un error al autenticarce, por favor intenta de nuevo");

           /* this.setState({
                alertTitle : 'Error!',
                alertMessage : 'Ocurrio un error al autenticarce, por favor intenta de nuevo',
                alertType : 'error', 
                showLoader : false
            });*/
        });
      }
  }catch(error){
      console.error("Error",error)
  }
}

const enviarArchivoEmpleados = () => {
  try{

    let files = archivoEmpleados;
    let reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload=(e)=>{
      setModal(true);
        const url = constantes.urlServer + constantes.servicios.registrarEmpleados;
    let archivoB64 =  e.target.result;
    archivoB64 = archivoB64.replace("data:application/octet-stream;base64,","");
    archivoB64 = archivoB64.replace(/^ data:application\/octet-stream;base64,/, "")  ;
    const infoPreguntas ={
      archivo: archivoB64
    }
    HttpUtil.requestPost(url, infoPreguntas, 
      (response) => { 
        setModal(false);

          alert("autenticar: "+ response.message);
        /*  if( ['Aprobado', 'Aprobada'].indexOf(response.estado) > -1){
              localStorage.setItem('userInfo', JSON.stringify(response.data));
              props.history.push("/admin");
         //     history.push("/admin");
           //   this.setState({redirect : true, showLoader : false, user : response.data});*/
         
      }, 
        () => {
          setModal(false);

          alert("Error al autenticar: Ocurrio un error al autenticarce, por favor intenta de nuevo");

         /* this.setState({
              alertTitle : 'Error!',
              alertMessage : 'Ocurrio un error al autenticarce, por favor intenta de nuevo',
              alertType : 'error', 
              showLoader : false
          });*/
      });
    }
}catch(error){
    console.error("Error",error)
}
}
    const classes = useStyles();
    return(
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Registro preguntas Sección I</h4>
            <p className={classes.cardCategoryWhite}> 
                Ingreso de preguntas via archivo de Excel
            </p>
          </CardHeader>
          <CardBody>
          <CustomInput
                      labelText="Archivo"
                      id="archivo"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "file",
                        files: archivoPreguntasI,
                        onChange: handleArchivoPreguntasIChange,
                        autoComplete: "off"
                      }}
                    />
          </CardBody>
          <CardFooter className={classes.cardFooter}>
          <Button color="primary" onClick={enviarSeccionI}>Cargar</Button>
        </CardFooter>
        </Card>
        </GridItem>
      
        <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Registro preguntas Seccion II</h4>
            <p className={classes.cardCategoryWhite}>
                Ingreso de preguntas via archivo de Excel
            </p>
          </CardHeader>
          <CardBody>
          <CustomInput
                      labelText="Archivo"
                      id="archivoII"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "file",
                        files: archivo,
                        onChange: handleArchivoChange,
                        autoComplete: "off"
                      }}
                    />
          </CardBody>
          <CardFooter className={classes.cardFooter}>
          <Button color="primary" onClick={enviarSeccionII}>Cargar</Button>
        </CardFooter>
        </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Registro empleados</h4>
            <p className={classes.cardCategoryWhite}>
                Ingreso de empleados
            </p>
          </CardHeader>
          <CardBody>
          <CustomInput
                      labelText="Archivo"
                      id="archivoEmpleados"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "file",
                        files: archivoEmpleados,
                        onChange: handleArchivoEmpleadosChange,
                        autoComplete: "off"
                      }}
                    />
          </CardBody>
          <CardFooter className={classes.cardFooter}>
          <Button color="primary" onClick={enviarArchivoEmpleados}>Cargar</Button>
        </CardFooter>
        </Card>
        </GridItem>


















        <GridItem xs={12} sm={12} md={12}>
        <Card>
        <form className={classes.form}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Registro manual de preguntas</h4>
            <p className={classes.cardCategoryWhite}>
            Ingreso de preguntas individuales
            </p>
          </CardHeader>
          <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Cargo"
                    id="cargo"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Proceso"
                    id="proceso"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Subproceso"
                    id="subproceso"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Tematica - Competencia"
                    id="competencia"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Tipo"
                    id="tipo"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Enunciado"
                    id="enunciado"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Respuesta a"
                    id="a"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Respuesta b"
                    id="b"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Respuesta c"
                    id="c"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Respuesta d"
                    id="d"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                <br />
                <InputLabel className={classes.label}>
                Aleatorio
                  </InputLabel>
                <CustomDropdown
                      buttonText="Aleatorio"
                      dropdownHeader="Aleatorio"
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                      }}
                      dropdownList={[
                        "Si",
                        "No",   
                      ]}
                    />
                </GridItem>
                
              </GridContainer>
              
            </CardBody>
          <CardFooter className={classes.cardFooter}>
          <Button color="primary" >Enviar datos</Button>
                  </CardFooter>
          </form>
        </Card>
      </GridItem>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
         {/*} <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setModal(false)}
             >
            <Close className={classes.modalClose} />
          </IconButton>*/}
          <h4 className={classes.modalTitle}>Consultando Servidor</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <h5>Espere por favor, Estamos validando sus datos</h5>
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          {/*<Button onClick={() => setModal(false)}>Never Mind</Button>
          <Button onClick={() => setModal(false)} color="success">
            Yes
        </Button>*/}
        </DialogActions>
      </Dialog>
    </GridContainer>  
    );

}