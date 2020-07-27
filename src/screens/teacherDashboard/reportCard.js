import React, { useState } from 'react';
import { Paper, makeStyles, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';

const useStyles = makeStyles((theme) => ({
    paper: {

        width: '90vw',
        margin: `${theme.spacing(0)} auto`,
        height: '90vh',
        padding: '10px'


    }
}))

export default function ReportCard(props) {

    const classes = useStyles();

    const student = props.student;

    if (student && student.assessments && student.assessments.length > 0) {
        return (
            <Paper elevation={5} className={classes.paper}>
                <div style={{ margin: '5px', padding: '10px' }}>
                    <Typography variant="h6" component='h6'>
                        <b>First Name</b> {student.firstname}
                    </Typography>
                </div>
                <div style={{ margin: '5px', padding: '10px' }}>
                    <Typography variant="h6" component='h6'>
                        <b>Last Name</b> {student.lastname}
                    </Typography>
                </div>
                <div style={{ margin: '5px', padding: '10px' }}>
                    <Typography variant="h6" component='h6'>
                        <b>Assessments</b>
                    </Typography>
                </div>
                <div>
                    {

                        student.assessments.map(assessment => {
                            return (
                                <Paper style={{ margin: '5px', padding: '10px' }} elevation={3}>
                                    <div>
                                        <CircularProgressWithLabel
                                            txt={assessment.result + '/' + assessment.correctAnswers.length}
                                            value={100}
                                            custom={true} size="3rem"
                                            variant="body2" />
                                        <Typography variant="h6" component='h6'>

                                            <Grid xs={6}>
                                                <b>Assessment</b> : {assessment.name}
                                            </Grid>
                                            <Grid xs={6}>
                                                <b>Percentage</b> : {Math.round((assessment.result / assessment.correctAnswers.length) * 100)}%

                       </Grid>




                                        </Typography>
                                    </div>


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