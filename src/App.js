import "./styles.css";
import Login from "./Login";
import Signup from "./Signup";
import React, { useState } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BatteryData from "./Components/BatteryData";


export default function App() {
  const [authType, setAuthType] = useState("login");
  return (
    <div className="App">
      <Router>
      <Switch>
      <Route path = "/" exact component = {Login}></Route>
      <Route path = "/signUp" exact component = {Signup}></Route>
      <Route path = "/getdata" exact component = {BatteryData}></Route>
      {/* {authType === "login" && <Login setAuthType={setAuthType} />}
      {authType === "signup" && <Signup setAuthType={setAuthType} />} */}
      </Switch>
      </Router>
    </div>
  );
}
