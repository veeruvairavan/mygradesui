import React from 'react';

import {TableContainer,
        Table,
        TableHead,
        TableRow,
        TableBody,
        TableCell
      } from '@material-ui/core';


export default function SimpleTable(props){

    const {columns,rows,data} = props;
    

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
                            data.map((d)=>(
                                d.category == "Student" ?  (
                                    <TableRow key={d.name}>
                                        {
                                            rows.map((row)=>(
                                                <TableCell align="right">{row.isLengthCheck ? 
                                                    d[row.key]?.length : d[row.key]}</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ) : <div></div>
                               
                            
                            ))
                        }
                    </TableBody>
                </TableContainer>
            </TableContainer>)
}