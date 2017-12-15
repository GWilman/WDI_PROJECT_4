import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';

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
        this.setState({ leagues: res.data.leagues });
      })
      .catch(err => console.error(err));
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

  h3Style = {
    margin: '8px 0 20px 0'
  }

  infoStyle = {
    margin: '8px'
  }

  homeStyle = {
    backgroundImage: 'url(https://i.imgur.com/j3OqQRl.jpg)',
    minHeight: 'calc(100vh - 53px)',
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat'
  };

  h1Style = {
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: '40px',
    color: '#fff'
  };

  render() {
    if (!this.state.leagues) return false;
    const now = moment();
    return (
      <div style={this.homeStyle}>
        <div className="container mainPageComponent">
          <h1 style={this.h1Style}>My Leagues</h1>
          { this.state.leagues.length > 0 ?
            <div>
              { this.state.leagues.map(league =>
                <div key={league.id} style={this.leagueContainer}>
                  <Row><Col xs={6}>
                    <h3 style={this.h3Style}>{league.name}</h3>
                    <Link to={`/leagues/${league.id}`}>
                      <button className="btn btn-blue">League Hub</button>
                    </Link>
                  </Col>
                  <Col xs={6}>
                    <div style={this.infoStyle}>
                      <p>Stake: <strong>£{league.stake}</strong></p>
                      <p>Owner: <strong>{league.createdBy.username}</strong></p>
                      { (moment(league.startTime).diff(now, 'seconds') > 0) ?
                        <p>Drafting {moment().to(league.startTime)}</p>
                        :
                        <p>Draft Complete</p>
                      }
                    </div>
                  </Col></Row>
                </div>
              )}
            </div>
            :
            <div style={this.leagueContainer}><h4>You are not currently competing in any leagues. Why not <Link to="/leagues/join">join a league</Link> or <Link to="/leagues/new">create a new league</Link>?</h4>
            </div>
          }
        </div>
      </div>
    );
  }

}

export default LeaguesIndex;
