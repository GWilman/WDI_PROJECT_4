import React from 'react';
import Axios from 'axios';
// import { Link } from 'react-router-dom';
// import _ from 'lodash';

import Auth from '../../lib/Auth';

class LeaguesIndex extends React.Component {
  state = {
    leagues: [],
    user: {}
  }

  componentDidMount() {
    Axios
      .get('/api/leagues')
      .then(res => this.setState({ leagues: res.data }))
      .catch(err => console.error(err));

    const userId = Auth.getPayload();
    console.log('user id:', userId);
    Axios
      .get(`/api/users/${userId.userId}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.error(err));
  }

  joinLeague = (e) => {
    console.log('leagueId:', e.target.id);
    const userId = Auth.getPayload();
    this.state.user.leagues.push(e.target.id);
    Axios
      .put(`/api/users/${userId.userId}`, this.state.user)
      .then(res => console.log('res', res))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h1>Join a League</h1>
        { this.state.leagues.map(league =>
          <div key={league.id} className="league-container">
            <h3>{league.name}</h3>
            <p>Stake: <strong>£{league.stake}</strong></p>
            { league.createdBy &&
            <p>Owner: <strong>{league.createdBy.username}</strong></p>
            }
            <button onClick={this.joinLeague} id={league.id} className="btn btn-success">Join</button>
          </div>
        )}
      </div>
    );
  }

}

export default LeaguesIndex;
