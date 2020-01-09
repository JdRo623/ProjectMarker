import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snack from "@material-ui/core/Snackbar";
import axios, {post} from 'axios';
import Button from "components/CustomButtons/Button.js";

class SubmitComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            image: ''
        }
    }

    onChange(e){
        try{
            let files = e.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[0])
            reader.onload=(e)=>{
                console.warn("file data",e.target.result)
            }
        }catch(error){
            console.warn("Error",e)
        }
       
    }

    render(){
        return(
        <input type="file" name ="file" onChange={(e)=>this.onChange(e)}/>
        )
    }

}

export default SubmitComponent;