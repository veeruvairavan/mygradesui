import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import CreateAssessment from './screens/createAssessments/createAssessment';
import Students from './screens/students/students';
import TeacherDashboard from './screens/teacherDashboard/teacherDashboard';
import SimpleTable from "./components/SimpleTable";
import StudentDashboard from "./screens/students/studentDashboard";
import Assessment from "./screens/students/assessment";
import ViewAssessment from "./screens/assessment/viewAssessment";

export default function App() {

  


  return (
    <Router>
      <Switch>
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
  );
}


