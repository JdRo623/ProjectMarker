import React, { useState, useEffect } from "react";
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
import PreguntaItem from "components/PIC/Preguntas/PreguntaItem";

import IdentificacionPerfil from "components/PIC/Cuestionario/IdentificacionPerfil";

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


export default function Cuestionarios() {
    const classes = useStyles();
    
    return(
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Encabezado</h4>
            <p className={classes.cardCategoryWhite}>
            </p>
          </CardHeader>
          <CardBody>
            <h3> Este cuestionario tiene como finalidad conocer las necesidades de
                    capacitación de los funcionarios de la DIAN. Le agradecemos
                    responder cada una de las siguientes preguntas, la información que
                    proporcione será usada para ubicarlo en los distintos programas de
                    capacitación por competencias que desarrollará la DIAN durante el
                    periodo 2020-2022.
                    Le agradecemos su colaboración.</h3>
          </CardBody>
        </Card>
        </GridItem>

        <IdentificacionPerfil></IdentificacionPerfil>
     
    </GridContainer>  
    );

}
