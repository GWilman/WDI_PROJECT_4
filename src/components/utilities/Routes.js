import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../statics/Home';
import Login from '../auth/Login';
import Register from '../auth/Register';
import LeaguesNew from '../leagues/LeaguesNew';
import LeaguesIndex from '../leagues/LeaguesIndex';
import LeaguesJoin from '../leagues/LeaguesJoin';
import LeaguesShow from '../leagues/LeaguesShow';
import LeaguesEdit from '../leagues/LeaguesEdit';
import UsersShow from '../users/UsersShow';

const Routes = ({ setUser }) => {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/login" render={props => <Login {...props} setUser={setUser} />} />
      <Route path="/register" render={props => <Register {...props} setUser={setUser} />} />
      <Route path="/leagues/new" component={ LeaguesNew } />
      <Route path="/leagues/join" component={ LeaguesJoin } />
      <Route path="/leagues/:id/edit" component={ LeaguesEdit } />
      <Route path="/leagues/:id" component={ LeaguesShow } />
      <Route path="/leagues" component={ LeaguesIndex } />
      <Route path="/users/:id" component={ UsersShow } />
    </Switch>
  );
};

export default Routes;
