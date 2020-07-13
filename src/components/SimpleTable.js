import React from 'react';

import {TableContainer,
        Table,
        TableHead,
        TableRow,
        TableBody,
        TableCell
      } from '@material-ui/core';


export default function SimpleTable(props){

    const {columns,rows} = props;
    

    return (<TableContainer>
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            {columns.map((column)=> (
                                <TableCell align="right">{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map((row)=>(
                                row.category == "Student" ?  (
                                    <TableRow key={row.name}>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.category}</TableCell>
                                        <TableCell align="right">{row.assessments?.length}</TableCell>
                                        <TableCell align="right">{row.status}</TableCell>
                                        <TableCell align="right">{row.badges.length}</TableCell>
                                    </TableRow>
                                ) : <div></div>
                               
                            
                            ))
                        }
                    </TableBody>
                </TableContainer>
            </TableContainer>)
}