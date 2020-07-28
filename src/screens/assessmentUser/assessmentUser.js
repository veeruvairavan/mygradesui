import React, { useEffect, useContext, useState } from 'react';
import { Grid, makeStyles, Card, CardContent, Paper } from '@material-ui/core';
import { UserDetailsContext } from '../../App';
import Typography from 'material-ui/styles/typography';
import { PieChart, Pie, Cell } from 'recharts';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme=>({

    root:{
        display : 'flex',
        justifyContent : 'center',
        flexDirection : 'row',
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
          },
          grid : {
              height: '100vh',
              paddingRight : '10px'

          }
}));

export default function AssessmentUserScreen(){

    const classes = useStyles();

    const [value,setValue] = useContext(UserDetailsContext);

    const [assessments,setAssessments] = useState([]);

    const [allUserAssessments,setAllUserAssessments] = useState([]);
    
    const hostName = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://67a05636.us-south.apigw.appdomain.cloud/studentgrader';

    const [filterdAssessments,setFilteredAssessments] = useState([]);

    const history = useHistory();

    const [chartData, setChartData] = useState([

        { name: "Completed", value: 0 },
        { name: "Pending", value: 0 }

    ]);

    const [students,setStudents] = useState([]);

    const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#FF8042'];
    
    async function fetchAssessments() {

        const st = await fetch(hostName + '/users/'+value.id+'/assessments');

        const d = await st.json();

        return d;
    }

    async function fetchAllUserAssessments() {

        const st = await fetch(hostName + '/assessments');

        const d = await st.json();

        return d;
    }
    

    async function fetchStudents() {

        const st = await fetch(hostName + '/users?filter[where][category]=Student');

        const d = await st.json();

        return d;
    }

    useEffect(()=>{
        redirectToLogin();
        fetchStudents().then((users)=>{

            setStudents(users);
  
            fetchAllUserAssessments().then((d)=>{
                setAllUserAssessments(d);

                fetchAssessments().then((data)=>{
                    setAssessments(data);
                    
                });

            }
            );
        });
        

        
    },[]);

    useEffect(()=>{

        onClick(assessments[0]);

    },[assessments]);

    function redirectToLogin(){
        if(!value.username){
            history.push('/login');
            return;
        }
    }

    return (
        <div> <h3> All your Assessments</h3>

        <Grid container  spacing={2} className = {classes.root}>
            <Grid className={classes.grid}>
                {
                     assessments.map(assessment=>{
                        return(
                            <CustomCard assessment = {assessment} 
                                        onClick = {assessments => onClick(assessment)}/>
                        )
                    }) 

                   
                }
            </Grid>
            <Grid xs={6} className={classes.grid}>
                <Paper className={classes.root}>
                    <div>
                        <label style={{padding:'10px'}}>{filterdAssessments.length} have completed this Assessment so far.</label>
                        
                        <PieChart width={400} height={350} >
                        <Pie
                            data={chartData}
                            cx={175}
                            cy={140}
                            innerRadius={60}
                            outerRadius={90}
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
                    </div>
                </Paper>
            </Grid>
        </Grid>
        </div>
    )

    function onClick(assessment){
        debugger;
        console.log(allUserAssessments);

        let completedAssesments = 0;

        const filterdAssessmentsTemp = [];

        allUserAssessments.map(a=>{
            debugger;
            if(a.extra && 
                a.extra.originalId == assessment.id){
                    filterdAssessmentsTemp.push(a);

                    if(a.status == "Completed"){
                        completedAssesments = completedAssesments + 1;
                    }
                    
            }
        });
        const chartsData = [

            { name: "Completed", value: 0 },
            { name: "Pending", value: 0 }
    
        ];

        chartsData[0].value = filterdAssessmentsTemp.length;
        chartsData[1].value =  students.length - filterdAssessmentsTemp.length;

        setChartData(chartsData);

        
        setFilteredAssessments(filterdAssessmentsTemp);
        
    }

    function CustomCard(props){
        const classes = useStyles();
      
        return (
          <Paper button elevation={5} className={classes.paper} onClick = {props.onClick}>
              <span><b>{props.assessment.name}</b> Assessment has <b>{props.assessment.qa.length}</b> Questions</span>
              <div>Click to view in depth details of this Assessment</div>
          </Paper>
        )
      }
}

