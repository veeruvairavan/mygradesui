import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../assets/scorecup.png';

const useStyles = makeStyles(theme => ({

    root: {
        flexGrow: 1,
        height: 'auto',
        width: '100%',
        backgroundImage: `url(${Image})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',

    },

    points : {
        marginTop : '10px',
        color:  '#FF3333'
    }
}

));

export default function Score(props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span className={classes.points}><h3><b>{props.score + ' ' + props.suffix}</b></h3></span>
        </div>
    )

}