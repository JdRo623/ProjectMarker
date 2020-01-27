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
import CardFooter from "components/Card/CardFooter.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GridItem from "components/Grid/GridItem.js";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import Button from "components/CustomButtons/Button.js";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import PreguntaItem from "./IdentificacionConductasItem";
const useStyles = makeStyles(styles);


export default function IdentificacionConductasList(props) {

    useEffect(() => {
        console.error("pREGUNTA lIST", props.competencias);
    }, []);

    return (
        <div>
             {props.competencias.map(c => <PreguntaItem competencia={c}/>)}
        </div>
    );
}