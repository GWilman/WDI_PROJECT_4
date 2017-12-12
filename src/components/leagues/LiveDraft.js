import React from 'react';
import Axios from 'axios';
import Promise from 'bluebird';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import Autosuggest from 'react-bootstrap-autosuggest';

import socketIOClient from 'socket.io-client';

import Auth from '../../lib/Auth';

class LiveDraft extends React.Component {

  webSocket = socketIOClient('/socket');

  state = {
    league: {},
    teams: [],
    players: [],
    picks: [],
    turn: 0,
    round: 1
  }

  gridStyle = {
    border: '2px solid black',
    fontSize: '12px',
    padding: '0',
    textAlign: 'center',
    margin: '0'
  };

  rowStyle = {
    borderBottom: '1px solid gray',
    margin: '0'
  }

  colStyle = {
    borderRight: '1px solid gray',
    height: '70px',
    padding: '0'
  }

  endColStyle = {
    border: 'none',
    height: '70px',
    padding: '0'
  }

  pStyle = {
    padding: '20% 0',
    margin: '0 4px'
  }

  usernameStyle = {
    lineHeight: '70px',
    fontWeight: '800'
  }

  // inputStyle = {
  //   width: '100%',
  //   height: '70px'
  // }

  componentDidMount() {

    this.webSocket.on('connect', () => {
      console.log(`${this.webSocket.id} connected`);

      this.webSocket.on('pickMade', data => {
        this.handleChange(data.value, data.id, data.name, data.type, true);
      });

    });

    const promises = {
      league: Axios.get(`/api/leagues/${this.props.match.params.id}`).then(res => res.data),
      teams: Axios.get('/api/teams').then(res => res.data),
      players: Axios.get('/api/players').then(res => res.data)
    };

    Promise.props(promises)
      .then(data => {
        this.setState(data);
        const picks = [];
        this.state.league.users.forEach(user => {
          picks.push({
            createdBy: user.id,
            league: this.props.match.params.id
          });
        });

        const teams = data.teams.map(team => team.name);
        const players = data.players.map(player => player.name);

        this.setState({
          champion: teams,
          runnerUp: teams,
          topScoringTeam: teams,
          mostYellowsTeam: teams,
          topScorer: players,
          mostAssists: players,
          mostYellows: players,
          sentOff: players,
          finalMoM: players,
          picks });

      })
      .catch(err => console.error(err));

  }

  checkTurn = (id, round) => {
    const index = this.state.picks.findIndex(pick => pick.createdBy === id);
    const { userId } = Auth.getPayload();

    if (this.state.turn === index && this.state.round === round && id === userId) {
      return false;
    } else {
      return true;
    }

  }

  handleChange = (value, id, name, type, isSocket) => {
    if(!value) return false;
    console.log(value, id, name, type, isSocket);
    const dataList = this.state[name].filter(choice => choice !== value);

    if(!isSocket) this.webSocket.emit('pickMade', { value, id, name, type });

    const { teams, players } = this.state;
    if(type === 'team') {
      value = teams.find(team => team.name === value).id;
    } else {
      value = players.find(player => player.name === value).id;
    }

    const index = this.state.picks.findIndex(pick => pick.createdBy === id);
    const pick = Object.assign({}, this.state.picks[index], { [name]: value });
    const picks = [
      ...this.state.picks.slice(0, index),
      pick,
      ...this.state.picks.slice(index+1)
    ];

    let turn = this.state.turn + 1;
    if (turn === this.state.picks.length) turn = 0;
    const round = ((Object.keys(this.state.picks[turn]).length) - 1);
    console.log('turn:', turn, 'round:', round);

    this.setState({
      picks,
      [name]: dataList,
      turn: turn,
      round: round
    }, () => console.log(this.state.picks));

  }

