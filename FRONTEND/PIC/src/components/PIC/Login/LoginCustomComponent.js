import React, { Component } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
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
const useStyles = makeStyles(styles);
let [cardAnimaton, setCardAnimation] = '';
let classes
let prop
class LoginCustomComponent extends Component {
    constructor(props){
        super(props)
        classes = this.props.classes;
        this.prop = props.prueba;
        [cardAnimaton, setCardAnimation] = this.props.anim;
        this.state = {
            image: ''
        }
    }
   
    validarInicio = (event) => {
        console.warn("EVENTO","ADLKÑFJAÑLSDKJFALÑKDFGJAÑLSDFKJGA SDFKGLJ DFMVDMNFBVVCJBLKXCVB");
    };
    

    render(){
        console.error("CUSTOM", prop)
        return(     
            <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} >
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>PIC</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Correo Electronico"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
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
                  <Button simple color="primary" size="lg" onClick={this.validarInicio}>
                      Iniciar Sesión
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>

        )
    }

}

export default LoginCustomComponent;