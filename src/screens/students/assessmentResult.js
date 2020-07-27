import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import { makeStyles, Paper, Tooltip } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import GoodJob from '../../assets/gifs/goodjob.gif';

import BackButton from '../../components/BackButton';


const useStyles = makeStyles((theme)=>({

    root:{
        display : 'flex',
        justifyContent : 'center',
        flexDirection : 'column',
        alignItems : 'center',
        '& > *': {
            margin: theme.spacing(2),
            width: theme.spacing(6),
            height: theme.spacing(8),
            padding : '10px'
            
          }
    },

    question : {
        textAlign : 'center',
        fontSize : '24px'
    },
    option : {
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        padding : '10px'
    },
    paper :{
        width : '90%'
    },
    correct :{
        color : 'green',
        paddingLeft : '20px',
        fontWeight : 'bold'
    },
    wrong : {
        color:'red',
        fontWeight : 'bold'
    },
    resultBox:{
        height :  '15%',
        
    },
    holder:{
        display : 'flex',
        alignItems : 'center',
        justifyContent: 'center',
        width:'100%'
    },
    gif:{
        margin: '20px',
        width:'200px'
    }
}));


export default function AssessmentResult(props){
    const classes = useStyles();
    
    const location = useLocation();

    const assessment = location.state;

    const [progress,setProgress]  = useState(getPercentage());

    function getPercentage(){
        return (Number(assessment.result)/assessment.correctAnswers.length)*100;
    }

    debugger;
    return (
        <div className={classes.root}>
          
            <div className = {classes.resultBox}>
               <BackButton to="/student" />
               
                <span className = {classes.holder}>
                
                <CircularProgressWithLabel txt = {assessment.result+'/'+assessment.correctAnswers.length}
                 value = {100}
                 custom={true} size="8rem"/>
                <img src={GoodJob} className={classes.gif}/>
                <CircularProgressWithLabel value = {progress} size="8rem"/>
                    
                </span>
                
            </div>
            {
                assessment.qa.map((q,index) => {
                    debugger;
                    return (
                        <Paper className = {classes.paper}>
                            <div className = {classes.question}>{q.question}</div>
                            <span className = {classes.option}>
                                <label 
                                  className={assessment.studentAnswers[index] == 
                                                assessment.correctAnswers[index] ? 
                                                classes.correct : classes.wrong}>
                                    Your Answer: {assessment.studentAnswers[index]}
                                </label>
                                <label className={classes.correct}>
                                    Correct Answer: {assessment.correctAnswers[index]}
                                </label>
                            </span>
                        </Paper>
                    )

                })
            }
           
        </div>
    )
}