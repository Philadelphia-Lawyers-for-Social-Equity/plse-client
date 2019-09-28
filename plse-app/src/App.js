import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"; // removed Switch
import LoginForm from "../src/components/LoginForm";
import LandingPage from "../src/components/LandingPage";
import InputForm from "../src/components/InputForm";
import BodyBackgroundColor from 'react-body-backgroundcolor';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }
    this.updateUser = this.updateUser.bind(this)
  }
  updateUser(User) {
    this.setState(User)
  }
  render() {
    return (
      <Router>
        <BodyBackgroundColor backgroundColor='#fadadd'>
          <Route path="/" component={LoginForm} />
        </BodyBackgroundColor>

        <BodyBackgroundColor backgroundColor='gray'>
          <Route path="/landing" component={LandingPage} />
        </BodyBackgroundColor>

        <BodyBackgroundColor backgroundColor='gray'>
          <Route path="/InputForm" component={InputForm} />
        </BodyBackgroundColor>
      </Router>
    );
  }
}
export default App;

