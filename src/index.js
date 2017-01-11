import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Landing from './Landing';
import { Router, Route, hashHistory } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/about" component={Landing}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
