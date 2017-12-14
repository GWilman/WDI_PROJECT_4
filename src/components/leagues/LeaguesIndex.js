import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Auth from '../../lib/Auth';

class LeaguesIndex extends React.Component {
  state = {
    leagues: null
  }

  componentDidMount() {
    const userId = Auth.getPayload();
    Axios
      .get(`/api/users/${userId.userId}`)
      .then(res => {
        console.log(res.data);
        this.setState({ leagues: res.data.leagues });
      })
      .catch(err => console.error(err));
  }

  homeStyle = {
    backgroundImage: 'url(https://i.imgur.com/KUsFPXg.jpg)',
    height: '100%',
    width: '100%',
    backgroundPosition: 'cover',
    backgroundRepeat: 'noRepeat',
    paddingTop: '20px',
    padding: '20px 10px'
  }

  leagueContainer = {
    background: '#fff',
    border: '1px solid gray',
    boxShadow: '0 0 4px black',
    padding: '20px',
    marginBottom: '10px',
    borderRadius: '10px'
  }

  container = {

  }

  h3Style = {
    margin: '0'
  }

  h1Style = {
    color: '#fff',
    textShadow: '0 0 6px black',
    fontSize: '40px'
  }

  render() {
    if (!this.state.leagues) return false;
    const now = moment();
    // console.log(this.state.leagues);
    return (
      <div style={this.homeStyle}>
        <div className="container mainPageComponent" style={this.container}>
          <h1 style={this.h1Style}>My Leagues</h1>
          { this.state.leagues.length > 0 ?
            <div>
              { this.state.leagues.map(league =>
                <div key={league.id} style={this.leagueContainer}>
                  <h3 style={this.h3Style}>{league.name}</h3>
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
                    <button className="btn btn-blue">League Hub</button>
                  </Link>
                </div>
              )}
            </div>
            :
            <div>
              <h2>You are not currently competing in any leagues. Why not <Link to="/leagues/join">join a league</Link> or <Link to="/leagues/new">create a new league</Link>?</h2>
            </div>
          }
        </div>
      </div>
    );
  }

}

export default LeaguesIndex;
