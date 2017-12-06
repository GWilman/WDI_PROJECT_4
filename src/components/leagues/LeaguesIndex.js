import React from 'react';
import Axios from 'axios';
// import { Link } from 'react-router-dom';
// import _ from 'lodash';

class LeaguesIndex extends React.Component {
  state = {
    leagues: []
  }

  componentDidMount() {
    Axios
      .get('/api/leagues')
      .then(res => this.setState({ leagues: res.data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h1>My Leagues</h1>
        { this.state.leagues.map(league =>
          <div key={league.id} className="league-container">
            <h3>{league.name}</h3>
            <p>Stake: <strong>£{league.stake}</strong></p>
            { league.createdBy &&
            <p>Owner: <strong>{league.createdBy.username}</strong></p>
            }
          </div>
        )}
      </div>
    );
  }

}

export default LeaguesIndex;
