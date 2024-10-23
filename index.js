// index.js
import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './hooks/store';

const ReduxWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(ReduxWrapper);
