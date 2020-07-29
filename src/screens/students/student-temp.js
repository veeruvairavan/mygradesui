import React, {useEffect,useState,useContext} from 'react';
import SimpleTable from '../../components/SimpleTable';
import ViewAssessment from '../assessment/viewAssessment';
import AssessmentUserScreen from '../assessmentUser/assessmentUser';
import { UserDetailsContext } from '../../App';
import { useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress, makeStyles, Paper } from '@material-ui/core';


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

export default function StudentsTemp(){

    const classes = useStyles();

    const [students,setStudents] = useState();
    const history = useHistory();
    const [userContext, setUserContext] = useContext(UserDetailsContext);
    const [open,setOpen] = useState(true);

    const hostName  = window.location.hostname === 'localhost'?'http://localhost:3000':'https://67a05636.us-south.apigw.appdomain.cloud/studentgrader';
    async function fetchStudents(){
        const st = await fetch(hostName+'/users?filter[include][][relation]=assessments');

        const d = await st.json();

        return d;
    } 
    useEffect(() => {
        redirectToLogin();
        
        fetchStudents()
            .then((students)=>{sortAndOrderStudents(students)});
        
    },[]);

    function redirectToLogin(){
        if(!userContext.username){
            history.push('/login');
            return;
        }
    }

    function sortAndOrderStudents(students){
        setOpen(false);
        students.sort((a,b) => (a.points < b.points) ? 1 : ((b.points < a.points) ? -1 : 0)); 

       

        setStudents(students);
    }

    function setRows(){
        console.log(students);
        alert(students);
        /*rows = students.map((student)=>{
            return {name:student.name, catg:student.category, badge:student.badge};
        });*/
    }

    const columns = ["First Name",
                     "Last Name",
                     "Gender",
                    "Catgeory",
                    "Completed Assessments",
                    "Points",
                    "Badges",
                    "Grade",
                    "Contact",
                    "Email",
                     "Address"];

                    

    const rows = [
                    {key: 'firstname',isLengthCheck:false},
                    {key: 'lastname',isLengthCheck:false},
                    {key: 'gender',isLengthCheck:false},
                    {key: 'category',isLengthCheck:false},
                    {key: 'assessments',isLengthCheck:true},
                    {key: 'points',isLengthCheck:false},
                    {key: 'badges',isLengthCheck:true},
                    {key: 'grade',isLengthCheck:false},
                    {key: 'contact',isLengthCheck:false},
                    {key: 'email',isLengthCheck:false},
                    {key: 'address',isLengthCheck:false}
                 ];



   if(students){
    return (<div>
                <h3 style={{marginTop:'-1px'}}> Leader Board</h3>
                <Paper elevation={3} style={{width:'100%'}}>
                    <SimpleTable columns = {columns} rows= {rows} data={students.slice(0, 3)}/>
                </Paper>
                <AssessmentUserScreen />
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>);
   }else{
       return <div>Loading ...</div>
   }
    
}