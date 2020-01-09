import React, { useState }  from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";


import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { Link } from "react-router-dom";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import constantes from "util/Constantes.js"
import HttpUtil from 'util/HttpService.js';

import image from "assets/img/fondo.png";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import LoginCustomComponent from "components/PIC/Login/LoginCustomComponent";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});



export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();


  const [email, setEmail] = useState("");
  const handleEmailChange = e => setEmail(e.target.value);

  const [secret, setSecret] = useState("");
  const handleSecretChange = e => setSecret(e.target.value);

  const [modal, setModal] = React.useState(false);

  const { ...rest } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.error("error", `Email `+email)
    console.error("error", `Secret ${secret}`)
    const infoLogin = {
      correo : email,
      secret : secret
  };
    if(email == ""){
        //errors['correo'] = 'Este campo es requerido';
    } else{
      if(secret  == ""){
        //errors['secret'] = 'Este campo es requerido';

      }else{
        setModal(true)
          const url = constantes.urlServer + constantes.servicios.autenticarAgente;
          HttpUtil.requestPost(url, infoLogin, 
              (response) => { 
                  setModal(false);

                  console.log(response);
                  if( ['Aprobado', 'Aprobada'].indexOf(response.estado) > -1){
                      localStorage.setItem('userInfo', JSON.stringify(response.data));
                   //   this.setState({redirect : true, showLoader : false, user : response.data});
                  }else{
                    setModal(false);
                    console.log("response");

                     /* this.setState({
                          alertTitle : 'Error al autenticar',
                          alertMessage : response.message,
                          alertType : 'error', 
                          showLoader : false
                      });*/
                  }
              }, 
                () => {
                  setModal(false);

                  console.log("Error");

                 /* this.setState({
                      alertTitle : 'Error!',
                      alertMessage : 'Ocurrio un error al autenticarce, por favor intenta de nuevo',
                      alertType : 'error', 
                      showLoader : false
                  });*/
              });

      }
    }
       
  }
  return (

    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}  onSubmit= {handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>PIC</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Correo Electronico"
                      name = "correo"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        onChange: handleEmailChange,
                        value : email,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Contraseña"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        onChange: handleSecretChange,
                        value : secret,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                  <Button simple color="primary" size="lg" type="submit" >
                      Iniciar Sesión
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>

      //Dialog espera
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
    </div>
  );
}
