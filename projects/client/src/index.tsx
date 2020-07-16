import React from 'react';
import { Helmet } from 'react-helmet' 
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <Helmet><title>Word Scenes</title></Helmet>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
