import React, {useEffect,useState} from 'react';
import SimpleTable from '../../components/SimpleTable';

export default function StudentsTemp(){

    const [students,setStudents] = useState();
    const hostName  = window.location.hostname === 'localhost'?'http://localhost:3000':'https://67a05636.us-south.apigw.appdomain.cloud/studentgrader';
    async function fetchStudents(){
        const st = await fetch(hostName+'/users?filter[include][][relation]=assessments');

        const d = await st.json();

        return d;
    } 
    useEffect(() => {
      
        
        fetchStudents()
            .then((students)=>{sortAndOrderStudents(students)});
        
    },[]);

    function sortAndOrderStudents(students){
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

    const columns = ["Name",
                    "Catgeory",
                    "No. of Assessments",
                    "Points",
                    "Badges",
                    "Rank"];

                    

    const rows = [
                    {key: 'name',isLengthCheck:false},
                    {key: 'category',isLengthCheck:false},
                    {key: 'assessments',isLengthCheck:true},
                    {key: 'points',isLengthCheck:false},
                    {key: 'badges',isLengthCheck:true},
                    {key: 'rank',isLengthCheck:false}
                 ];



   if(students){
    return (<div>
                <h3> Leader Board</h3>
                <SimpleTable columns = {columns} rows= {rows} data={students}/>
            </div>);
   }else{
       return <div>Loading ...</div>
   }
    
}