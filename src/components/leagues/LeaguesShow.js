import React from 'react';
import Axios from 'axios';
// import { Link } from 'react-router-dom';
// import _ from 'lodash';

import Auth from '../../lib/Auth';

import Picker from './Picker.js';
import PicksGrid from './PicksGrid.js';

class LeaguesShow extends React.Component {
  state = {
    league: {},
    hasMadePick: false
  }


  componentDidMount() {
    console.log('componentDidMount');
    Axios
      .get(`/api/leagues/${this.props.match.params.id}`)
      .then(res => {
        console.log('setting state first time');
        this.setState({ league: res.data });
      })
      .then(() => {
        console.log('checking if user made picks or not');
        const userId = Auth.getPayload();
        for (let i = 0; i < this.state.league.picks.length; i++) {
          if (this.state.league.picks[i].createdBy === userId.userId) {
            this.setState({ hasMadePick: true });
          }
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    console.log('rendering');
    return (
      <div>
        <h1>{this.state.league.name}</h1>
        <h3>Stake: £{this.state.league.stake}</h3>
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
