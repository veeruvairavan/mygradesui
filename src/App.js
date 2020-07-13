import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
} from "react-router-dom";

import Header from './screens/header/header';
import UserLogin from './screens/login/userLogin';
import CreateAssessment from './screens/createAssessments/createAssessment';
import Students from './screens/students/students';
import TeacherDashboard from './screens/teacherDashboard/teacherDashboard';
import SimpleTable from "./components/SimpleTable";
import StudentDashboard from "./screens/students/studentDashboard";
import Assessment from "./screens/students/assessment";
import ViewAssessment from "./screens/assessment/viewAssessment";

export default function App() {


  return (
    <div>
    <Header />

    <Router>
      <Switch>
            <Route  path="/login">
              <UserLogin />
            </Route>
            <Route  path="/home">
              <TeacherDashboard />
            </Route>
            <Route path="/student">
              <StudentDashboard />
            </Route>
            <Route path="/assessment">
              <Assessment />
            </Route>
      </Switch>
    </Router>
    </div>
  );
}


