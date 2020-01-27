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
import DialogActions from "@material-ui/core/DialogActions"; const useStyles = makeStyles(styles);
import Slide from "@material-ui/core/Slide";
import PreguntaList from "../Preguntas/PreguntaList";
import CapacitacionComponenteList from "../Preguntas/CapacitacionComponenteList";
import PreferenciaCapacitacion from "../Preguntas/PreferenciaCapacitacion";
import IdentificacionConductasList from "../Preguntas/IdentificacionConductasList"

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

    const [personalCargo, setPersonalCargo] = useState("No");

    const [coordinacion, setCoordinacion] = useState("No");

    const [ciudad, setCiudad] = useState("Ciudad");

    const [seccional, setSeccional] = useState("Seccional");

    const [preguntas, setPreguntas] = useState([]);

    const [preguntasSeccionI, setPreguntasSeccionI] = useState([]);

    const [competencias, setCompetencias] = useState([]);


    const [modal, setModal] = React.useState(false);


    const handleEnvioDatos = e => {
        setModal(true)
        const filtos = {
            cargo: cargoSeleccionado,
            procesos: procesoSeleccionado,
            subproceso: subprocesoSeleccionado
        }

        const urlS1 = constantes.urlServer + constantes.servicios.obtenerCompetencias;
        HttpUtil.requestPost(urlS1, filtos,
            (response) => {
                setCompetencias(response.data);
                console.warn(response);
                setModal(false)

            },
            () => {

                alert("Error al obtener: "+urlS1);

            });

       const urlS2 = constantes.urlServer + constantes.servicios.obtenerPreguntasSeccionI;
        HttpUtil.requestPost(urlS2, filtos,
            (response) => {
                setPreguntasSeccionI(response.data[0].respuestas);
                console.warn(response.data[0].respuestas);
                setModal(false)

            },
            () => {

                alert("Error al obtener:");

            });
        const url = constantes.urlServer + constantes.servicios.obtenerPreguntas;
        HttpUtil.requestPost(url, filtos,
            (response) => {
                setPreguntas(response.data);
                console.warn(response);
                setModal(false)

            },
            () => {

                alert("Error al obtener:");

            });
    }
    const handleCargoChange = e => {
        setModal(true)
        setProcesoSeleccionado("Proceso")
        setSubprocesoSeleccionado("Subroceso")

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

                console.warn(response.data);
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

    const handlePersonalCargo = e => {
        setPersonalCargo(
            e
        )

    };

    const handleCoordinacion = e => {
        setCoordinacion(
            e
        )

    };

    const handleCiudad = e => {
        setCiudad(
            e
        )

    };

    const handleSeccional = e => {
        setSeccional(
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
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <form className={classes.form}  onSubmit= {handleEnvioDatos}> 
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
                                        Tiene personal a cargo actualmente
                  </InputLabel>
                                    <CustomDropdown
                                        buttonText={personalCargo}
                                        dropdownHeader="Selección"
                                        buttonProps={{
                                            className: classes.navLink,
                                            color: "transparent"
                                        }}
                                        onClick={handlePersonalCargo}
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
                                        buttonText={coordinacion}
                                        dropdownHeader="Selección"
                                        buttonProps={{
                                            className: classes.navLink,
                                            color: "transparent"
                                        }}
                                        onClick={handleCoordinacion}
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
                                        Cargo
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
                                <GridItem xs={12} sm={12} md={4}>
                                    <br />
                                    <InputLabel className={classes.label}>
                                        Subproceso, área o coordinación
                  </InputLabel>
                                    <CustomDropdown
                                        buttonText={subprocesoSeleccionado}
                                        dropdownHeader="Subprocesos"
                                        buttonProps={{
                                            className: classes.navLink,
                                            color: "transparent"
                                        }}
                                        onClick={handleSubprocesoChange}
                                        dropdownList={subprocesos}
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
                                        buttonText={ciudad}
                                        dropdownHeader="Ciudad"
                                        buttonProps={{
                                            className: classes.navLink,
                                            color: "transparent"
                                        }}
                                        onClick={handleCiudad}

                                        dropdownList={[
                                            "Arauca",
                                            "Armenia",
                                            "Barrancabermeja",
                                            "Barranquilla",
                                            "Bogotá D.C",
                                            "Bucaramanga",
                                            "Buenaventura",
                                            "Cali",
                                            "Cartagena",
                                            "Cartago",
                                            "Cúcuta",
                                            "Florencia",
                                            "Girardot",
                                            "Ibagué",
                                            "Inírida",
                                            "Ipiales",
                                            "Maicao",
                                            "Manizales",
                                            "Medellin",
                                            "Mitú",
                                            "Monteria",
                                            "Neiva",
                                            "Leticia",
                                            "Pasto",
                                            "Pamplona",
                                            "Palmira",
                                            "Pereira",
                                            "Popayán",
                                            "Puerto Asís",
                                            "Puerto Carreño",
                                            "Quibdó",
                                            "Santa Marta",
                                            "Tumaco",
                                            "Tunja",
                                            "Tuluá",
                                            "Villavicencio",
                                            "Sincelejo",
                                            "Valledupar",
                                            "Riohacha",
                                            "San José de Guaviare",
                                            "Sogamoso",
                                            "San Andrés",
                                            "Urabá",
                                            "Yopal",
                                        ]}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <br />
                                    <InputLabel className={classes.label}>
                                        Seccional
                  </InputLabel>
                                    <CustomDropdown
                                        buttonText={seccional}
                                        dropdownHeader="Seccional"
                                        buttonProps={{
                                            className: classes.navLink,
                                            color: "transparent"
                                        }}
                                        onClick={handleSeccional}

                                        dropdownList={[
                                            "0 	Nivel Central",
                                            "1	Dirección Seccional de Impuestos y Aduanas de Armenia",
                                            "2	Dirección Seccional de Impuestos de Barranquilla",
                                            "3	Dirección Seccional de Aduanas de Bogotá",
                                            "4	Dirección Seccional de Impuestos y Aduanas de Bucaramanga",
                                            "5	Dirección Seccional de Impuestos de Cali",
                                            "6	Dirección Seccional de Impuestos de Cartagena",
                                            "7	Dirección Seccional de Impuestos de Cúcuta",
                                            "8	Dirección Seccional de Impuestos y Aduanas de Girardot",
                                            "9	Dirección Seccional de Impuestos y Aduanas de Ibagué",
                                            "10	Dirección Seccional de Impuestos y Aduanas de Manizales",
                                            "11	Dirección Seccional de Impuestos de Medellín",
                                            "12	Dirección Seccional de Impuestos y Aduanas de Montería",
                                            "13	Dirección Seccional de Impuestos y Aduanas de Neiva",
                                            "14	Dirección Seccional de Impuestos y Aduanas de Pasto",
                                            "15	Dirección Seccional de Impuestos y Aduanas de Palmira",
                                            "16	Dirección Seccional de Impuestos y Aduanas de Pereira",
                                            "17	Dirección Seccional de Impuestos y Aduanas de Popayán",
                                            "18	Dirección Seccional de Impuestos y Aduanas de Quibdó",
                                            "19	Dirección Seccional de Impuestos y Aduanas de Santa Marta",
                                            "20	Dirección Seccional de Impuestos y Aduanas de Tunja",
                                            "21	Dirección Seccional de Impuestos y Aduanas de Tuluá",
                                            "22	Dirección Seccional de Impuestos y Aduanas de Villavicencio",
                                            "23	Dirección Seccional de Impuestos y Aduanas de Sincelejo",
                                            "24	Dirección Seccional de Impuestos y Aduanas de Valledupar",
                                            "25	Dirección Seccional de Impuestos y Aduanas de Riohacha",
                                            "26	Dirección Seccional de Impuestos y Aduanas de Sogamoso",
                                            "27	Dirección Seccional de Impuestos y Aduanas de San Andrés",
                                            "28	Dirección Seccional de Impuestos y Aduanas de Florencia",
                                            "29	Dirección Seccional de Impuestos y Aduanas de Barrancabermeja",
                                            "31	Dirección Seccional de Impuestos de Grandes Contribuyentes",
                                            "32	Dirección Seccional de Impuestos de Bogotá",
                                            "34	Dirección Seccional de Impuestos y Aduanas de Arauca",
                                            "35	Dirección Seccional de Impuestos y Aduanas de Buenaventura",
                                            "36	Dirección Seccional Delegada de Impuestos y Aduanas de Cartago",
                                            "37	Dirección Seccional de Impuestos y Aduanas de Ipiales",
                                            "38	Dirección Seccional de Impuestos y Aduanas de Leticia",
                                            "39	Dirección Seccional de Impuestos y Aduanas de Maicao",
                                            "40	Dirección Seccional Delegada de Impuestos y Aduanas de Tumaco",
                                            "41	Dirección Seccional de Impuestos y Aduanas de Urabá",
                                            "42	Dirección Seccional Delegada de Impuestos y Aduanas de Puerto Carreño",
                                            "43	Dirección Seccional Delegada de Impuestos y Aduanas de Inírida",
                                            "44	Dirección Seccional de Impuestos y Aduanas de Yopal",
                                            "45	Dirección Seccional Delegada de Impuestos y Aduanas Mitú",
                                            "46	Dirección Seccional Delegada de Impuestos y Aduanas de Puerto Asís",
                                            "48	Dirección Seccional de Aduanas de Cartagena",
                                            "78	Dirección Seccional Delegada de Impuestos y Aduanas de San José de Guaviare",
                                            "86	Dirección Seccional Delegada de Impuestos y Aduanas de Pamplona",
                                            "87	Dirección Seccional de Aduanas de Barranquilla",
                                            "88	Dirección Seccional de Aduanas de Cali",
                                            "89	Dirección Seccional de Aduanas de Cúcuta",
                                            "90	Dirección Seccional de Aduanas de Medellín",
                                        ]}
                                    />
                                </GridItem>

                            </GridContainer>

                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            <Button color="primary" onClick={handleEnvioDatos}>Enviar datos</Button>
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
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Sección I</h4>
                        <p className={classes.cardCategoryWhite}>
                        </p>
                    </CardHeader>
                    <CardBody>
                    <IdentificacionConductasList competencias={competencias} />
                     <CapacitacionComponenteList preguntas={preguntasSeccionI}/> 

                    </CardBody>
                </Card>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Sección II</h4>
                        <p className={classes.cardCategoryWhite}>
                        </p>
                    </CardHeader>
                    <CardBody>
                        <PreguntaList preguntas={preguntas} ></PreguntaList>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Sección III</h4>
                        <p className={classes.cardCategoryWhite}>
                        </p>
                    </CardHeader>
                    <CardBody>
                     <PreferenciaCapacitacion/>
                    </CardBody>
                </Card>
            </GridItem>

    );
}