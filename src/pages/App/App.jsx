import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import MainPage from '../mainpage';
import userService from '../../utils/userService';
import NavBar from '../../components/NavBar/NavBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser()
    };
  }

  /*--- Callback Methods ---*/
  handleLogout = () => {
    userService.logout();
    this.setState({user: null})
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()})
  }
  /*--- Lifecycle Methods ---*/

  render() {
    return (
      <div>
        <NavBar
        user={this.state.user}
        handleLogout={this.handleLogout}
        />
        <Switch>
          <Route exact path='/' render={() =>
           <div>Hello World! This is the auth page.<br /><br />
           <a href='/main'>Main Page</a>
           </div>
          }/>
          <Route exact path='/signup' render={({ history }) =>
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}

            />
          }/>
          <Route exact path='/login' render={({history}) =>
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/main' render={() =>
           <div>
           <MainPage /><br />
           <a href='/'>Back to Auth Page</a>
           </div>
          }/>
        </Switch>
      </div>
    );
  }
}

export default App;
