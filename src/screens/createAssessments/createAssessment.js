import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';
import {useHistory } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
    span:{
        margin : '10px'
    },
    text : {
        width : '80%'
    },
    option : {
        width : '25%'
    },
    icon:{
        fontSize : '30px'
    },
    divider : {
        margin: '10px'
    },
    questionDiv : {
        textAlign : 'left',
        marginTop: '30px',
        marginLeft: '10px',
        fontSize : '22px',
        fontWeight : 'bold'
    },
    form:{
        height : '100%'
    },
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
    }
}));

export default function CreateAssessment(){

    const [questions,addQuestion] = useState([{question:"",options:[],result:"0"}]);
    const [selectedQuestion,changeSelectedQuestion] = useState(0);
    const classes = useStyles();
    const history = useHistory();
    let optionTxt = '';
    const [name,setName] = useState('');
    const [isAssessmentCreated,setAssessment] = useState(false);
    const [createError,setCreateError] = useState(false);
    const [createTxt,setCreateTxt] = useState('');
    const [qError,setQError] = useState(false);
    const [qTxt,setQTxt] = useState('');
    const [oError,setOError] = useState(false);
    const [optionHelperTxt,setOptionTxt] = useState('');
    
    const onAddNewQuestion = (index)=>{
       
        if(questions[questions.length-1].question && 
            questions[questions.length-1].options.length>1){
            changeSelectedQuestion(index+1);
            addQuestion([...questions,{question:"",options:[]}]);
        }else{
            if(!questions[questions.length-1].question){
                setQError(true);
                setQTxt("Need a Question to proceed")
            }

            if(!(questions[questions.length-1].options.length>1)){
                setOError(true);
                setOptionTxt("Need atleast two options to proceed");
            }
                

            
            
        }
        
        
        
    }

    function onChangeName(event){
        event.preventDefault();

        setName(event.target.value);
    }

    function onCreateAssessment(){
        if(name){
            setAssessment(true);
        }else{
            setCreateError(true);
            setCreateTxt('Need an Assessment title to proceed');
        }
            
    }

    function renderAssessmentForm(){
        if(isAssessmentCreated){
            return(
                <div>
                    <form key="assessment" className={classes.form}>
                            {
                                questions.map((question,index) => (
                                    <Question question={question} 
                                                index={index}/>
                                    
                                ))
                            }
                            </form>
                    
                        <Button variant="contained" 
                                color='primary'
                                onClick={onPreviewAssessment}>
                                    Review Assessment
                        </Button>  
                    </div> 
            )
        }else{

        }
        
    }

    function renderAssessmentNameInput(){
        if(!isAssessmentCreated){
            return (
                <span>
                    <TextField className={classes.text} 
                                    label="Assessment Title" 
                                    error={createError}
                                    helperText = {createTxt}
                                    color="secondary" 
                                    value = {name}
                                    autoFocus
                                    key={name}
                                    onChange={(event)=>onChangeName(event)}
                                    />
                    
                    <Button variant="contained" color="primary" 
                        onClick={onCreateAssessment}>Create</Button>
                </span>
            )
        }else{

            return(
            <h2>{name}</h2>
            )
        }
        
    }

    return (
        <div >
            <h3> Create Assessment</h3>
             <div >
                   {

                        renderAssessmentNameInput()
                   }
                   
            </div>
            {
                
                renderAssessmentForm()
            }
        </div>
    );

    function onChangeText(event,prop){
        
        event.preventDefault();
      
    
        let newQuestions = [...questions];

        newQuestions[prop.index].question = event.target.value;

        addQuestion(newQuestions);
       
        

     
    }

    function onAddOption(prop,e){
        debugger;
        e.preventDefault();
      
        
       let newQuestions = [...questions];

       if(newQuestions[prop.index].options){
        newQuestions[prop.index].options.push(optionTxt);
       }else{
        newQuestions[prop.index].options = [];
        newQuestions[prop.index].options.push(optionTxt);
       }

       if(newQuestions[prop.index].options.length>1){
        setOError(false);
       }
       

       addQuestion(newQuestions);
    }

    function onDeleteQuestion(prop,e){
        e.preventDefault();
        let newQuestions = [...questions];

        if(newQuestions.length == 1){

            return;
            
        }

        newQuestions.splice(prop.index,1);

        addQuestion(newQuestions);
    }

    function onDeleteChip(prop,index){

       let newQuestions = [...questions];
       newQuestions[prop.index].options.splice(index,1);

       addQuestion(newQuestions);
    }

    function renderOptions(prop){
      
        return prop.question.options?.map((option,index)=>(
            <Chip className={classes.span}  
                    label={option}
                    onDelete = {()=>onDeleteChip(prop,index)}
                    onClick = {()=>onSelectCorrectOption(prop,index)}
                    clickable
                color={Number(prop.question.result) == index ? "primary":"secondary"} />
        ))
    }

    function onChangeOptionTxt(e){

        e.preventDefault();
        optionTxt = e.target.value;
    }

    function onSelectCorrectOption(prop,index){
        debugger;
        let newQuestions = [...questions];

        newQuestions[prop.index].result = index.toString();

        addQuestion(newQuestions);
    }

   function renderSelectedQuestion(prop){
       debugger;
        if(selectedQuestion == prop.index){
            return (
                <span>
                    <TextField className={classes.text} 
                                    label="Type your Question" 
                                    color="secondary" 
                                    value = {prop.question.question}
                                    autoFocus
                                    key={prop.index}
                                    error = {qError}
                                    helperText ={qTxt}
                                    onChange={(e)=>onChangeText(e,prop)}
                                    /> 

                    <AddIcon color="primary" 
                                    onClick={()=>onAddNewQuestion(prop.index)}
                                    style={{ fontSize : 45}}>
                    </AddIcon>
                    <DeleteForeverIcon color="primary" 
                                    style={{ fontSize : 45}}
                                    onClick={(e)=>onDeleteQuestion(prop,e)}>
                    </DeleteForeverIcon>
                </span>
            )
        }else{
            return(
                    <div className = {classes.questionDiv} onClick = {()=>changeSelectedQuestion(prop.index)}>
                        {prop.question.question}
                    </div>
            )
        }
        
   }

   function renderOptionButtons(prop){
        if(selectedQuestion == prop.index){
            return (
                     <span className={classes.span}>
                        <TextField className={classes.option}
                        label="Type your option here"
                        key={`option ${prop.index}`}
                        error = {oError}
                        helperText = {optionHelperTxt}
                        onChange={(e)=>onChangeOptionTxt(e)}
                        />
                        <AddIcon color="primary" 
                                style={{ fontSize : 45}}
                                onClick={(e)=>onAddOption(prop,e)}>
                        </AddIcon>
                     </span>
                    ) ;
        }
   }

    function Question (prop){
        debugger;
        return (
            <div className={classes.span} >
                <span >
                    {
                        renderSelectedQuestion(prop)
                    }
                </span>
                <div className={classes.span} >
                    <span className={classes.span}>
                        {
                            renderOptions(prop)
                        }
                    </span>
                </div>
                
                    {
                        renderOptionButtons(prop)
                            
                    }
                
                <Divider className={classes.divider}/>
            </div>
        );
    }

    function onPreviewAssessment(){
        history.push('/home/viewAssessment',{name:name,questions:[...questions]});
    }
}

