import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../statics/Home';
import Login from '../auth/Login';
import Register from '../auth/Register';
import LeaguesNew from '../leagues/LeaguesNew';
import LeaguesIndex from '../leagues/LeaguesIndex';
import LeaguesJoin from '../leagues/LeaguesJoin';
import LeaguesShow from '../leagues/LeaguesShow';
import UsersShow from '../users/UsersShow';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/leagues/new" component={ LeaguesNew } />
      <Route path="/leagues/join" component={ LeaguesJoin } />
      <Route path="/leagues/:id" component={ LeaguesShow } />
      <Route path="/leagues" component={ LeaguesIndex } />
      <Route path="/users/:id" component={ UsersShow } />
    </Switch>
  );
};

export default Routes;
