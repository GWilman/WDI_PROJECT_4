import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Auth from '../../lib/Auth';

class LeaguesIndex extends React.Component {
  state = {
    leagues: []
  }

  componentDidMount() {
    const userId = Auth.getPayload();
    Axios
      .get(`/api/users/${userId.userId}`)
      .then(res => {
        this.setState({ leagues: res.data.leagues });
      })
      .catch(err => console.error(err));
  }

  render() {
    const now = moment();
    return (
      <div>
        <h1>My Leagues</h1>
        { this.state.leagues.map(league =>
          <div key={league.id} className="league-container">
            <h3>{league.name}</h3>
            <p>Stake: <strong>£{league.stake}</strong></p>
            { league.createdBy.username &&
            <p>Owner: <strong>{league.createdBy.username}</strong></p>
            }
            { (moment(league.startTime).diff(now, 'seconds') > 0) ?
              <p>Drafting in {moment().to(league.startTime)}</p>
              :
              <p>Draft Complete</p>
            }
            <Link to={`/leagues/${league.id}`}>
              <button className="btn btn-primary">League Hub</button>
            </Link>
          </div>
        )}
      </div>
    );
  }

}

export default LeaguesIndex;
