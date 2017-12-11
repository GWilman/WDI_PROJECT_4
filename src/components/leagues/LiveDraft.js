import React from 'react';
import Axios from 'axios';
import Promise from 'bluebird';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import Autosuggest from 'react-bootstrap-autosuggest';

import Auth from '../../lib/Auth';

class LiveDraft extends React.Component {
  state = {
    league: {},
    teams: [],
    players: [],
    picks: []
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

  inputStyle = {
    width: '40px'
  }

  componentDidMount() {

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
        this.setState({ picks });
      })
      .catch(err => console.error(err));


  }

  handleChange = (value, id, name, type) => {
    if(!value) return false;
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
    this.setState({ picks });

  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/picks', this.state.picks, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push(`/leagues/${this.props.match.params.id}`))
      .catch(err => console.error(err));
  }


  render() {
    console.log(this.state.picks);
    const teamNames = this.state.teams.map(team => team.name);
    const playerNames = this.state.players.map(player => player.name);
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
            { this.state.league.users && this.state.league.users.map(user => {
              return (<Row key={user.id} style={this.rowStyle}>
                <Col xs={3} style={this.colStyle}>
                  <p style={this.usernameStyle}>{user.username}</p>
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={teamNames}
                    required
                    placeholder="Pick a team"
                    name="champion"
                    id="champion"
                    value=''
                    onBlur={(value) => this.handleChange(value, user.id, 'champion', 'team')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={teamNames}
                    required
                    placeholder="Pick a team"
                    name="runnerUp"
                    id="runnerUp"
                    value=""
                    onBlur={(value) => this.handleChange(value, user.id, 'runnerUp', 'team')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={teamNames}
                    required
                    placeholder="Pick a team"
                    name="topScoringTeam"
                    id="topScoringTeam"
                    value=""
                    onBlur={(value) => this.handleChange(value, user.id, 'topScoringTeam', 'team')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={teamNames}
                    required
                    placeholder="Pick a team"
                    name="mostYellowsTeam"
                    id="mostYellowsTeam"
                    value=""
                    onBlur={(value) => this.handleChange(value, user.id, 'mostYellowsTeam', 'team')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={playerNames}
                    required
                    placeholder="Pick a player"
                    name="topScorer"
                    id="topScorer"
                    value=""
                    onBlur={(value) => this.handleChange(value, user.id, 'topScorer', 'player')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={playerNames}
                    required
                    placeholder="Pick a player"
                    name="mostAssists"
                    id="mostAssists"
                    value=""
                    onBlur={(value) => this.handleChange(value, user.id, 'mostAssists', 'player')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={playerNames}
                    required
                    placeholder="Pick a player"
                    name="mostYellows"
                    id="mostYellows"
                    value=""
                    onBlur={(value) => this.handleChange(value, user.id, 'mostYellows', 'player')}
                  />
                </Col>
                <Col xs={1} style={this.colStyle}>
                  <Autosuggest
                    datalist={playerNames}
                    required
                    placeholder="Pick a player"
                    name="sentOff"
                    id="sentOff"
                    value=""
                    onBlur={(value) => this.handleChange(value, user.id, 'sentOff', 'player')}
                  />
                </Col>
                <Col xs={1} style={this.endColStyle}>
                  <Autosuggest
                    datalist={playerNames}
                    required
                    placeholder="Pick a player"
                    name="finalMoM"
                    id="finalMoM"
                    value=""
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
