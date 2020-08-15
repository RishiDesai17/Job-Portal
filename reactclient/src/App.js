import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useWillMount } from './custom hooks/useWillMount';
import ProtectedRoute from './protectedRoute/protectedRoute';
import Home from './views/Home';
import Jobs from './views/Jobs';
import Login from './views/Login';
import Authenticate from './views/Authenticate';
import Profile from './views/Profile';
import { Provider } from 'react-redux';
import store from './store';
import { init } from './actions/auth';
import './App.css';

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
            <ProtectedRoute exact path="/profile" component={Profile} />
            <ProtectedRoute exact path="/protected" component={Home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
