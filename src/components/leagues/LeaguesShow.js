import React from 'react';
import Axios from 'axios';
// import { Link } from 'react-router-dom';
// import _ from 'lodash';

import Picker from './Picker.js';

class LeaguesShow extends React.Component {
  state = {
    league: {},
    teams: [],
    players: []
  }

  componentDidMount() {
    Axios
      .get(`/api/leagues/${this.props.match.params.id}`)
      .then(res => this.setState({ league: res.data }))
      .catch(err => console.error(err));

    // Axios
    //   .get('/api/teams')
    //   .then(res => {
    //     this.setState({ teams: res.data });
    //     console.log(this.state.teams);
    //   })
    //   .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h1>{this.state.league.name}</h1>
        <h3>Stake: £{this.state.league.stake}</h3>
        <Picker />
        {/* { this.state.leagues.map(league =>
          <div key={league.id} className="league-container">
            <h3>{league.name}</h3>
            <p>Stake: <strong>£{league.stake}</strong></p>
            { league.createdBy.username &&
            <p>Owner: <strong>{league.createdBy.username}</strong></p>
            }
            <Link to={`/leagues/${league.id}`}>
              <button className="btn btn-primary">League Hub</button>
            </Link>
          </div>
        )} */}
      </div>
    );
  }

}

export default LeaguesShow;
