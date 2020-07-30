import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Authenticate from './views/Authenticate';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/auth" component={Authenticate} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
