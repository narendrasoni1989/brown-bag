import React from 'react';
import HelloWorld from '../../components/HelloWorld';



class Home extends React.Component {
  render() {
    return(
      <div>
        <h1>Hello there ! You're on the home page</h1>
        <HelloWorld />
      </div>
    );
  }
}


export default Home;
