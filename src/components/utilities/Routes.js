import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../statics/Home';
import Login from '../auth/Login';
import Register from '../auth/Register';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
    </Switch>
  );
};

export default Routes;
