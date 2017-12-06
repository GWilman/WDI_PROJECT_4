import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../statics/Home';
import Login from '../auth/Login';
import Register from '../auth/Register';
import LeaguesNew from '../leagues/LeaguesNew';
import LeaguesIndex from '../leagues/LeaguesIndex';
import LeaguesJoin from '../leagues/LeaguesJoin';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/leagues/new" component={ LeaguesNew } />
      <Route path="/leagues/join" component={ LeaguesJoin } />
      <Route path="/leagues" component={ LeaguesIndex } />
    </Switch>
  );
};

export default Routes;
