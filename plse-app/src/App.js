import React, { useState } from 'react';
//import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; // removed Switch
import PrivateRoute from './PrivateRoute';
import { AuthContext } from "./context/auth";
import Header from "../src/components/Header";
import AdminPage from "../src/components/AdminPage";
import LoginForm from "../src/components/LoginForm";
import LandingPage from "../src/components/LandingPage";
import InputForm from "../src/components/InputForm";
import BodyBackgroundColor from 'react-body-backgroundcolor';

function App(props) {

  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

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




// render() {
return (
  <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <Router>

      <Header />

      <div>
        <ul>
          <li>
            <Link to="/login">Home Page</Link>
          </li>
          <li>
            <Link to="/admin">Admin Page</Link>
          </li>
        </ul>
      </div>

      <PrivateRoute path="/admin" component={AdminPage} />

      <BodyBackgroundColor backgroundColor='#fadadd'>
        <Route path="/login" render={(props) => <LoginForm {...props} isAuthed={true} />} />
      </BodyBackgroundColor>

      <BodyBackgroundColor backgroundColor='gray'>
        <Route path="/landing" component={LandingPage} />
      </BodyBackgroundColor>

      <BodyBackgroundColor backgroundColor='#fadadd'>
        <Route path="/inputform" component={InputForm} />
      </BodyBackgroundColor>
    </Router>
  </AuthContext.Provider>
);

}

export default App;

