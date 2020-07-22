import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import {TableContainer,
        Table,
        TableHead,
        TableRow,
        TableBody,
        TableCell
      } from '@material-ui/core';


export default function SimpleTable(props){

    const {columns,rows,data} = props;

    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.info.dark,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
    }))(TableCell);
      
    const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
    }))(TableRow);
    

    return (<TableContainer>
                <TableContainer>
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column)=> (
                                <StyledTableCell align="right">{column}</StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((d)=>(
                                d.category === "Student" ?  (
                                    <StyledTableRow key={d.name}>
                                        {
                                            rows.map((row)=>(
                                                <StyledTableCell align="right">{row.isLengthCheck ? 
                                                    d[row.key]?.length : d[row.key]}</StyledTableCell>
                                            ))
                                        }
                                    </StyledTableRow>
                                ) : <div></div>
                               
                            
                            ))
                        }
                    </TableBody>
                </TableContainer>
            </TableContainer>)
}