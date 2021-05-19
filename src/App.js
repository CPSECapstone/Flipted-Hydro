import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import {Route, Switch} from 'react-router-dom';
import GoalList from './Components/Goals/GoalList.js';
import { useHistory } from 'react-router';
import Courses from './Components/Courses.js';
import GradeScreen from './Components/GradeScreen';
import MissionsScreen from './Components/MissionsScreen';
import Mission from './Components/Mission';
import Task from './Components/Task';
import MTaskOverview from './Components/MTaskOverview';
import NavDrawer from './Components/NavDrawer';
import { onError } from '@apollo/client/link/error';
import "./App.css";

const HOME_SCREEN_PATH = 'missions';
const CURRENT_GRAPHQL_API_URI = process.env.REACT_APP_PROD_URI;

//configures amplify to connect to our authentication server in AWS
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

  /*
   * This function will refresh the current users credentials,
   * if their credentials are present. The Auth.currentSession()
   * throws an error if the user is not signed in, but this is
   * not actual error to us, since this will happen anytime the user
   * opens the app but is not signed in. That is why the catch block
   * is empty in this function */
  const refreshCredentials = () => {
    return Auth.currentSession()
      .then(session => {
        setAccessToken(session.getAccessToken());
      })
      .catch(() => {});
  }

  /*
   * The following two objects are used to define custom error logic
   * for the Apollo client. By defining the onError function in
   * 'logoutLink', we can decide what happens when one of our queries
   * results in a network error. Right now, the function just sends the
   * user back to the login screen (which will forward to home screen if
   * they are already signed in).*/
  const httpLink = new HttpLink({
    uri: CURRENT_GRAPHQL_API_URI,
    headers: {
      authorization: accessToken == null? null : accessToken.getJwtToken(),
    },
  });
  const logoutLink = onError(({ graphQLErrors, networkError }) => {
    if(graphQLErrors){
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.warn(message);
        if(message.includes('JWT')){
          hist.push({
            pathname:'/',
          })
        }
      })
    } 
  })

  /* Main ApolloClient object, any apollo configuration
   * for our frontend will likely live here. */
  const client = new ApolloClient({
    uri: CURRENT_GRAPHQL_API_URI,
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

  /*
   * This side effect is used to handle when a user signs in.
   * After the user signs in and returns from the Hosted UI, this
   * side effect will run and event will have value 'signIn'. At
   * this point, we can store the retrieved auth token in the 
   * ApolloClient object and forward the user to the home screen.
   * A console.log is left to log the auth token for convenient
   * development purposes, since it is needed to access the API*/
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          login(data.signInUserSession.getAccessToken());
          console.log(data);
          break;
        case 'signUp':
          login(data.signInUserSession.getAccessToken());
          break;
        case 'signOut':
          logout();
          break;
        case 'signIn_failure':
          console.error('Sign In Failure.');
          break;
        case 'cognitoHostedUI_failure':
          console.error('HostedUI Sign in failure', data);
          break;
        default:
          break;
      }
    });
    refreshCredentials();
  }, []);

  return (
    <div>      
      <div className="navbar">
        <p className="title">flipt.ED</p>
        {accessToken == null ?
          <li><a onClick={() => Auth.federatedSignIn()}>Sign In</a></li> :
          <div>
            <NavDrawer className="drawer"/>
            <li><a onClick={() => Auth.signOut()}>Sign Out</a></li>          
          </div>}

      </div>
      
      <ApolloProvider client={client}>
        <div>
        <Switch>
          <Route component = {LoginComponent} exact path = '/'/>
          <Route component = {GoalList} exact path = '/goalsscreen'/>
          <Route component = {GradeScreen} exact path = '/gradescreen'/>
          <Route component = {Mission} exact path = '/mission'/>
          <Route component = {Task} exact path = '/task'/>
          <Route component = {MTaskOverview} exact path = '/mtaskoverview'/>
          <Route component = {Courses} exact path = '/courses'/>
          <Route component = {MissionsScreen} exact path = '/missions'/>
        </Switch>
        </div>
      </ApolloProvider>     
    </div>
  );
}

export default App;