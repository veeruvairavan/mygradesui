import React, {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import TitlebarGridList from '../../components/TitleBarGridList';
import AssessmentList from './assessmentList';

const useStyles = makeStyles((theme)=>({

}));

export default function StudentDashboard(){

    const classes = useStyles();

    const [value,setValue] = useState(30);

    const [teachers,setTeachers] = useState([]);

    async function fetchUsers(){
        
        const st = await fetch('http://localhost:3000/users?filter[include][][relation]=assessments');

        const d = await st.json();

        return d;
    } 

    function isolateTeachers(data){

        const teachers = data.filter((user)=>{
            return (user.category == 'Teacher');
        });

        setTeachers(teachers);
    }

    useEffect(() => {
      
        
        fetchUsers()
            .then(isolateTeachers);
        
    },[]);

    return (
        <div>
           <AssessmentList teachers= {teachers} />
        </div>
    )
}