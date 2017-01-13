import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './App';
import Global404 from './Global404';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} page="posts" category="All"/>
    <Route path="/about" component={App} page="about"/>
    <Route path="/contact" component={App} page="contact"/>
    <Route path="/posts" component={App} page="posts" category="All"/>
    <Route path="/posts/:category" component={App} page="posts"/>
    <Route path="/posts/:category/:postTitle" component={App} page="posts"/>
    <Route path='*' component={Global404} />
  </Router>,
  document.getElementById('root')
);
