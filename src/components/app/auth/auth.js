import React from 'react';
import { Authenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';




class AuthComponent extends React.Component {
    handleStateChange = state => {
      if (state === 'signedIn') {
        this.props.onUserSignIn();
        this.props.history.push('/');
      }
    };
    render() {
      const { isLoggedIn } = this.props.isLoggedIn;
      return (
        <div>
            <Authenticator  
            onStateChange={this.handleStateChange} 
            />
        </div>
      );
    }
  }

export default AuthComponent;