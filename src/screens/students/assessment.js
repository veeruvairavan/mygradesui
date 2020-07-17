import React, {useState, useContext} from 'react';
import { useLocation,useHistory } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {Radio, Paper, Button} from '@material-ui/core';
import { UserDetailsContext } from '../../App';


const useStyles = makeStyles((theme)=>({

    question : {
        textAlign : 'center',
        fontSize : '22px',
        width:'90%'
    },
    option : {
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        padding : '10px',
        fontSize : '20px'
    },
    paper :{
        width : '90%',
        height: '30px'
    },
        root:{
            display : 'flex',
            justifyContent : 'center',
            flexDirection : 'column',
            alignItems : 'center',
            width:'100%'
        },
        optionLabel:{
            fontSize : '16px'
        }
        
}));

export default function Assessment() {
    
    const classes = useStyles();

    const location = useLocation();
    const history = useHistory();
    debugger;
    const [questions, setQuestions]= useState(location.state.qa);
    const [answers,setAnswers] = useState(location.state.correctAnswers);
    const [name,setName] = useState(location.state.name);
    const [result,setResult] = useState(0);

    const [userSelections,setUserSelected] = useState(questions.map((question)=>{
                                                        return question.options.map((option)=>{
                                                            return {isCorrect:false, value : option};
                                                        });
                                                      }));

    const [isCreated,setCreated] = useState(false);

    const [userContext,setUserContext] = useContext(UserDetailsContext);

   
    debugger;

    function onCheckAnswer(questionIndex,answerIndex,option){
        debugger;

        var newuserSelections = [...userSelections];

        newuserSelections[questionIndex] = newuserSelections[questionIndex].map(answers=>{
            return {isCorrect : false, value : option};
        });

        newuserSelections[questionIndex][answerIndex] = {isCorrect:true, value:option};

        setUserSelected(newuserSelections);
    }

    function computeResults(studentAnswers,correctAnswers){

        let result = 0;

        correctAnswers.map((answer,index)=>{
            if(answer == studentAnswers[index]){
                result = result + 1;
            }
        });

        return result.toString();
    }

    const hostName  = window.location.hostname === 'localhost'?'http://localhost:3000':'';

    async function onProceed(){
    
        debugger;


        const assessment = {};

        assessment.name = name;
        assessment.qa = questions;
        assessment.studentAnswers = [];
        userSelections.map((questions)=>{
            return questions.map((selection,index)=>{
                if(selection.isCorrect){
                    assessment.studentAnswers.push(selection.value);
                }
            })               
                                    });

        assessment.correctAnswers = answers;

                                    
        assessment.status = "Completed";
        assessment.result = computeResults(assessment.studentAnswers,answers);
        
        assessment.userId = userContext.id;
        debugger;

        // POST request using fetch with async/await
        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(assessment)
            };

        const response = await fetch(hostName+'/assessments', requestOptions);
        const data = await response.json();

        setResult(assessment.result);
        //setCreated(true);

        history.push('/result',assessment);
        

    }

    return (
        <div>
            {render()}
        </div>
    )

    function render(){
        
            if(!isCreated){
            return (
                <div className={classes.root}>
                    <h2>{name}</h2>
                    {
                        questions.map((question,questionIndex) => (
                            <div className={classes.question}>
                                <Paper className={classes.paper}>{question.question}</Paper>
                                        { question.options.map((option,answerIndex)=>(
                                            <span className={classes.options}>
                                                <Radio color='primary' 
                                                        value={option} 
                                                        checked={userSelections[questionIndex][answerIndex]?.isCorrect}
                                                        onChange={()=>onCheckAnswer(questionIndex,answerIndex,option)}/>
                                                <label className={classes.optionLabel}>{option}</label>
                                            </span>
                                        ))}
                              
                                    
                        
                             </div>   
                            
                        ))
                    }
        
                    <Button color="primary" 
                            variant="contained"
                            onClick={onProceed}>Proceed</Button>
                    
                </div>
            )
        }else{
            return (
                <div> 
                    Assessment Completed 
                    <div>
                        Your Score is {result}/{answers.length}
                    </div>

                </div>
            )
        }
        
    }
    
    
}