  getNameById = (id, type) => {
    if(!id || this.state.teams.length === 0 || this.state.players.length === 0) return null;
    if(type === 'team') {
      return this.state.teams.find(team => team.id === id).name;
    } else {
      return this.state.players.find(player => player.id === id).name;
    }
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   Axios
  //     .post('/api/picks', this.state.picks, {
  //       headers: {'Authorization': `Bearer ${Auth.getToken()}`}
  //     })
  //     .then(() => this.props.history.push(`/leagues/${this.props.match.params.id}`))
  //     .catch(err => console.error(err));
  // }


  render() {
    // console.log('turn:', this.state.turn);
    // console.log('round:', this.state.round);
    return (
      <div>
        <h1>Live Draft</h1>
        <Form onSubmit={this.handleSubmit}>
          <Grid style={this.gridStyle}>
            <Row style={this.rowStyle}>
              <Col xs={3} style={this.colStyle}>
                <p style={this.pStyle}></p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p style={this.pStyle}><strong>Champion</strong></p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p style={this.pStyle}><strong>Runner Up</strong></p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p style={this.pStyle}><strong>Top Scoring Team</strong></p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p style={this.pStyle}><strong>Most Yellows (Team)</strong></p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p style={this.pStyle}><strong>Top Scorer</strong></p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p style={this.pStyle}><strong>Most Assists</strong></p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p style={this.pStyle}><strong>Most Yellows</strong></p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p style={this.pStyle}><strong>Sent Off</strong></p>
              </Col>
              <Col xs={1} style={this.endColStyle}>
                <p style={this.pStyle}><strong>MoM (Final)</strong></p>
              </Col>
            </Row>
            { this.state.league.users && this.state.league.users.map((user, i) => {
              return (<Row key={user.id} style={this.rowStyle}>
                <Col xs={3} style={this.colStyle}>
                  <p style={this.usernameStyle}>{user.username}</p>
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={this.state.champion}
                    required
                    className="autosuggest"
                    placeholder="Pick..."
                    name="champion"
                    id="champion"
                    value={this.state.picks[i] ? this.getNameById(this.state.picks[i].champion, 'team') : ''}
                    disabled={this.checkTurn(user.id, 1)}
                    onBlur={(value) => this.handleChange(value, user.id, 'champion', 'team')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={this.state.runnerUp}
                    required
                    className="autosuggest"
                    placeholder="Pick..."
                    name="runnerUp"
                    id="runnerUp"
                    value=""
                    disabled={this.checkTurn(user.id, 2)}
                    onBlur={(value) => this.handleChange(value, user.id, 'runnerUp', 'team')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={this.state.topScoringTeam}
                    required
                    className="autosuggest"
                    placeholder="Pick..."
                    name="topScoringTeam"
                    id="topScoringTeam"
                    value=""
                    disabled={this.checkTurn(user.id, 3)}
                    onBlur={(value) => this.handleChange(value, user.id, 'topScoringTeam', 'team')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={this.state.mostYellowsTeam}
                    required
                    className="autosuggest"
                    placeholder="Pick..."
                    name="mostYellowsTeam"
                    id="mostYellowsTeam"
                    value=""
                    disabled={this.checkTurn(user.id, 4)}
                    onBlur={(value) => this.handleChange(value, user.id, 'mostYellowsTeam', 'team')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={this.state.topScorer}
                    required
                    className="autosuggest"
                    placeholder="Pick..."
                    name="topScorer"
                    id="topScorer"
                    value=""
                    disabled={this.checkTurn(user.id, 5)}
                    onBlur={(value) => this.handleChange(value, user.id, 'topScorer', 'player')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={this.state.mostAssists}
                    required
                    className="autosuggest"
                    placeholder="Pick..."
                    name="mostAssists"
                    id="mostAssists"
                    value=""
                    disabled={this.checkTurn(user.id, 6)}
                    onBlur={(value) => this.handleChange(value, user.id, 'mostAssists', 'player')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={this.state.mostYellows}
                    required
                    className="autosuggest"
                    placeholder="Pick..."
                    name="mostYellows"
                    id="mostYellows"
                    value=""
                    disabled={this.checkTurn(user.id, 7)}
                    onBlur={(value) => this.handleChange(value, user.id, 'mostYellows', 'player')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={this.state.sentOff}
                    required
                    className="autosuggest"
                    placeholder="Pick..."
                    name="sentOff"
                    id="sentOff"
                    value=""
                    disabled={this.checkTurn(user.id, 8)}
                    onBlur={(value) => this.handleChange(value, user.id, 'sentOff', 'player')}
                  />
                </Col>
                <Col xs={1} style={this.endColStyle}>
                  <Autosuggest
                    datalist={this.state.finalMoM}
                    required
                    className="autosuggest"
                    placeholder="Pick..."
                    name="finalMoM"
                    id="finalMoM"
                    value=""
                    disabled={this.checkTurn(user.id, 9)}
                    onBlur={(value) => this.handleChange(value, user.id, 'finalMoM', 'player')}
                  />
                </Col>
              </Row>);
            })}
          </Grid>
        </Form>
      </div>
    );
  }

}

export default withRouter(LiveDraft);
