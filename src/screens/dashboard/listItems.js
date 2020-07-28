import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ViewListIcon from '@material-ui/icons/ViewList';


export const mainListItems= (props) => (
  <div>
    <ListItem button onClick={()=>props.onAction('studentList')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={()=>props.onAction('createAssessment')}>
      <ListItemIcon >

        <NoteAddIcon />

      </ListItemIcon>
      <ListItemText primary="Create Assessment" />
    </ListItem>
    <ListItem button onClick={()=>props.onAction('assessments')}>
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary="View Assessment" />
    </ListItem>
    <ListItem button onClick={()=>props.onAction('reportCard')}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button disabled="true">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Analytics" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Others</ListSubheader>
    <ListItem button disabled="true">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month Reports" />
    </ListItem>
    <ListItem button disabled="true">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter Reports" />
    </ListItem>
    <ListItem button disabled="true">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Annual Reports" />
    </ListItem>
  </div>
);
