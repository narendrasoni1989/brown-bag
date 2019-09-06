import React from 'react';
import { NavLink } from 'react-router-dom'
import './app-header.scss';
import { Auth } from 'aws-amplify'

class AppHeader extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }

    this.signOut = this.signOut.bind(this);
    this.updateLoginStatus = this.updateLoginStatus.bind(this);
  }
  

  updateLoginStatus(loginStatus) {
    this.setState({ isAuthenticated: loginStatus });
  }

  componentDidMount() {
    // check the current user when the App component is loaded
    Auth.currentAuthenticatedUser().then(user => {
      this.setState({ isAuthenticated: !!user })
    }).catch(e => {
      console.log(e);
      this.setState({ isAuthenticated: false })
    });
  }


  signOut() {
    Auth.signOut().then(() => {
      this.setState({ isAuthenticated: false })
      this.props.updateLoginStatus();
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">Openplatform</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" exact to="/">Home<span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/link1">Link1</NavLink>
            </li>
          </ul>
  
          { this.props.loginStatus===true && <NavLink className="nav-link" exact to="#" onClick={this.signOut}>Logout</NavLink> }
          { this.props.loginStatus===false && <NavLink className="nav-link" exact to="/auth">Login</NavLink> }

        </div>
      </nav>
    )
  }
}

export default AppHeader;