import React from 'react';
import Axios from 'axios';
import Promise from 'bluebird';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Form, Modal, Button } from 'react-bootstrap';
import Autosuggest from 'react-bootstrap-autosuggest';

import Auth from '../../lib/Auth';

class LiveDraft extends React.Component {

  state = {
    league: {},
    teams: [],
    players: [],
    picks: [],
    turn: 0,
    round: 1,
    sockets: [],
    members: []
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

  imgStyle = {
    height: '34px',
    width: '34px',
    borderRadius: '100%'
  }

  h1Style = {
    textAlign: 'center',
    marginBottom: '0'
  }

  h3Style = {
    textAlign: 'center',
    margin: '10px 0'
  }

  modalStyle = {
    paddingTop: '200px'
  }

  componentDidMount() {

    this.props.websocket.emit('draft started', this.props.match.params.id);
    console.log('DRAFT STARTED', this.props.match.params.id);

    this.props.websocket.on('pick made', data => {
      console.log('pick made', data);
      this.handleChange(data.value, data.id, data.name, data.type, true);
    });

    const promises = {
      league: Axios.get(`/api/leagues/${this.props.match.params.id}`).then(res => res.data),
      teams: Axios.get('/api/teams').then(res => res.data),
      players: Axios.get('/api/players').then(res => res.data)
    };

    this.props.websocket.on('draft users', users => {
      console.log(users);
      this.setState({ users }, () => {

        console.log('DRAFT USERS', this.state.users);
        Promise.props(promises)
          .then(data => {
            const members = data.league.users.filter(user => this.state.users.includes(user.id));
            console.log('MEMBERS', members);
            const picks = data.league.users.map(user => {
              return {
                createdBy: user.id,
                league: this.props.match.params.id
              };
            })
              .filter(pick => this.state.users.includes(pick.createdBy));

            const teams = data.teams.map(team => team.name);
            const players = data.players.map(player => player.name);

            const newState = Object.assign(data, {
              champion: teams,
              runnerUp: teams,
              topScoringTeam: teams,
              mostYellowsTeam: teams,
              topScorer: players,
              mostAssists: players,
              mostYellows: players,
              sentOff: players,
              finalMoM: players,
              picks,
              members
            });

            this.setState(newState, () => console.log(this.state));

          })
          .catch(err => console.error(err));
      });
    });
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

    if(!isSocket) this.props.websocket.emit('pick made', { value, id, name, type });

    const { teams, players } = this.state;
    if(type === 'team') {
      value = teams.find(team => team.name === value);
    } else {
      value = players.find(player => player.name === value);
    }

    if(!value) return false;
    value = value.id;

    const index = this.state.picks.findIndex(pick => pick.createdBy === id);
    const pick = Object.assign({}, this.state.picks[index], { [name]: value });
    const picks = [
      ...this.state.picks.slice(0, index),
      pick,
      ...this.state.picks.slice(index+1)
    ];

    let turn = this.state.turn + 1;
    if (turn === this.state.picks.length) turn = 0;
    let round;
    if (this.state.picks.length > 1) {
      round = ((Object.keys(this.state.picks[turn]).length) - 1);
    } else {
      round = this.state.round + 1;
    }
    console.log('turn:', turn, 'round:', round);

    this.setState({
      picks,
      [name]: dataList,
      turn: turn,
      round: round
    }, () => console.log(this.state.picks));

    if (this.state.round === 10) {
      this.props.websocket.emit('draft finished', this.state.picks);
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ round: 11 });
    const { userId } = Auth.getPayload();
    const picks = this.state.picks.find(pick => pick.createdBy === userId );
    Axios
      .post('/api/picks', picks, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  getNameById = (id, type) => {
    if(!id || this.state.teams.length === 0 || this.state.players.length === 0) return null;
    if(type === 'team') {
      return this.state.teams.find(team => team.id === id).name;
    } else {
      return this.state.players.find(player => player.id === id).name;
    }
  }

  render() {
    if (!this.state.members) return false;
    return (
      <div>
        { this.state.round >= 10 &&
          <h1>DRAFT COMPLETE</h1>
        }
        { this.state.picks.length > 0 && this.state.round !== 10 &&
          <div>
            <h1 style={this.h1Style}>YOUR LEAGUE IS DRAFTING</h1>
            <h3 style={this.h3Style}>It is your turn: {this.state.league.users[this.state.turn].username}</h3>
          </div>
        }
        <Form>
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
            { this.state.league.users && this.state.members.map((user, i) => {
              return (<Row key={user.id} style={this.rowStyle}>
                <Col xs={3} style={this.colStyle}>
                  <p style={this.usernameStyle}>
                    { user.image && <img src={user.image} style={this.imgStyle} />}
                    {user.username}</p>
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
                    onChange={(value) => this.handleChange(value, user.id, 'champion', 'team')}
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
                    value={this.state.picks[i] ? this.getNameById(this.state.picks[i].runnerUp, 'team') : ''}
                    disabled={this.checkTurn(user.id, 2)}
                    onChange={(value) => this.handleChange(value, user.id, 'runnerUp', 'team')}
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
                    value={this.state.picks[i] ? this.getNameById(this.state.picks[i].topScoringTeam, 'team') : ''}
                    disabled={this.checkTurn(user.id, 3)}
                    onChange={(value) => this.handleChange(value, user.id, 'topScoringTeam', 'team')}
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
                    value={this.state.picks[i] ? this.getNameById(this.state.picks[i].mostYellowsTeam, 'team') : ''}
                    disabled={this.checkTurn(user.id, 4)}
                    onChange={(value) => this.handleChange(value, user.id, 'mostYellowsTeam', 'team')}
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
                    value={this.state.picks[i] ? this.getNameById(this.state.picks[i].topScorer, 'player') : ''}
                    disabled={this.checkTurn(user.id, 5)}
                    onChange={(value) => this.handleChange(value, user.id, 'topScorer', 'player')}
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
                    value={this.state.picks[i] ? this.getNameById(this.state.picks[i].mostAssists, 'player') : ''}
                    disabled={this.checkTurn(user.id, 6)}
                    onChange={(value) => this.handleChange(value, user.id, 'mostAssists', 'player')}
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
                    value={this.state.picks[i] ? this.getNameById(this.state.picks[i].mostYellows, 'player') : ''}
                    disabled={this.checkTurn(user.id, 7)}
                    onChange={(value) => this.handleChange(value, user.id, 'mostYellows', 'player')}
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
                    value={this.state.picks[i] ? this.getNameById(this.state.picks[i].sentOff, 'player') : ''}
                    disabled={this.checkTurn(user.id, 8)}
                    onChange={(value) => this.handleChange(value, user.id, 'sentOff', 'player')}
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
                    value={this.state.picks[i] ? this.getNameById(this.state.picks[i].finalMoM, 'player') : ''}
                    disabled={this.checkTurn(user.id, 9)}
                    onChange={(value) => this.handleChange(value, user.id, 'finalMoM', 'player')}
                  />
                </Col>
              </Row>);
            })}
          </Grid>
        </Form>
        { this.state.round === 10 &&
          <div className="static-modal">
            <Modal.Dialog style={this.modalStyle}>
              <Modal.Header>
                <Modal.Title>Draft Complete</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                The draft is now over! Click Done to end the draft.
              </Modal.Body>

              <Modal.Footer>
                <Button bsStyle="primary" onClick={this.handleSubmit}>Done</Button>
              </Modal.Footer>

            </Modal.Dialog>
          </div>
        }
      </div>
    );
  }

}

export default withRouter(LiveDraft);
