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
          fontWeight : 'bold',
          //'min-width' : '150px'
        },
        body: {
          fontSize: 14,
          //padding: '2%',
        },
        root: {
            //padding: '5%'
        }
    }))(TableCell);
      
    const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
    }))(TableRow);

    const StyledTableContainer = withStyles((theme) => ({
        root: {
          'overflow': 'auto',
        },
    }))(TableContainer);

    const StyledInnerTableContainer = withStyles((theme) => ({
        root: {
          'overflow': 'auto',
          display : 'table'
        },
    }))(TableContainer);
    

    return (<StyledTableContainer>
                <StyledInnerTableContainer>
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column)=> (
                                <StyledTableCell>{column}</StyledTableCell>
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
                                                <StyledTableCell>{row.isLengthCheck ? 
                                                    d[row.key]?.length : d[row.key]}</StyledTableCell>
                                            ))
                                        }
                                    </StyledTableRow>
                                ) : <div></div>
                               
                            
                            ))
                        }
                    </TableBody>
                </StyledInnerTableContainer>
            </StyledTableContainer>)
}