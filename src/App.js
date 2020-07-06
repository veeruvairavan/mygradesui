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

export default function App() {

  


  return (
    <Router>
      <TeacherDashboard />
    </Router>
  );
}


