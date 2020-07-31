/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import GradeIcon from '@material-ui/icons/Grade';
import { UserDetailsContext } from '../../App';
import { green } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex : 200
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display : 'block',
    margin : '1% 0% 0% 0%'
  },
  span1: {
    display: 'flex',
    float: 'left'
  },
  span2: {
    float: 'right'
  }
}));

export default function header() {
  const classes = useStyles();
  const history = useHistory();
  const [userContext,setUserContext] = useContext(UserDetailsContext); 

  const handleLogout = () => {
    userContext.name='';
    setUserContext(userContext);
    //history.push('/login');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <span className={classes.span1}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <GradeIcon />
            </IconButton>
            <div>
              <Typography variant="h6" className={classes.title}>
                 Grader
              </Typography>
              <Typography variant="h7" className={classes.title}>
                Welcome {userContext.firstname}  {userContext.lastname}
              </Typography>
            </div>
          </span>
          {userContext.name?
            <span className={classes.span2}>
              <Tooltip title="Logout">
                <IconButton aria-label="Logout" onClick={handleLogout}>
                    <ExitToAppIcon style={{ color: green[50] }} />
                </IconButton>
              </Tooltip> 
            </span>: ''
          }
        </Toolbar>
        
      </AppBar>
    </div>
  );
}