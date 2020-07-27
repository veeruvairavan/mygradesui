import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, Avatar, CssBaseline, AppBar } from '@material-ui/core';
import { useHistory, Switch, Route, useRouteMatch } from 'react-router-dom';
import CreateAssessment from '../createAssessments/createAssessment';
import Students from '../students/students';
import ViewAssessments from '../viewAssessments/viewAssessments';
import StudentsTemp from '../students/student-temp';
import ViewAssessment from '../assessment/viewAssessment';
import AssessmentUserScreen from '../assessmentUser/assessmentUser';
import AssessmentList from '../students/assessmentList';
import { UserDetailsContext } from '../../App';
import ReportCard from './reportCard';



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
import ReportCardWrapper from './reportCardWrapper';

const drawerWidth = 265;

const useStyles = makeStyles((theme) => ({
    root: {
      flexgrow: 1,
      height: '90vh'
    },
    avatar:{
        alignSelf : 'center',
        margin:"10px"
    },

    button:{
        margin:"20px"
    },

    h90:{
      height: '90%'
    },

   
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 1%',
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
      top: '4px'
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
      padding: '1% !important',
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      border: '1px solid lightgray',
      margin : '1% 0% 0% 2%',
      height: '100%',
      background: '#fff'
    },
    fixedHeight: {
      height: '100%',
    },
  }));

export default function TeacherDashboard(){

    const classes = useStyles();
    const history = useHistory();
    const {path,url} = useRouteMatch();
    const [value,setValue] = useContext(UserDetailsContext);
   
    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState(11);
    const handleDrawerOpen = () => {
      setOpen(true);
      setSize(9);
    };
    const handleDrawerClose = () => {
      setOpen(false);
      setSize(11);
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
                case 'assessments':
                    history.push('/home/userAssessment');
                    break;
                case 'reportCard' :
                    history.push('/home/reportCard');
                    break

        
            default:
                break;
        }
    }
  

  return (
    <div className={classes.root}>
      <Grid container spacing={1} className={classes.h90}>
        <div item xs={3} >
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
                Student Grading Dashboard
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
            <span>
              {open ? (
                <div className={classes.toolbarIcon}>
                  <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>) : ''}
              <Divider />
            </span>
            <List>{mainListItems({ onAction: onBtnClick })}</List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Drawer>
        </div>
        <Grid spacing={4} item xl={size + 2} lg={size} md={size-1} xs={size - 2} sm={size -3} className={classes.paper}>

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
            <Route exact path='/home/reportCard'>
              <ReportCardWrapper />
            </Route>

          </Switch>

        </Grid>
      </Grid>
    </div>
  );
}