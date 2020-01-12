/*eslint-disable*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GridItem from "components/Grid/GridItem.js";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import PreguntaList from "./PreguntaList";

const useStyles = makeStyles(styles);

export default function PreguntaItem(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const [checked, setChecked] = React.useState([24, 22]);
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [checkedA, setCheckedA] = React.useState(true);
  const [checkedB, setCheckedB] = React.useState(false);
  const classes = useStyles();
  const handleSubmit = (evt) => {
    console.warn("Veamos",numero)
  }

  useEffect(() => {
    console.error("Pregunta Item", props.enunciado);
}, []);
  return (

    <Card className={classes[cardAnimaton]}>
      <form className={classes.form} onSubmit={handleSubmit}>
       {/* <CardHeader color="primary" className={classes.cardHeader}>
          <h3 >{numero}</h3>
  </CardHeader>*/}
        <CardBody>
        <GridItem xs={12} sm={6} md={4} lg={12}>
              <div className={classes.title}>
                <h3>{props.enunciado}</h3>
              </div>
              <div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
              <FormControlLabel
                  control={
                    <Radio
                      checked={selectedEnabled === props.respuestas[0].cod_respuesta}
                      onChange={() => setSelectedEnabled(props.respuestas[0].cod_respuesta)}
                      value={props.respuestas[0].descriptor}
                      id = {props.respuestas[0].cod_respuesta}
                      name="radio button enabled"
                      aria-label="A"
                      icon={
                        <FiberManualRecord className={classes.radioUnchecked} />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                        root: classes.radioRoot
                      }}
                    />
                  }
                  classes={{
                    label: classes.label,
                    root: classes.labelRoot
                  }}
                  label={props.respuestas[0].descriptor}
                />
              </div>
              <div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedEnabled === props.respuestas[1].cod_respuesta}
                      onChange={() => setSelectedEnabled(props.respuestas[1].cod_respuesta)}
                      value={props.respuestas[1].descriptor}
                      id = {props.respuestas[1].cod_respuesta}
                      name="radio button enabled"
                      aria-label="B"
                      icon={
                        <FiberManualRecord className={classes.radioUnchecked} />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                        root: classes.radioRoot
                      }}
                    />
                  }
                  classes={{
                    label: classes.label,
                    root: classes.labelRoot
                  }}
                  label={props.respuestas[1].descriptor}
                />
              </div>
              <div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedEnabled === props.respuestas[2].cod_respuesta}
                      onChange={() => setSelectedEnabled(props.respuestas[2].cod_respuesta)}
                      value={props.respuestas[2].descriptor}
                      id = {props.respuestas[2].cod_respuesta}
                      name="radio button enabled"
                      aria-label="A"
                      icon={
                        <FiberManualRecord className={classes.radioUnchecked} />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                        root: classes.radioRoot
                      }}
                    />
                  }
                  classes={{
                    label: classes.label,
                    root: classes.labelRoot
                  }}
                  label={props.respuestas[2].descriptor}
                />
              </div>
              <div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedEnabled === props.respuestas[3].cod_respuesta}
                      onChange={() => setSelectedEnabled(props.respuestas[3].cod_respuesta)}
                      value={props.respuestas[3].descriptor}
                      id = {props.respuestas[3].cod_respuesta}
                      name="radio button enabled"
                      aria-label="B"
                      icon={
                        <FiberManualRecord className={classes.radioUnchecked} />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                        root: classes.radioRoot
                      }}
                    />
                  }
                  classes={{
                    label: classes.label,
                    root: classes.labelRoot
                  }}
                  label={props.respuestas[3].descriptor}
                />
              </div>
              <div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
              </div> 
              </GridItem>  
        </CardBody>
      {/*}  <CardFooter className={classes.cardFooter}>
          <Button simple color="primary" size="lg" type="submit">
            Siguiente
                    </Button>
              </CardFooter>*/}
      </form>
    </Card>
  );
}

PreguntaList.propTypes = {
  enunciado: PropTypes.string.isRequired
};
