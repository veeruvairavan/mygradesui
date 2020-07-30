import React, { useState } from 'react';
import { Paper, makeStyles, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';

const useStyles = makeStyles((theme) => ({
    paper: {

        width: '90%',
        margin: `${theme.spacing(0)} auto`,
        height: '100%',
        padding: '10px'


    },
    spanX  : { 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        width: '100%',
        textAlign: 'center'
      }
}))

export default function ReportCard(props) {

    const classes = useStyles();

    const student = props.student;

    if (student && student.assessments && student.assessments.length > 0) {
        return (
            <Paper elevation={5} className={classes.paper}>
                <div style={{ margin: '5px', padding: '10px' }}>
                    <Typography variant="body1" component='body1'>
                        <b>First Name</b> {student.firstname}
                    </Typography>
                </div>
                <div style={{ margin: '5px', padding: '10px' }}>
                    <Typography variant="body1" component='body1'>
                        <b>Last Name</b> {student.lastname}
                    </Typography>
                </div>
                <div style={{ margin: '5px', padding: '10px' }}>
                    <Typography variant="body1" component='body1'>
                        <b>Grade</b> {student.grade}
                    </Typography>
                </div>
                <div style={{ margin: '5px', padding: '10px' }}>
                    <Typography variant="body1" component='body1'>
                        <b>Points Scored</b> {student.points}
                    </Typography>
                </div>
                <div style={{ margin: '5px', padding: '10px' }}>
                    <Typography variant="body1" component='body1'>
                        <b>Assessments</b>
                    </Typography>
                </div>
                <div>
                    {

                        student.assessments.map(assessment => {
                            return (
                                <Paper style={{ margin: '5px', padding: '10px' }} elevation={3}>
                                    <span style={{display:'flex',alignItems:'center'}} >
                                        <CircularProgressWithLabel
                                            txt={assessment.result + '/' + assessment.correctAnswers.length}
                                            value={100}
                                            custom={true} size="3rem"
                                            variant="body2" />
                                       

                                            <div style={{paddingRight:'10px'}}>
                                                <b>Assessment</b> : {assessment.name}
                                             </div>

                                            <div>
                                                <b>Percentage</b> : {Math.round((assessment.result / assessment.correctAnswers.length) * 100)}%
                                            </div>
                                                
                                         
                                         
                                   
                                    </span>


                                </Paper>
                            )
                        })

                    }

                </div>
            </Paper>
        )
    } else {
        return (
            <div style={{ margin: '5px', padding: '10px' }}>Load your Report Card</div>
        )
    }


}