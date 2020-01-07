import React from "react";
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

        <GridItem xs={12} sm={12} md={12}>
        <Card>
        <form className={classes.form}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Preguntas de identificación y perfil</h4>
            <p className={classes.cardCategoryWhite}>
            </p>
          </CardHeader>
          <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Nombres"
                    id="nombre"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Apellidos"
                    id="apellido"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
            <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                    labelText="C.C"
                    id="cedula"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Tiempo de años en la DIAN"
                    id="anios"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Tiempo en meses en el cargo actual"
                    id="meses"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                  <br />
                  <InputLabel className={classes.label}>
                  Fecha de Nacimiento
                  </InputLabel>
                <FormControl fullWidth>
                    <Datetime
                      inputProps={{ placeholder: "--/--/----" }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <br />
                <InputLabel className={classes.label}>
                El cargo actual es por encargo
                  </InputLabel>
                <CustomDropdown
                      buttonText="Cargo"
                      dropdownHeader="carCargogo"
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                      }}
                      dropdownList={[
                        "Cargo 1",
                        "Cargo 2",   
                      ]}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <br />
                <InputLabel className={classes.label}>
                Proceso en el que trabaja Actualmente
                  </InputLabel>
                <CustomDropdown
                      buttonText="Proceso"
                      dropdownHeader="Proceso"
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                      }}
                      dropdownList={[
                        "Proceso 1",
                        "Proceso 2",   
                      ]}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <br />
                <InputLabel className={classes.label}>
                Subproceso, área o coordinación
                  </InputLabel>
                <CustomDropdown
                      buttonText="Subproceso"
                      dropdownHeader="Subproceso"
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                      }}
                      dropdownList={[
                        "Subproceso 1",
                        "Subproceso 2",   
                      ]}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <br />
                <InputLabel className={classes.label}>
                Tiene personal a cargo actualmente
                  </InputLabel>
                <CustomDropdown
                      buttonText="Selección"
                      dropdownHeader="Selección"
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
                <GridItem xs={12} sm={12} md={4}>
                <br />
                <InputLabel className={classes.label}>
                Coordina algún equipo de trabajo
                  </InputLabel>
                <CustomDropdown
                      buttonText="Selección"
                      dropdownHeader="Selección"
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
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <br />
                <InputLabel className={classes.label}>
                Ciudad en donde ejerce el cargo
                  </InputLabel>
                <CustomDropdown
                      buttonText="Ciudad"
                      dropdownHeader="Ciudad"
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                      }}
                      dropdownList={[
                        "Ciudad 1",
                        "Ciudad 2",   
                      ]}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <br />
                <InputLabel className={classes.label}>
                Seccional
                  </InputLabel>
                <CustomDropdown
                      buttonText="Seccional"
                      dropdownHeader="Seccional"
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                      }}
                      dropdownList={[
                        "Seccional 1",
                        "Seccional 2",   
                      ]}
                    />
                </GridItem>
                
              </GridContainer>
              
            </CardBody>
          <CardFooter className={classes.cardFooter}>
          <Button color="primary">Enviar datos</Button>
                  </CardFooter>
          </form>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Formulario</h4>
            <p className={classes.cardCategoryWhite}>
            </p>
          </CardHeader>
          <CardBody>
           
          </CardBody>
        </Card>
        </GridItem>

    </GridContainer>  
    );

}
