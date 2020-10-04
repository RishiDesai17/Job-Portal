import React, { useEffect } from 'react';
import Router from './Router';
import { Provider } from 'react-redux';
import store from './store';
import { init } from './actions/auth';
import Toast from './components/Toast';
import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(init());
  }, [])

  return (
    <div className="App">
      <Provider store={store}>
        <Router />
        <Toast />
      </Provider>
    </div>
  );
}

export default App;
