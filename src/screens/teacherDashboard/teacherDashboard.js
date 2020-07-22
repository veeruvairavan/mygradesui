import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button, Avatar, CssBaseline, AppBar} from '@material-ui/core';
import {useHistory, Switch, Route, useRouteMatch} from 'react-router-dom';
import CreateAssessment from '../createAssessments/createAssessment';
import Students from '../students/students';
import ViewAssessments from '../viewAssessments/viewAssessments';
import StudentsTemp from '../students/student-temp';
import ViewAssessment from '../assessment/viewAssessment';
import AssessmentUserScreen from '../assessmentUser/assessmentUser';
import AssessmentList from '../students/assessmentList';
import { UserDetailsContext } from '../../App';



import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';

import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';


import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import Chart from '../dashboard/Chart';
import Deposits from '../dashboard/Deposits';
import Orders from '../dashboard/Orders';
import { mainListItems, secondaryListItems } from '../dashboard/listItems';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    root: {
      display:'flex'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight : '85vh',
      height:'100%',
      margin:'10px'

    },
    avatar:{
        alignSelf : 'center',
        margin:"10px"
    },

    button:{
        margin:"20px"
    },

   
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

export default function TeacherDashboard(){

    const classes = useStyles();
    const history = useHistory();
    const {path,url} = useRouteMatch();
    const [value,setValue] = useContext(UserDetailsContext);
   
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const onBtnClick = (action) =>{
    

        switch (action) {
            case 'studentList':
                    history.push('/home/students');
                    break;
                case 'createAssessment':
                    history.push('/home/assessment');
                    break;
                case 'viewAssessments':
                    history.push('/home/view');
                    break;
        
            default:
                break;
        }
    }

    return (
      <div  className={classes.root}>
        <Grid container spacing={1}>
          <div item xs={4}>
          <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems({onAction:onBtnClick})}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
          </div>
          <Grid item xs={9} className = {classes.paper}>
           
                <Switch>
                    <Route exact path="/home">
                        <StudentsTemp />
                    </Route>
                    <Route exact path="/home/students" >
                        <StudentsTemp />
                    </Route>
                    <Route exact path="/home/assessment" >
                            <CreateAssessment />
                    </Route>
                    <Route exact path="/home/view" >
                            <ViewAssessments />
                    </Route>
                    <Route exact path="/home/viewAssessment" >
                            <ViewAssessment />
                    </Route>
                    <Route exact path="/home/userAssessment">
                            <AssessmentUserScreen />
                    </Route>
                    
                </Switch>
        
          </Grid>
        </Grid>
      </div>
    );
}