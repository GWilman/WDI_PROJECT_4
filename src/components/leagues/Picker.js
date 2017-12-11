import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Form, FormGroup, ControlLabel, Button, Row, Col } from 'react-bootstrap';
import Autosuggest from 'react-bootstrap-autosuggest';

import Auth from '../../lib/Auth';

class Picker extends React.Component {
  state = {
    teams: [],
    players: [],
    picks: {
      league: this.props.match.params.id
    }
  }

  componentDidMount() {
    Axios
      .get('/api/teams')
      .then(res => {
        this.setState({ teams: res.data });
      })
      .catch(err => console.error(err));

    Axios
      .get('/api/players')
      .then(res => {
        this.setState({ players: res.data });
      })
      .catch(err => console.error(err));
  }

  handleChange = (value, name, type) => {
    if(!value) return false;
    const { teams, players } = this.state;
    if(type === 'team') {
      value = teams.find(team => team.name === value).id;
    } else {
      value = players.find(player => player.name === value).id;
    }

    const picks = Object.assign({}, this.state.picks, { [name]: value });
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

  h3Style = {
    marginTop: '10px'
  }

  render() {
    const teamNames = this.state.teams.map(team => team.name);
    const playerNames = this.state.players.map(player => player.name);
    return (
      <div>
        <h2>Make Your Picks for the Champions League Knockout Stages 2018</h2>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col sm={6}>
              <ControlLabel>#1: Champions</ControlLabel>
              <FormGroup controlId="winningTeamInput">
                <Autosuggest
                  datalist={teamNames}
                  required
                  placeholder="Pick a team"
                  name="champion"
                  id="champion"
                  value=''
                  onBlur={(value) => this.handleChange(value, 'champion', 'team')}
                />
              </FormGroup>

              <ControlLabel>#2: Runner Up</ControlLabel>
              <FormGroup controlId="runnerUpInput">
                <Autosuggest
                  datalist={teamNames}
                  required
                  placeholder="Pick a team"
                  name="runnerUp"
                  id="runnerUp"
                  value=""
                  onBlur={(value) => this.handleChange(value, 'runnerUp', 'team')}
                />
              </FormGroup>

              <ControlLabel>#3: Top Scoring Team</ControlLabel>
              <FormGroup controlId="topScoringTeamInput">
                <Autosuggest
                  datalist={teamNames}
                  required
                  placeholder="Pick a team"
                  name="topScoringTeam"
                  id="topScoringTeam"
                  value=""
                  onBlur={(value) => this.handleChange(value, 'topScoringTeam', 'team')}
                />
              </FormGroup>

              <ControlLabel>#4: Most Yellow Cards (Team)</ControlLabel>
              <FormGroup controlId="mostYellowsTeamInput">
                <Autosuggest
                  datalist={teamNames}
                  required
                  placeholder="Pick a team"
                  name="mostYellowsTeam"
                  id="mostYellowsTeam"
                  value=""
                  onBlur={(value) => this.handleChange(value, 'mostYellowsTeam', 'team')}
                />
              </FormGroup>
            </Col>

            <Col sm={6}>
              <ControlLabel>#5: Top Scorer</ControlLabel>
              <FormGroup controlId="topScorerInput">
                <Autosuggest
                  datalist={playerNames}
                  required
                  placeholder="Pick a player"
                  name="topScorer"
                  id="topScorer"
                  value=""
                  onBlur={(value) => this.handleChange(value, 'topScorer', 'player')}
                />
              </FormGroup>

              <ControlLabel>#6: Most Assists</ControlLabel>
              <FormGroup controlId="mostAssistsInput">
                <Autosuggest
                  datalist={playerNames}
                  required
                  placeholder="Pick a player"
                  name="mostAssists"
                  id="mostAssists"
                  value=""
                  onBlur={(value) => this.handleChange(value, 'mostAssists', 'player')}
                />
              </FormGroup>

              <ControlLabel>#7: Most Yellow Cards</ControlLabel>
              <FormGroup controlId="mostYellowsInput">
                <Autosuggest
                  datalist={playerNames}
                  required
                  placeholder="Pick a player"
                  name="mostYellows"
                  id="mostYellows"
                  value=""
                  onBlur={(value) => this.handleChange(value, 'mostYellows', 'player')}
                />
              </FormGroup>
            </Col>
          </Row>

          <hr />

          <Row>
            <Col sm={8}>
              <h3 style={this.h3Style}>Bonus!</h3>
              <p>Score 20 bonus points for each of these you pick correctly.</p>

              <ControlLabel>Player to be Sent Off</ControlLabel>
              <FormGroup controlId="sentOffInput">
                <Autosuggest
                  datalist={playerNames}
                  required
                  placeholder="Pick a player"
                  name="sentOff"
                  id="sentOff"
                  value=""
                  onBlur={(value) => this.handleChange(value, 'sentOff', 'player')}
                />
              </FormGroup>

              <ControlLabel>Cup Final: Man of the Match</ControlLabel>
              <FormGroup controlId="finalMoMInput">
                <Autosuggest
                  datalist={playerNames}
                  required
                  placeholder="Pick a player"
                  name="finalMoM"
                  id="finalMoM"
                  value=""
                  onBlur={(value) => this.handleChange(value, 'finalMoM', 'player')}
                />
              </FormGroup>
            </Col>
          </Row>

          <Button type="submit">
            Submit Picks
          </Button>

        </Form>
      </div>
    );
  }

}

export default withRouter(Picker);
