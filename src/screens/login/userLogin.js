import React, { useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import { UserDetailsContext } from '../../App';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }

  }),
);

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);
  const [userContext,setUserContext] = useContext(UserDetailsContext);

  const [users,setUsers] = useState();

  const hostName  = window.location.hostname === 'localhost'?'http://localhost:3000':'https://67a05636.us-south.apigw.appdomain.cloud/studentgrader';
  async function fetchStudents(){
      const st = await fetch(hostName+'/users');

      const d = await st.json();
      debugger;
      return d;
  } 

  useEffect(() => {

  
   
      
        
        fetchStudents()
            .then(setUsers);
        
 

    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  const handleLogin = () => {
    debugger;
    const userIndex = users.map((x,index)=>{return x.name.toLowerCase()}).indexOf(username.toLowerCase());
    if (userIndex != -1 
        && password === 'password') {
 
      console.log('Jus log');
      setUserContext(users[userIndex]);
          
      if(users[userIndex].category == "Teacher"){
        history.push("/home");
      }else if(users[userIndex].category == "Student"){
        history.push("/student");
      }


      
    } else {
      setError(true);
      setHelperText('Incorrect username or password')
    }
  };

  const handleKeyPress = (e:any) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleLogin();
    }
  };

  return (   
    <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Happy Learning" />
          <CardContent>
            <div>
              <TextField
                error={error}
                fullWidth
                id="username"

                label="Username"  
                color="secondary" 
                onChange={(e)=>setUsername(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
              <TextField
                error={error}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={helperText}
                onChange={(e)=>setPassword(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loginBtn}
              onClick={()=>handleLogin()}
              disabled={isButtonDisabled}>
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </React.Fragment>
  );
}

export default Login;