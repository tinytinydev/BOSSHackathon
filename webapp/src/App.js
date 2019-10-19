import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import BaseView from "./screen/home/BaseView";


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={BaseView}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
