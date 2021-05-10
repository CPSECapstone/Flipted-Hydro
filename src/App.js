import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import {Route, Switch} from 'react-router-dom';
import { useHistory } from 'react-router';
import CourseScreen from './Components/CourseScreen.js';
import GoalList from './Components/GoalList.js';
import GradeScreen from './Components/GradeScreen';
import Mission from './Components/Mission';
import Task from './Components/Task';
import "./App.css";
import MTaskOverview from './Components/MTaskOverview';
import { onError } from '@apollo/client/link/error';

const HOME_SCREEN_PATH = 'mission';

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

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_PROD_URI,
    headers: {
      authorization: accessToken == null? null : accessToken.getJwtToken(),
    },
  });
  const logoutLink = onError(({ graphQLErrors, networkError }) => {
    if(graphQLErrors){
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.warn(message);
      })  
      hist.push({
        pathname:'/',
      })
    } 
  })

  const client = new ApolloClient({
    uri: process.env.REACT_APP_PROD_URI,
    cache: new InMemoryCache({
      typePolicies: {
        Answer: {
          keyFields: ["questionId"],
        },
      }
    }),
    link: logoutLink.concat(httpLink),
    headers: {
      authorization: accessToken == null? null : accessToken.getJwtToken(),
    },
    connectToDevTools: true
  });

  const LoginComponent = () => {
  
    if(accessToken) hist.push(HOME_SCREEN_PATH)

    return (
      <div className="loginPage">
        <h1 className="logo"> flipt.ED </h1>
        <h2> Student Portal </h2>
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
        <li><a href="/gradescreen">Grades</a></li> 
        <li><a href="/mission">Mission</a></li>      
        </div>}
      </p>
      
      
      
      
      <ApolloProvider client={client}>

        <div>
        <Switch>
          <Route component = {LoginComponent} exact path = '/'/>
          <Route component = {GoalList} exact path = '/goalsscreen'/>
          <Route component = {GradeScreen} exact path = '/gradescreen'/>
          <Route component = {Mission} exact path = '/mission'/>
          <Route component = {Task} exact path = '/task'/>
          <Route component = {MTaskOverview} exact path = '/mtaskoverview'/>
        </Switch>
        </div>
      </ApolloProvider>
    </div>
  );
}



export default App;
