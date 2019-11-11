import React, { Component } from 'react';
//import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"; // removed Switch
import Header from "../src/components/Header";
import LoginForm from "../src/components/LoginForm";
import LandingPage from "../src/components/LandingPage";
import InputForm from "../src/components/InputForm";
import BodyBackgroundColor from 'react-body-backgroundcolor';

class App extends Component {

  // constructor() {
  //   super()
  //   this.state = {
  //     loggedIn: false,
  //     username: null
  //   }
  //   this.updateUser = this.updateUser.bind(this)
  // }
  // updateUser(User) {
  //   this.setState(User)
  // }

  // api = `http://testbed.pablovirgo.com/api/v0.1.0/`

  getUser = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;

    console.log(username);
    // axios.post(`http://testbed.pablovirgo.com/api/v0.1.0/auth/token/`, {
    //   "username": "izeimai", 
    //   "Password" : "testingwiithizeimai"})
    // .then(res => {
    //   console.log(res.data);
    //   // this.setState({
    //   //   token: res.data,
    //   // })
    // })
    // .catch(err => {
    //   if (err.response.status === 401) {
    //     dispatch(loginFailure(err));
    //   }
    // });
  }


  


  // state = {
  //   attorneys:[] 
  // }

  // // Get request to API endpoint, then parse output to JSON, 
  // // then set the value of the state, and catches errors to console
  // componentDidMount() {
  //   fetch('http://testbed.pablovirgo.com/api/v0.1.0/expunger/attorneys')
  //   .then(res => res.json())
  //   .then((data => {
  //     this.setState({ attorneys : data })
  //   }))
  //   .catch(console.log)
  // }

 
  

  render() {
    return (
      <Router>
        
        <Header />

        <BodyBackgroundColor backgroundColor='#fadadd'>
          <Route path="/login" render={LoginForm} />
        </BodyBackgroundColor>

        <BodyBackgroundColor backgroundColor='gray'>
          <Route path="/landing" component={LandingPage} />
        </BodyBackgroundColor>

        <BodyBackgroundColor backgroundColor='#fadadd'>
          <Route path="/inputform" component={InputForm} />
        </BodyBackgroundColor>
      </Router>
    );
  }
}
export default App;

