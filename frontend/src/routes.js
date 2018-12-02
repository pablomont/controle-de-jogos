import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import GamePage1 from './containers/GamePage';
import TablePage from './containers/TablePage';
import Dashboard from './containers/DashboardPage';
import RegisterPage from './containers/RegisterPage';

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="jogo" component={GamePage1}/>
      <Route path="jogos" component={TablePage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
