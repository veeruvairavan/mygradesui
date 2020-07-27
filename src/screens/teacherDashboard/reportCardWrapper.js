import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import ReportCard from './reportCard';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ReportCardWrapper(){

    const hostName = window.location.hostname === 'localhost' ? 
                    'http://localhost:3000' : 
                    'https://67a05636.us-south.apigw.appdomain.cloud/studentgrader';

    const [students,setStudents] = useState([]);
    const [student,setStudent] = useState({name:''});

    async function fetchAllUserAssessments() {

        const st = await fetch(hostName + '/users?filter[include][][relation]=assessments&filter[where][category]=Student');

        const d = await st.json();

        setStudents(d);
    }

    useEffect(()=>{

        fetchAllUserAssessments();
    },[student]);

    return (
        <div>
             <Autocomplete 
                    options = {students}
                    getOptionLabel={(option) => option.name}
                    value = {student}
                    onChange = {(event,newValue)=>{setStudent(newValue)}}
                    renderInput={(params) => <TextField {...params} label="Search Students" variant="outlined" />}
                    />
             <ReportCard student={student}/>
        </div>
    )
}

