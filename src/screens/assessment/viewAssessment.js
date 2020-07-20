import React, {useState, useContext} from 'react';
import { useLocation,useHistory } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {Radio, Paper, Button} from '@material-ui/core';
import { UserDetailsContext } from '../../App';
import Done from '../../assets/gifs/done.gif';


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

    const [value,setValue] = useContext(UserDetailsContext);

   
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

    const hostName  = window.location.hostname === 'localhost'?'http://localhost:3000':'';

    async function onProceed(){
    
        debugger;


        const assessment = {};

        assessment.name = name;
        assessment.qa = questions;
        assessment.correctAnswers = [];
        userSelections.map((questions)=>{
            return questions.map((selection,index)=>{
                if(selection.isCorrect){
                    assessment.correctAnswers.push(selection.value);
                }
            })               
                                    });
        assessment.status = "created";
        assessment.result = "";
        assessment.userId = value.id;
        assessment.teacherId = value.id;
        assessment.teacher = value.gender+value.lastname;
        debugger;

        // POST request using fetch with async/await
        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(assessment)
            };

        const response = await fetch(hostName+'/assessments', requestOptions);
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
                <div> 
                    <img src={Done} />
                </div>
            )
        }
        
    }
    
    
}
