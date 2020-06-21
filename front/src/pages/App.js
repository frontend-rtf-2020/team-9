import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Home from './Home';
import Auth from './Auth';
import Reg from './Reg';

class App extends Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
    this.state = {activeUser: ''};
  }

  getUser(user) {
    this.setState({activeUser: user});
  }

  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/'  component={Main}/>
          <Route path='/home' render={()=><Home activeUser={this.state.activeUser}/>}/>
          <Route path='/auth' render={()=><Auth getUser={this.getUser}/>}/>
          <Route path='/reg' component={Reg}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
