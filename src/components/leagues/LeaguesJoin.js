import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Promise from 'bluebird';
import moment from 'moment';

import Auth from '../../lib/Auth';

class LeaguesIndex extends React.Component {
  state = {
    leagues: null,
    user: {},
    entryCode: '',
    error: false
  }

  leagueContainer = {
    background: '#fff',
    border: '1px solid gray',
    boxShadow: '0 0 4px black',
    padding: '20px',
    marginBottom: '10px',
    borderRadius: '10px',
    textAlign: 'center'
  }

  homeStyle = {
    backgroundImage: 'url(https://i.imgur.com/j3OqQRl.jpg)',
    minHeight: 'calc(100vh - 52px)',
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat'
  }

  h1Style = {
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: '40px',
    color: '#fff'
  };

  h3Style = {
    marginTop: '4px'
  }

  inputStyle = {
    height: '34px',
    marginBottom: '-2px',
    paddingLeft: '4px',
    borderRadius: '4px 0 0 4px',
    border: '1px solid gray'
  }

  btnStyle = {
    margin: '0',
    borderRadius: '0 4px 4px 0',
    border: '1px solid gray',
    marginBottom: '2px'
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

  joinLeague = (league, e) => {
    e.preventDefault();
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
    const now = moment();
    const activeLeagues = this.state.leagues.filter(league => (moment(league.startTime).diff(now, 'seconds') > 0));
    const filteredLeagues = activeLeagues.filter(league => !(league.users.find(user => user.id === this.state.user.id)));
    return (
      <div style={this.homeStyle}>
        <div className="container mainPageComponent">
          <h1 style={this.h1Style}>Join a League</h1>
          { filteredLeagues.map(league =>
            <div key={league.id} style={this.leagueContainer}>
              <h3 style={this.h3Style}>{league.name}</h3>
              <p>Stake: <strong>£{league.stake}</strong></p>
              { league.createdBy &&
                <p>Owner: <strong>{league.createdBy.username}</strong></p>
              }
              <Form onSubmit={(e) => this.joinLeague(league, e)}>
                <input type="text" value={league.entryCode} placeholder="Enter code" onChange={this.handleChange} style={this.inputStyle} />
                <button className="btn btn-green" style={this.btnStyle}>Join</button><br />
              </Form>
              { league.error && <small className="red">Invalid code</small>}
            </div>
          )}
          { filteredLeagues.length === 0 &&
            <div style={this.leagueContainer}><h4>There are currently no leagues for you to join. Why not <Link to="/leagues/new">create a new league</Link>?</h4>
            </div>
          }
        </div>
      </div>
    );
  }

}

export default LeaguesIndex;
