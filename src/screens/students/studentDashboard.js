import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import TitlebarGridList from '../../components/TitleBarGridList';
import AssessmentList from './assessmentList';
import { UserDetailsContext } from '../../App';
import {
    PieChart, Pie, Sector, Cell,
} from 'recharts';
import { Paper, Box } from '@material-ui/core';
import assessment from 'material-ui/svg-icons/action/assessment';
import Typography from 'material-ui/styles/typography';


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        direction: "column"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        height: '50%',
        margin: '10px'

    },
    pointsWrapper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        height: '30%',
        margin: '10px'
    },
    points : {
        fontSize : '34px',
        color:'red'
    }

}));

export default function StudentDashboard() {

    const classes = useStyles();

    const [value, setValue] = useState(30);

    const [teachers, setTeachers] = useState([]);

    const [student, setStudent] = useState([]);

    const [userContext, setUserContext] = useContext(UserDetailsContext);

    const [chartData, setChartData] = useState([

        { name: "Above 80%", value: 0 },
        { name: "Below 80%", value: 0 }

    ]);

    const hostName = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://67a05636.us-south.apigw.appdomain.cloud/studentgrader';

    async function fetchUsers() {

        const st = await fetch(hostName + '/users?filter[include][][relation]=assessments');

        const d = await st.json();

        return d;
    }



    const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#FF8042'];

    function isolateTeachers(data) {

        const teachers = data.filter((user) => {
            user.assessments = user.assessments?.filter(assessment => {
                return (userContext.prefs?.length > 0 &&
                    userContext.prefs[0].completed.indexOf(assessment.id) == -1);
            })
            return (user.category == 'Teacher');
        });




        const student = data.filter((user) => {
            return (user.id == userContext.id);
        });



        setTeachers(teachers);
        setStudent(student);
        setStudentAssessmentChartData(student[0]?.assessments);
    }

    const percentages = [];
    function setStudentAssessmentChartData(assessments) {
        assessments.map(assessment => {
            percentages.push(assessment.result / assessment.correctAnswers.length * 100);
        });

        var above80 = [];
        percentages.map((x) => {
            if (x >= 80) {
                above80.push(x);
            }
        });

        setChartData([{ name: "Above 80%", value: above80.length }, { name: "Below 80%", value: percentages.length - above80.length }])
    }

    useEffect(() => {


        fetchUsers()
            .then(isolateTeachers);

    }, []);

    return (
        <div className={classes.root}>
            <div>
                <Paper elevation={10} className={classes.pointsWrapper}>
                
                <div className={classes.points}>
                    {userContext.points+' Pts'}
                </div>
                     

                  
                </Paper>
                <Paper elevation={10} className={classes.paper}>
                    <div> Your score Range </div>
                    <PieChart width={350} height={300} >
                        <Pie
                            data={chartData}
                            cx={175}
                            cy={140}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            isAnimationActive={false}
                            label={(value) => { return value.name }}
                            position="insideStart"
                        >
                            {
                                chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }

                        </Pie>
                    </PieChart>
                </Paper>
            </div>



            <AssessmentList teachers={teachers} />

            <AssessmentList student={student} />
        </div>
    )
}