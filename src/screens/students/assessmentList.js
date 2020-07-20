import React from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SimpleTable from '../../components/SimpleTable';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { MapsRateReview } from 'material-ui/svg-icons';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles(theme=>({


    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'column',
     
      minHeight : '80vh',
      maxHeight : '475px',
      height : '90%',
      margin:'10px',
      width:'33.3%',
      overflow:"scroll"

    },
   
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    spanX  : { 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          textAlign: 'center'
        },

        card :{
          height:'100%',
          width:'100%',
          minHeight : '80px',
          marginBottom : "2px"
        }
  }));

export default function AssessmentList(props){

    const {teachers,student} = props;
    const classes = useStyles();
    const history = useHistory();

    function takeAssessment(assessment){
      history.push('/assessment',assessment);
    }

    function review(assessment){
      debugger;
      history.push('/result',assessment);
    }


 
    function renderAssessment(){
        if(teachers && teachers.length >0 ){
            return teachers.map((teacher)=>{
              if( teacher.assessments && 
                  teacher.assessments.length > 0){
                  return (
                      <div container >
                          {
                              teacher.assessments.map(assessment=>{
                                  return (
                                    <CustomCard 
                                      data={assessment}
                                      display = {teacher.gender + 
                                                  ' '
                                                  +teacher.lastname+"'s"+' '
                                                  +assessment.name }
                                      takeAssessment = {()=>takeAssessment(assessment)}
                                      />
                                      
                                  
                                    
                                  )
                              })
                          }
                      </div>
                      
                  )
              }else{
                return(
                  <div>No Pending Assessments for You!</div>
                )
              }
              
          })
        }if(student && student.length >0 ){
          return student.map((student)=>{
            if( student.assessments && 
              student.assessments.length > 0){
                return (
                    <div container >
                        {
                            student.assessments.map(assessment=>{
                                return (
                                  <CustomCard 
                                      data={assessment}
                                      display = {assessment.teacher+"'s"+' '
                                                +assessment.name  }
                                      takeAssessment = {()=>review(assessment)}
                                      />
                                    
                                
                                  
                                )
                            })
                        }
                    </div>
                    
                )
            }
            
        })
      }
      else {
          
          return (
            <div>Loading ...</div>
          )

        }
        
    }

  
    return (
        <Paper elevation = {10} className={classes.paper}>
            {
              renderAssessment()
            }
        </Paper>
    )
}


function CustomCard(props){

  const classes = useStyles();

  return (
    <Card  className = {classes.card} 
            variant="outlined"
            evelation={5}
            onClick={props.takeAssessment}>
      <span>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" align = 'left' gutterBottom>
              {props.data.result != '' ? 'Completed' : 'Pending'}
            </Typography>
            <span className={classes.spanX}>
              {props.display}
            </span>
            {
              props.data.result != '' ?
                (
                  <span className={classes.spanX}>
                    <CircularProgressWithLabel 
                      txt = {props.data.result+'/'+props.data.correctAnswers.length}
                      value = {100}
                      custom={true} size="3rem"
                      variant = "body2"/>  

                    <CircularProgressWithLabel 
                      variant = "caption"
                      value = {props.data.result/props.data.correctAnswers.length*100} size="3rem"/>  
                  </span>
                ) : ''
            }
            
            
   
        </CardContent>
      
      </span>
    </Card>
  )
}
