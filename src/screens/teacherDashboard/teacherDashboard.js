import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button, Avatar} from '@material-ui/core';
import {useHistory, Switch, Route, useRouteMatch} from 'react-router-dom';
import CreateAssessment from '../createAssessments/createAssessment';
import Students from '../students/students';
import ViewAssessment from '../viewAssessments/viewAssessment';
import StudentsTemp from '../students/student-temp';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height:'100vh',
      margin:'10px'

    },
    avatar:{
        alignSelf : 'center',
        margin:"10px"
    },

    button:{
        margin:"20px"
    }
  }));

export default function TeacherDashboard(){

    const classes = useStyles();
    const history = useHistory();
    const {path,url} = useRouteMatch();

    const onBtnClick = (action) =>{
    

        switch (action) {
            case 'studentList':
                    history.push('/home/students');
                    break;
                case 'createAssessment':
                    history.push('/home/assessment');
                    break;
                case 'viewAssessments':
                    history.push('/home/view');
                    break;
        
            default:
                break;
        }
    }

    return (
      <div  className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={5}>
                <Avatar src="/broken-image.jpg" className={classes.avatar}/>
                <span>Mr. Fredicks</span>
                <Button variant="outlined" 
                        className={classes.button} 
                        onClick={()=>onBtnClick('studentList')}>Students List</Button>
                <Button variant="outlined" 
                        className={classes.button}
                        onClick={()=>onBtnClick('createAssessment')}>Create Assessments</Button>
                <Button variant="outlined" 
                        className={classes.button}
                        onClick={()=>onBtnClick('viewAssessments')}>View All Assessments</Button>
            </Paper>
          </Grid>
          <Grid item xs={8} >
            <Paper className={classes.paper}>
                <Switch>
                    <Route exact path="/home">
                        <StudentsTemp />
                    </Route>
                    <Route exact path="/home/students" >
                        <StudentsTemp />
                    </Route>
                    <Route exact path="/home/assessment" >
                            <CreateAssessment />
                    </Route>
                    <Route exact path="/home/view" >
                            <ViewAssessment />
                    </Route>
                </Switch>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
}