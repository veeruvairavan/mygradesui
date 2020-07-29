import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import TitlebarGridList from '../../components/TitleBarGridList';
import AssessmentList from './assessmentList';
import { UserDetailsContext } from '../../App';
import {
    PieChart, Pie, Sector, Cell,ResponsiveContainer ,
} from 'recharts';
import { Paper, Box, Backdrop, CircularProgress } from '@material-ui/core';
import assessment from 'material-ui/svg-icons/action/assessment';
import Typography from 'material-ui/styles/typography';
import Score from '../../components/Score';
import StudentReportCardWrapper from './studentReportCardWrapper';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        direction: "column",
        height: "81%"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        height: '44%',
        margin: '3%'

    },
    pointsWrapper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        height: '44%',
        margin: '3%'
    },
    points : {
        fontSize : '34px',
        color:'red'
    },
    width33 : {
        width: '33.3%',
        'margin-top': '2%',
        height : '96%'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      }

}));

export default function StudentDashboard() {

    const classes = useStyles();

    const [value, setValue] = useState(30);

    const [teachers, setTeachers] = useState([]);

    const [student, setStudent] = useState([]);

    const history = useHistory();

    const [userContext, setUserContext] = useContext(UserDetailsContext);

    const [open,setOpen] = useState(true);

    

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

        setOpen(false);

        const teachers = data.filter((user) => {
            user.assessments = user.assessments?.filter(assessment => {
                return (userContext.prefs?.length > 0 &&
                    userContext.prefs[0].completed?.indexOf(assessment.id) == -1);
            })
            return (user.category === 'Teacher');
        });




        const student = data.filter((user) => {
            return (user.id === userContext.id);
        });


        debugger;
        setTeachers(teachers);
        setStudent(student);
        setStudentAssessmentChartData(student[0]?.assessments);
    }

    const percentages = [];
    function setStudentAssessmentChartData(assessments) {

        if(!assessments){
            setChartData([{ name: "Above 80%", value: 0 }, { name: "Below 80%", value: 0 }]);

            return;
        }
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
        redirectToLogin();

        fetchUsers()
            .then(isolateTeachers);

    }, []);

    function redirectToLogin(){
        if(!userContext.username){
            history.push('/login');
            return;
        }
    }


    return (
       
        <div className={classes.root}>

           
            <div className={classes.width33}>
                <Paper elevation={10} className={classes.pointsWrapper}>
                
                
                <Score score={userContext.points} suffix={'Pts'} />
                 <StudentReportCardWrapper student={student[0]}/>     

                  

                </Paper>
                <Paper elevation={10} className={classes.paper}>
                    <div> Your score Range </div>
                    <ResponsiveContainer width="95%" height="100%">
                        <PieChart >
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
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
                    </ResponsiveContainer>
                </Paper>
            </div>



            <AssessmentList teachers={teachers} />

            <AssessmentList student={student} />

            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}