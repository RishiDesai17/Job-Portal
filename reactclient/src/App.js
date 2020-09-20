import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './protectedRoute/protectedRoute';
import Home from './views/Home';
import Jobs from './views/JobsList';
import Login from './views/Login';
import Authenticate from './views/Authenticate';
import Dashboard from './views/Dashboard';
import { Provider } from 'react-redux';
import store from './store';
import { init } from './actions/auth';
import './App.css';
import NewJob1 from './views/NewJob1';

const App = () => {
  useEffect(() => {
    store.dispatch(init());
  }, [])

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/jobs" component={Jobs} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/auth" component={Authenticate} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/newjob" component={NewJob1} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
