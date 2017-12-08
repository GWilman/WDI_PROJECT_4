import React from 'react';
import Axios from 'axios';
// import { Link } from 'react-router-dom';
// import _ from 'lodash';

import Auth from '../../lib/Auth';

import Picker from './Picker.js';
import PicksGrid from './PicksGrid.js';

class LeaguesShow extends React.Component {
  state = {
    league: null,
    hasMadePick: false
  }


  componentDidMount() {
    Axios
      .get(`/api/leagues/${this.props.match.params.id}`)
      .then(res => {
        const { userId } = Auth.getPayload();
        const hasMadePick = !!res.data.picks.find(pick => pick.createdBy === userId);
        this.setState({ hasMadePick, league: res.data });
      })
      .catch(err => console.error(err));
  }

  render() {
    if(!this.state.league) return null;
    return (
      <div>
        <h1>{this.state.league.name}</h1>
        <h3>Stake: £{this.state.league.stake} | Owner: {this.state.league.createdBy.username}</h3>
        { !this.state.hasMadePick ? (
          <Picker />
        ) : (
          <PicksGrid />
        )}
      </div>
    );
  }

}

export default LeaguesShow;
