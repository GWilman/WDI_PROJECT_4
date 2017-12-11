import React from 'react';
import Axios from 'axios';
// import { Link } from 'react-router-dom';
// import _ from 'lodash';

import Auth from '../../lib/Auth';

import Picker from './Picker.js';
import LiveDraft from './LiveDraft.js';
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
        <h3>Stake: £{this.state.league.stake} | Owner: {this.state.league.createdBy.username} | Entry Code: {this.state.league.code}</h3>
        <h4>How to score:</h4>
        <p>1st: 25 points | 2nd: 18 points | 3rd: 15 points | 4th: 10 points | 5th: 5 points | 6th: 0 points</p>
        <p>In the event of a tie, the sum of the position scores is divided by the number of players in a tie.</p>
        <p>Tie examples:<br />
        In a two-way tie for second place, each player will score 16.5 points (18 + 15 / 2).<br />
        In a three-way tie for third, each player will score 10 points (15 + 10 + 5 / 3).</p>
        { !this.state.hasMadePick ? (
          // <Picker />
          <LiveDraft />
        ) : (
          <PicksGrid />
        )}
      </div>
    );
  }

}

export default LeaguesShow;
