import React, {useEffect,useState} from 'react';
import SimpleTable from '../../components/SimpleTable';

export default function StudentsTemp(){

    const [students,setStudents] = useState();
    const hostName  = window.location.hostname === 'localhost'?'http://localhost:3000':'https://studentgrader.apic.eu-gb.mybluemix.net';
    async function fetchStudents(){
        const st = await fetch(hostName+'/users?filter[include][][relation]=assessments');

        const d = await st.json();

        return d;
    } 
    useEffect(() => {
      
        
        fetchStudents()
            .then(setStudents);
        
    },[]);

    function setRows(){
        console.log(students);
        alert(students);
        /*rows = students.map((student)=>{
            return {name:student.name, catg:student.category, badge:student.badge};
        });*/
    }

    const columns = ["Name",
                    "Catgeory",
                    "No. of Assessments",
                    "Status",
                    "Badges"];

                    

    const rows = [
                    {key: 'name',isLengthCheck:false},
                    {key: 'category',isLengthCheck:false},
                    {key: 'assessments',isLengthCheck:true},
                    {key: 'status',isLengthCheck:false},
                    {key: 'badges',isLengthCheck:true}
                 ];



   if(students){
    return (<SimpleTable columns = {columns} rows= {rows} data={students}/>);
   }else{
       return <div>Loading ...</div>
   }
    
}