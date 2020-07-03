import React, {useEffect,useState} from 'react';

export default function Students(){

    const [students,setStudents] = useState();
    async function fetchStudents(){
        const students = await fetch('http://localhost:3000/users');

        const data = await students.json();

        return data;
    } 
    useEffect(() => {
      
        
        fetchStudents().then(setStudents);
        
    },[]);

    if(students){
        return (<div>{students.map((item,key)=>{
            if(item.category != 'Teacher')
                return <div key={key}>{item.name}</div>
        })}</div>);
    }else{
        return (<div>HHH</div>);
    }

}