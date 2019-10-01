import React from 'react';
import { Authenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';


const signUpConfig = {
  header: 'Brown Bag Sign Up',
  hideAllDefaults: true,
  includeGreetings: false,
  signUpFields: [
    {
      label: 'Name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 3,
      type: 'password'
    }
  ]
};

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
            signUpConfig={signUpConfig} 
            usernameAttributes={'email'} 
            includeGreetings={false}  
            onStateChange={this.handleStateChange} 
            hideDefault={false}
            />
        </div>
      );
    }
  }

export default AuthComponent;