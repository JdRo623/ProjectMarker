/*eslint-disable*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import GridItem from "components/Grid/GridItem.js";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import PreguntaList from "./PreguntaList";

const useStyles = makeStyles(styles);

export default function IdentificacionConductas(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const [checked, setChecked] = React.useState([24, 22]);
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [checkedA, setCheckedA] = React.useState(true);
  const [checkedB, setCheckedB] = React.useState(false);
  const classes = useStyles();
  const handleSubmit = (evt) => {
    console.warn("Veamos", numero)
  }

  useEffect(() => {
    console.error("Pregunta Item", props.competencia);
  }, []);
  return (

    <Card className={classes[cardAnimaton]}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <CardHeader color="primary" className={classes.cardHeader}>
          <h3 >{props.competencia}</h3>
        </CardHeader>
        <CardBody>
          <GridItem xs={12} sm={12} md={12} lg={5}>
            <div className={classes.title}>
              <h3>Importancia para el trabajo</h3>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={2}>
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
                  value="1"
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
              label="Nada Importante 1"
            />
          </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={1}>
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
                  value="2"
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
              label="2"
            />
          </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={1}>
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
                  value="3"
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
              label="3"
            />
          </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={1}>
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
                  value="4"
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
              label="4"
            />
          </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={2}>
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
                  value="5"
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
              label="Muy Importante 5"
            />
          </div>
          </GridItem>

        <GridItem xs={12} sm={12} md={12} lg={12}>
          <div className={classes.title}>
            <h3>Frecuencia en que la uso en mi trabajo</h3>
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
                  value="1"
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
              label="Muy pocas veces 1"
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
                  value="2"
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
              label="2"
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
                  value="3"
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
              label="3"
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
                  value="4"
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
              label="4"
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
                  value="5"
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
              label="La Mayoria de las veces 5"
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
    </Card >
  );
}

