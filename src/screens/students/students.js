import React, {useEffect,useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

export default function Students(){
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

    const useStyles = makeStyles({
        table: {
          minWidth: 100,
        },
        header:{
            float:"left"
        },
        addUser:{
            float: "right",
            margin: "15px"

        },
        formControl: {
            width:"100%",
        },
    });

    const classes = useStyles();
    //Move to a service call
    const assessments = [
        'Assessments 1',
        'Assessments 2',
        'Assessments 3',
        'Assessments 4',
        'Assessments 5',
    ];
      
    const [students,setStudents] = useState();
    const [open, setOpen] = useState(false);
    const [assessment, setAssessment] = useState([]);
    const [studentForm, setStudentForm] = useState({
        name:"",
        class:"",
        assessments:[]
    });

    const handleStudentFormChange = (event) => {
        setStudentForm({
            ...studentForm,
            [event.target.name]: event.target.value,
        })
    }

    const handleChange = (event) => {
        setAssessment(event.target.value);
        studentForm.assessments = assessment;
    };
    const hostName  = window.location.hostname === 'localhost'?'http://localhost:3000':'';
    async function fetchStudents(){
        const students = await fetch(hostName+'/users');

        const data = await students.json();

        return data;
    } 

    async function deleteStudents(item) {
        /* Need to write Delete code */
        console.log(item);
    }

    const editStudent = (item) => {
        console.log(item);
    }

    const addStudentDialog = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = event => {
        event.preventDefault();
        handleClose();
        console.log(studentForm);
        //Service Call
    }

    useEffect(() => {
        fetchStudents().then(setStudents);
    },[]);

    if(students){
        return(
            <div>
                <h2 className={classes.header}>Students List</h2>
                <span className={classes.addUser}>
                    <PersonAddIcon fontSize="large" onClick={() => addStudentDialog()}/>
                </span>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {students.map((item,key) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell component="th" scope="row">
                                    {item.id}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {item.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                <EditIcon color="action" onClick={() => editStudent(item)}/> 
                                <DeleteIcon color="action" onClick={() => deleteStudents(item)}/>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                    <form onSubmit={handleCreate}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            onChange={handleStudentFormChange}
                        />
                        <TextField
                            margin="dense"
                            id="class"
                            name="class"
                            label="Class"
                            type="text"
                            fullWidth
                            onChange={handleStudentFormChange}
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel id="checkbox-label">Assessments</InputLabel>
                            <Select
                                margin="dense"
                                labelId="checkbox-label"
                                id="Assessments"
                                name="assessments"
                                multiple
                                value={assessment}
                                onChange={handleChange}
                                input={<Input fullWidth/>}
                                renderValue={(selected) => selected.join(', ')}
                                fullWidth
                            >
                            {assessments.map((assessmentName) => (
                                <MenuItem key={assessmentName} value={assessmentName}>
                                    <Checkbox checked={assessment.indexOf(assessmentName) > -1} />
                                    <ListItemText primary={assessmentName} />
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Create
                        </Button>
                    </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }else{
        return (<div>HHH</div>);
    }

}