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
    entryCode: ''
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
    this.setState({ entryCode: value });
  }

  joinLeague = ({ target: { id }}) => {

    const leagues = this.state.user.leagues.concat(id);
    const user = Object.assign({}, this.state.user, { leagues });

    Axios
      .put(`/api/users/${this.state.user.id}`, user)
      .then(() => {
        this.props.history.push(`/leagues/${id}`);
      })
      .catch(err => console.error(err));
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
            <input type="text" value={this.state.entryCode} placeholder="Enter code" onChange={this.handleChange} />
            <button onClick={this.joinLeague} id={league.id} className="btn btn-success">Join</button>
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
