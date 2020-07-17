import React, {useState, useEffect, useContext}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import TitlebarGridList from '../../components/TitleBarGridList';
import AssessmentList from './assessmentList';
import { UserDetailsContext } from '../../App';

const useStyles = makeStyles((theme)=>({
    root:{
        display:"flex",
        direction:"column"
    }
}));

export default function StudentDashboard(){

    const classes = useStyles();

    const [value,setValue] = useState(30);

    const [teachers,setTeachers] = useState([]);

    const [student,setStudent] = useState([]);

    const [userContext,setUserContext] = useContext(UserDetailsContext);

    const hostName  = window.location.hostname === 'localhost'?'http://localhost:3000':'';
    
    async function fetchUsers(){
        
        const st = await fetch(hostName+'/users?filter[include][][relation]=assessments');

        const d = await st.json();

        return d;
    } 

    function isolateTeachers(data){

        const teachers = data.filter((user)=>{
            return (user.category == 'Teacher');
        });

        const student =  data.filter((user)=>{
            return (user.id == userContext.id);
        });

        

        setTeachers(teachers);
        setStudent(student);
    }

    useEffect(() => {
      
        
        fetchUsers()
            .then(isolateTeachers);
        
    },[]);

    return (
        <div className={classes.root}>
           <AssessmentList teachers= {teachers} />
           <hr/>
           <AssessmentList student= {student}/>
        </div>
    )
}