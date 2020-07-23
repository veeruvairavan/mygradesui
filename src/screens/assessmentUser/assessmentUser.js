import React, { useEffect, useContext, useState } from 'react';
import { Grid, makeStyles, Card, CardContent, Paper } from '@material-ui/core';
import { UserDetailsContext } from '../../App';
import Typography from 'material-ui/styles/typography';

const useStyles = makeStyles(theme=>({

    root:{
        display : 'flex',
        justifyContent : 'center',
        flexDirection : 'column',
        alignItems : 'center',
        width:'100%',
        paddingTop : '20px'
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
  
          paper :{
            height:'10%',
            width:'100% !important',
            minHeight : '50px',
            marginBottom : "2px",
            padding:'10px'
          }
}));

export default function AssessmentUserScreen(){

    const classes = useStyles();

    const [value,setValue] = useContext(UserDetailsContext);

    const [assessments,setAssessments] = useState([]);
    
    const hostName = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://67a05636.us-south.apigw.appdomain.cloud/studentgrader';

    async function fetchAssessments() {

        const st = await fetch(hostName + '/users/'+value.id+'/assessments');

        const d = await st.json();

        return d;
    }

    useEffect(()=>{
        fetchAssessments().then(setAssessments);
    },[]);

    return (
        <Grid container  spacing={2} className = {classes.root}>
            <Grid xs={12} >
                {
                    assessments?.map(assessment=>{
                        return(
                            <CustomCard assessment = {assessment}/>
                        )
                    })
                }
            </Grid>
        </Grid>
    )

    function CustomCard(props){
        debugger;
        const classes = useStyles();
      
        return (
          <Paper elevation={5} className={classes.paper}>
              <span><b>{props.assessment.name}</b> Assessment has <b>{props.assessment.qa.length}</b> Questions</span>
              <div>Click to view in depth details of this Assessment</div>
          </Paper>
        )
      }
}

