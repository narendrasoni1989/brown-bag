import React from 'react';
import './app.css';
import Header from './header';
import { Route,Switch,Redirect,BrowserRouter as Router, } from 'react-router-dom';
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { Auth } from 'aws-amplify'
import AuthComponent from './auth/auth';

import Home from '../../routes/home';
import Link1 from '../../routes/link1';


Amplify.configure(awsconfig);


const ProppedRoute = ({ render: C, props: childProps, ...rest }) => (
  <Route {...rest} render={rProps => <C {...rProps} {...childProps} />} />
);


const Routes = ({ childProps }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/link1" component={Link1} />
   <ProppedRoute
      exact
      path="/auth"
      render={AuthComponent}
      props={childProps}
   /> 
  </Switch>
);


class App extends React.Component {
  state = {
    authState: {
      isLoggedIn: false
    }
  };

  handleUserSignIn = () => {
    this.setState({ authState: { isLoggedIn: true } });
  };

  updateLoginStatus = () => {
    Auth.currentAuthenticatedUser().then(user => {
      this.setState({ authState: { isLoggedIn: !!user } });
    }).catch(e => {
      console.log(e);
      this.setState({ authState: { isLoggedIn: false } });
    });
  }

  logMeOut = () => {
    this.setState({ authState: { isLoggedIn: false } });
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(user => {
      this.setState({ authState: { isLoggedIn: !!user } });
    }).catch(e => {
      console.log(e);
      this.setState({ authState: { isLoggedIn: false } });
    });
  }

  render() {
    const childProps = {
      isLoggedIn: this.state.authState.isLoggedIn,
      onUserSignIn: this.handleUserSignIn
    };
    return (
      <div className="app">
        <Header loginStatus = { this.state.authState.isLoggedIn} updateLoginStatus = {this.updateLoginStatus}  />
        {/*
          Mention all project routes here. 
        */}
        <Routes childProps={childProps} />
      </div>
    )
  }
}


const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;