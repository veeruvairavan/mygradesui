import React, {useState} from 'react';
import { useLocation } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {Radio} from '@material-ui/core';


const useStyles = makeStyles((theme)=>({

        question : {
            textAlign : 'left',
            fontSize : '20px'
        },
        option : {
            display: 'flex',
            justifyContent : 'left'
        }
}));

export default function ViewAssessment() {
    
    const classes = useStyles();

    const location = useLocation();
    const [questions, setQuestions]= useState(location.state);

   
    debugger;

    return (
        <div>
            {
                questions.map((question) => (
                    <div className={classes.question}>
                        <div >{question.question}</div>
                                { question.options.map(option=>(
                                    <span className={classes.options}>
                                        <Radio color='primary' value={option} />
                                        <label>{option}</label>
                                    </span>
                                ))}
                      
                            
                
                     </div>   
                    
                ))
            }
            
        </div>
    )
}
