import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Authenticate from './views/Authenticate';
import { Provider } from 'react-redux';
import store from './store';
import { init } from './actions/auth'
import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(init());
  },[])

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            {console.log(store.getState())}
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/auth" component={Authenticate} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
