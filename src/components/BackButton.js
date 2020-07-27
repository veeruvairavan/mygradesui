import React from 'react';
import { Tooltip } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

export default function BackButton(props){

    const history = useHistory();

    function onClick(){
        history.push(props.to);
    }

    return(
        <Tooltip title="Go Back">
            <ArrowBackIcon style={{marginLeft : '-45vw',}} onClick={onClick}/>
        </Tooltip>
    )
}