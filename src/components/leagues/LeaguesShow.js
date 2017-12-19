import React from 'react';
import Axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Auth from '../../lib/Auth';

import LiveDraft from './LiveDraft.js';
import PicksGrid from './PicksGrid.js';

import socketIOClient from 'socket.io-client';

class LeaguesShow extends React.Component {
  state = {
    league: null,
    isOwned: false,
    hasMadePick: false,
    nowDrafting: false,
    draftTimePretty: null,
    time: '',
    draftMissed: false
  }

  websocket = socketIOClient('/socket');

  timeInterval = null;

  homeStyle = {
    backgroundImage: 'url(https://i.imgur.com/j3OqQRl.jpg)',
    minHeight: 'calc(100vh - 53px)',
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat'
  };

  center = {
    textAlign: 'center'
  }

  h1Style = {
    textTransform: 'uppercase',
    fontWeight: '800',
    color: '#fff'
  }

  h3Style = {
    color: '#fff'
  }

  infoContainer = {
    background: '#fff',
    border: '1px solid gray',
    boxShadow: '0 0 4px black',
    padding: '20px',
    marginBottom: '10px',
    marginTop: '20px',
    borderRadius: '10px'
  }

  editStyle = {
    marginRight: '10px'
  }

  messageContainer = {
    background: '#fff',
    border: '1px solid gray',
    boxShadow: '0 0 4px black',
    padding: '20px',
    marginBottom: '10px',
    marginTop: '20px',
    borderRadius: '10px',
    textAlign: 'center'
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
    this.websocket.disconnect(true);
  }

  componentDidMount() {
    this.websocket.on('connect', () => {
      console.log(`${this.websocket.id} connected`);
      const { userId } = Auth.getPayload();
      this.websocket.emit('set user', { userId, leagueId: this.props.match.params.id });
    });

    Axios
      .get(`/api/leagues/${this.props.match.params.id}`)
      .then(res => {
        const { userId } = Auth.getPayload();
        const hasMadePick = !!res.data.picks.find(pick => pick.createdBy === userId);
        let isOwned = false;
        if (userId === res.data.createdBy.id) isOwned = true;
        this.setState({ hasMadePick, league: res.data, isOwned: isOwned });
      })
      .then(() => {
        this.timeInterval = setInterval(() => {
          if (this.state.time === '00:00:00') {
            this.setState({ nowDrafting: true  });
            return clearInterval(this.timeInterval);
          }

          if (this.state.hasMadePick) this.setState({ nowDrafting: false });

          const now = moment();
          const draftTime = moment(this.state.league.startTime);
          const diff = (draftTime.diff(now));

          if (diff < 0 && !this.state.hasMadePick) this.setState({ missedDraft: true });

          if (diff > 0) {
            const time = moment(diff).format('HH:mm:ss');
            this.setState({ time: time });
          } else {
            clearInterval(this.timeInterval);
          }

        }, 1000);
      })
      .catch(err => console.error(err));
  }

  completeDraft = () => {
    console.log(this.state.picks);
    this.setState({ hasMadePick: true });
  }

  deleteLeague() {
    Axios
      .delete(`/api/leagues/${this.props.match.params.id}`, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/leagues'))
      .catch(err => console.error(err));
  }

  render() {
    if(!this.state.league) return false;
    const draftTimePretty = moment(this.state.league.startTime).format('ddd DD MMM, LT');
    return (
      <div style={this.homeStyle}>
        <div className="container mainPageComponent">
          <Row>
            <Col xs={12} sm={6}>
              <h1 style={this.h1Style}>{this.state.league.name}</h1>
              { (!this.state.nowDrafting || this.state.hasMadePick) && this.state.isOwned &&
                <div>
                  <Link to={`/leagues/${this.props.match.params.id}/edit`}>
                    <button className="btn btn-blue" style={this.editStyle}>Edit League</button>
                  </Link>
                  <button className="btn btn-blue" onClick={this.deleteLeague.bind(this)}>Delete League</button>
                </div>
              }
              { !this.state.nowDrafting &&
                <div>
                  <h3 style={this.h3Style}><strong>Stake:</strong> £{this.state.league.stake}</h3>
                  <h3 style={this.h3Style}><strong>Owner:</strong> {this.state.league.createdBy.username}</h3>
                  <h3 style={this.h3Style}><strong>Entry Code:</strong> {this.state.league.code}</h3>
                  <h3 style={this.h3Style}><strong>Draft:</strong> {draftTimePretty}</h3>
                </div>
              }
            </Col>
            <Col xs={12} sm={6}>
              { this.state.hasMadePick &&
                <div style={this.infoContainer}>
                  <h4>How to score:</h4>
                  <p>1st: 25 points | 2nd: 18 points | 3rd: 15 points | 4th: 10 points | 5th: 5 points | 6th: 0 points</p>
                  <p>In the event of a tie, the sum of the position scores is divided by the number of players in a tie.</p>
                  <p>
                    Tie examples:<br />
                    In a two-way tie for second place, each player will score 16.5 points<br />
                    (18 + 15 / 2)<br />
                    In a three-way tie for third, each player will score 10 points<br />
                    (15 + 10 + 5 / 3).
                  </p>
                </div>
              }
            </Col>
          </Row>
          { !this.state.hasMadePick ? (
            this.state.nowDrafting ?
              <LiveDraft websocket={this.websocket} completeDraft={this.completeDraft}/>
              :
              <div style={this.center}>
                { this.state.time !== ''
                  ?
                  <div style={this.messageContainer}><h1>Your league is drafting in {this.state.time}.</h1> <h3>Make sure you are on this page when the clock hits 00.00.00 or you will not be able to draft.</h3></div>
                  :
                  <div>
                    { this.state.missedDraft &&
                      <div style={this.messageContainer}>
                        <h1>You have missed your draft.</h1>
                        <h3><Link to={'/leagues/join'}>Join a new league</Link> or <Link to={'/leagues/new'}>create your own</Link> and next time, remember to be on time!</h3></div>
                    }
                  </div>
                }
              </div>
          ) :
            <PicksGrid />
          }
        </div>
      </div>
    );
  }

}

export default LeaguesShow;
