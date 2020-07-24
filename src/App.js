import React, {createContext,useState} from "react";
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
import AssessmentResult from "./screens/students/assessmentResult";
import Dashboard from "./screens/dashboard/Dashboard";

export const UserDetailsContext = createContext({},()=>{});

export default function App() {

  const [value, setValue] = useState({
    username : ''
  });

  return (
    <UserDetailsContext.Provider value={[value,setValue]}>
      <div class="app">
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
               <Route path="/result">
                 <AssessmentResult />
               </Route>
          </Switch>
        </Router>
      </div>
    </UserDetailsContext.Provider>
  );
}


