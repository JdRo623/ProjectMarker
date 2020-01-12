/*eslint-disable*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Datetime from "react-datetime";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import constantes from "util/Constantes.js"
import HttpUtil from 'util/HttpService.js';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";const useStyles = makeStyles(styles);
import Slide from "@material-ui/core/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });


export default function IdentificacionPerfil(props) {
    const classes = useStyles();
    const [procesoSeleccionado, setProcesoSeleccionado] = useState("Proceso");
    const [procesos, setProcesos] = useState([]);

    const [subprocesoSeleccionado, setSubprocesoSeleccionado] = useState("Subroceso");
    const [subprocesos, setSubprocesos] = useState([]);

    const [cargoSeleccionado, setCargoSeleccionado] = useState("Cargo");
    const [cargos, setCargos] = useState([]);
    const [modal, setModal] = React.useState(false);

    const handleCargoChange = e => {
        setModal(true)

        setCargoSeleccionado(
            e
        )
        const filtos = {
            cargo: e
        }
        const url = constantes.urlServer + constantes.servicios.obtenerProcesos;
        HttpUtil.requestPost(url, filtos,
            (response) => {
                setProcesos(response.data);
                console.warn(response);
                setModal(false)

            },
            () => {

                alert("Error al obtener:");

            });
    };
    const handleProcesoChange = e => {
        setModal(true)

        setProcesoSeleccionado(
            e
        )
        const filtos = {
            cargo: cargoSeleccionado,
            proceso: e
        }
        const url = constantes.urlServer + constantes.servicios.obtenerSubprocesos;
        HttpUtil.requestPost(url, filtos,
            (response) => {
                setModal(false)

                setSubprocesos(response.data);

                console.warn(procesos);
            },
            () => {
                setModal(false)

                alert("Error al obtener:");

            });
    };

    const handleSubprocesoChange = e => {
        setSubprocesoSeleccionado(
            e
        )

    };

    useEffect(() => {
        setModal(true)

        const filtos = {}
        const url = constantes.urlServer + constantes.servicios.obtenerCargos;
        HttpUtil.requestPost(url, filtos,
            (response) => {
                setModal(false)

                setCargos(response.data);
                console.warn(cargos);
            },
            () => {
                setModal(false)

                alert("Error al obtener:");

            });
    }, []);

    return (
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
                                buttonText={cargoSeleccionado}
                                dropdownHeader="Cargo"
                                buttonProps={{
                                    className: classes.navLink,
                                    color: "transparent"
                                }}
                                onClick={handleCargoChange}
                                dropdownList={cargos}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <br />
                            <InputLabel className={classes.label}>
                                Proceso en el que trabaja Actualmente
                  </InputLabel>
                            <CustomDropdown
                                buttonText={procesoSeleccionado}
                                dropdownHeader="Procesos"
                                buttonProps={{
                                    className: classes.navLink,
                                    color: "transparent"
                                }}
                                onClick={handleProcesoChange}
                                dropdownList={procesos}
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
        </Card>

        
        );
}