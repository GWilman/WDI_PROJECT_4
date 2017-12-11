import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Promise from 'bluebird';
// import _ from 'lodash';

import Auth from '../../lib/Auth';

class LeaguesIndex extends React.Component {
  state = {
    leagues: null,
    user: {},
    entryCode: '',
    error: false
  }

  componentDidMount() {

    const { userId } = Auth.getPayload();
    const promises = {
      leagues: Axios.get('/api/leagues').then(res => res.data),
      user: Axios.get(`/api/users/${userId}`).then(res => res.data)
    };

    Promise.props(promises)
      .then(data => this.setState(data))
      .catch(err => console.error(err));
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ entryCode: parseInt(value) });
  }

  joinLeague = (league) => {

    const code = this.state.leagues.find(_league => _league.id === league.id).code;

    if (this.state.entryCode !== code) {
      league = Object.assign({}, league, { error: true });
      const index = this.state.leagues.findIndex(_league => _league.id === league.id);
      const leagues = [
        ...this.state.leagues.slice(0, index),
        league,
        ...this.state.leagues.slice(index+1)
      ];
      this.setState({ leagues });
    } else {
      const leagues = this.state.user.leagues.concat(league.id);
      const user = Object.assign({}, this.state.user, { leagues });

      Axios
        .put(`/api/users/${this.state.user.id}`, user)
        .then(() => {
          this.props.history.push(`/leagues/${league.id}`);
        })
        .catch(err => console.error(err));

    }
  }

  render() {
    if(!this.state.leagues) return null;
    const filteredLeagues = this.state.leagues.filter(league => !(league.users.find(user => user.id === this.state.user.id)));
    return (
      <div>
        <h1>Join a League</h1>
        { filteredLeagues.map(league =>
          <div key={league.id} className="league-container">
            <h3>{league.name}</h3>
            <p>Stake: <strong>£{league.stake}</strong></p>
            { league.createdBy &&
            <p>Owner: <strong>{league.createdBy.username}</strong></p>
            }
            <input type="text" value={league.entryCode} placeholder="Enter code" onChange={this.handleChange} />
            <button onClick={() => this.joinLeague(league)} className="btn btn-success">Join</button><br />
            { league.error && <small>Invalid code</small>}
          </div>
        )}
        { filteredLeagues.length === 0 &&
          <h2>There are currently no leagues for you to join. Why not <Link to="/leagues/new">create a new league</Link>?</h2>
        }
      </div>
    );
  }

}

export default LeaguesIndex;
