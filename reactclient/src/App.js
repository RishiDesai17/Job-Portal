import React, { useEffect } from 'react';
import Router from './Router';
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
        <Router />
      </Provider>
    </div>
  );
}

export default App;
