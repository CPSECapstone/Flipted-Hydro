import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {Route, Switch} from 'react-router-dom';
import { useHistory } from 'react-router';
import "./App.css";
import CourseScreen from './Components/CourseScreen.js';
import GoalsScreen from './Components/GoalsScreen.js';
import MCQuizScreen from './Components/MCQuizScreen.js';
import FillBlank from './Components/FillBlank.js';
import FreeResponse from './Components/FreeResponse.js';
import MultiSelect from './Components/MultiSelect.js';
import VideoScreen from './Components/VideoScreen.js';
import ImageScreen from './Components/ImageScreen.js';
import GradeScreen from './Components/GradeScreen';
import Task from './Components/Task';

const HOME_SCREEN_PATH = 'task';

Amplify.configure({
  Auth: {
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
      region: process.env.REACT_APP_REGION,
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      oauth: {
        domain: process.env.REACT_APP_DOMAIN,
        scope: [process.env.REACT_APP_SCOPE_A, process.env.REACT_APP_SCOPE_B, process.env.REACT_APP_SCOPE_C, 
          process.env.REACT_APP_SCOPE_D, process.env.REACT_APP_SCOPE_E],
        redirectSignIn: process.env.REACT_APP_REDIRECT_SIGNIN,
        redirectSignOut: process.env.REACT_APP_REDIRECT_SIGNOUT,
        responseType: process.env.REACT_APP_RESPONSE_TYPE
      }
  }
});

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const hist = useHistory();

  const refreshCredentials = () => {
    return Auth.currentSession()
    .then(session => {
      setAccessToken(session.getAccessToken());
    })
    .catch(() => console.log('not signed in'));
  }

  const client = new ApolloClient({
    uri: process.env.REACT_APP_PROD_URI,
    cache: new InMemoryCache(),
    headers: {
      authorization: accessToken == null? null : accessToken.getJwtToken(),
    }
  });

  const LoginComponent = () => {
  
    if(accessToken) hist.push(HOME_SCREEN_PATH)

    return (
      <div>
        <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
      </div>
    );
  }

  const login = (token) => {
    setAccessToken(token);
    hist.push({
      pathname:HOME_SCREEN_PATH
    });
  }

  const logout = () => {
    setAccessToken(null);
    hist.push({
      pathname:'/'
    });
  }

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          login(data.signInUserSession.getAccessToken());
          console.log('Successful Sign In.');
          console.log(data);
          break;
        case 'signUp':
          login(data.signInUserSession.getAccessToken());
          console.log('user signed up');
          break;
        case 'signOut':
          logout();
          break;
        case 'signIn_failure':
          console.log('Sign In Failure.');
          break;
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });
    refreshCredentials();
  }, []);

  return (
    <div>
      <p className="navbar">
        <p className="title">flipt.ED</p>

        {accessToken == null? <li><a onClick={() => Auth.federatedSignIn()}>Sign In</a></li> :
        
        <div>
        <li><a onClick={() => Auth.signOut()}>Sign Out</a></li>  
        <li><a href="/goalsscreen">Goals</a></li>
        <li><a href="/mcquizscreen">MC Quiz</a></li>
        <li><a href="/FillBlank">Fill-in-the-Blank</a></li> 
        <li><a href="/FreeResponse">Free Response</a></li> 
        <li><a href="/MultiSelect">Multi-Select</a></li> 
        <li><a href="/VideoScreen">Video</a></li> 
        <li><a href="/ImageScreen">Image</a></li> 
        <li><a href="/gradescreen">Grades</a></li> 
        <li><a href="/task">Task</a></li>  
        <li><a href="/coursescreen">Courses</a></li>      
        </div>}
      </p>
      
      
      
      
      <ApolloProvider client={client}>

        <div>
        <Switch>
          <Route component = {LoginComponent} exact path = '/'/>
          <Route component = {CourseScreen} exact path = '/coursescreen'/>
          <Route component = {GoalsScreen} exact path = '/goalsscreen'/>
          <Route component = {MCQuizScreen} exact path = '/mcquizscreen'/>
          <Route component = {FillBlank} exact path = '/FillBlank'/>
          <Route component = {FreeResponse} exact path = '/FreeResponse'/>
          <Route component = {MultiSelect} exact path = '/MultiSelect'/>
          <Route component = {VideoScreen} exact path = '/VideoScreen'/>
          <Route component = {ImageScreen} exact path = '/ImageScreen'/>
          <Route component = {GradeScreen} exact path = '/gradescreen'/>
          <Route component = {Task} exact path = '/task'/>
        </Switch>
        </div>
      </ApolloProvider>
    </div>
  );
}



export default App;
