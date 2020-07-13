import React, {useState} from 'react';
import { useLocation,useHistory } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {Radio, Paper, Button} from '@material-ui/core';


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
    const history = useHistory();

    const [questions, setQuestions]= useState(location.state.questions);
    const [name,setName] = useState(location.state.name);

    const [userSelections,setUserSelected] = useState(questions.map((question)=>{
                                                        return question.options.map((option)=>{
                                                            return {isCorrect:false, value : option};
                                                        });
                                                      }));

    const [isCreated,setCreated] = useState(false);

   
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
        assessment.status = "created";
        assessment.result = "";
        assessment.userId = 2;
        debugger;

        // POST request using fetch with async/await
        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(assessment)
            };

        const response = await fetch('http://localhost:3000/assessments', requestOptions);
        const data = await response.json();

        setCreated(true);

    }

    return (
        <div>
            {render()}
        </div>
    )

    function render(){
        
            if(!isCreated){
            return (
                <div>
                    <h2>{name}</h2>
                    {
                        questions.map((question,questionIndex) => (
                            <div className={classes.question}>
                                <Paper >{question.question}</Paper>
                                        { question.options.map((option,answerIndex)=>(
                                            <span className={classes.options}>
                                                <Radio color='primary' 
                                                        value={option} 
                                                        checked={userSelections[questionIndex][answerIndex]?.isCorrect}
                                                        onChange={()=>onCheckAnswer(questionIndex,answerIndex,option)}/>
                                                <label>{option}</label>
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
                <div> Assessment Created </div>
            )
        }
        
    }
    
    
}