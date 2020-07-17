import React from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
    holder: {
      flexGrow : 1
    
    },
   
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

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
              debugger;
              if( teacher.assessments && 
                  teacher.assessments.length > 0){
                  return (
                      <Grid container >
                          {
                              teacher.assessments.map(assessment=>{
                                  return (
                                    <Grid xs={3}>
                                      <OutlinedCard teacher = {teacher}
                                                  assessment = {assessment}
                                                  takeAssessment = {()=>takeAssessment(assessment)} 
                                                  review = {()=>review(assessment)} 
                                                  />
                                    </Grid>
                                      
                                  
                                    
                                  )
                              })
                          }
                      </Grid>
                      
                  )
              }
              
          })
        }if(student && student.length >0 ){
          return student.map((student)=>{
            debugger;
            if( student.assessments && 
              student.assessments.length > 0){
                return (
                    <Grid container >
                        {
                            student.assessments.map(assessment=>{
                                return (
                                  <Grid xs={3}>
                                    <OutlinedCard student = {student}
                                                assessment = {assessment}
                                                review = {()=>review(assessment)}  />
                                  </Grid>
                                    
                                
                                  
                                )
                            })
                        }
                    </Grid>
                    
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
        <div className={classes.holder}>
            {
               renderAssessment()
            }
        </div>
    )
}

function OutlinedCard(prop) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
  
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {(prop.assessment.status && prop.assessment.status == 'created') ? 'Yet To Start': prop.assessment.status}
          </Typography>
          <Typography variant="h5" component="h2">
            Mr.{prop.teacher ? prop.teacher.name : prop.student.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {prop.assessment.name}
          </Typography>
          <Typography variant="body2" component="p">
            Complete it faster and Earn a badge
            <br />
            Look up Timer will be running
          </Typography>
        </CardContent>
        {
          (prop.teacher != null) ?
          (<CardActions>
            <Button size="small" onClick={prop.takeAssessment}>Take Assessment</Button>
          </CardActions>)
          :
          (<CardActions>
            <Button size="small" onClick={prop.review}>Review Assessment</Button>
          </CardActions>)
        }
        
      </Card>
    );
  }