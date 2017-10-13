import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './stores';
import routes from './routes';

const app = (
  <Provider store={store.configure(null)}>
    <BrowserRouter>{routes}</BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
