'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


import store from './store'
import Root from './components/Root'

render(
  <Provider store={store}>
  <BrowserRouter>
    <Root />
  </BrowserRouter>
  </Provider>,
  document.getElementById('main')
);
