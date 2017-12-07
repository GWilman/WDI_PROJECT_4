import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Form, FormGroup, ControlLabel, Button } from 'react-bootstrap';
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

  handleChange = (e) => {
    const inputs = document.querySelectorAll('input');
    let selectedInput = null;
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value === e) {
        selectedInput = inputs[i];
      }
    }

    const name = selectedInput.name;
    let value = selectedInput.value;

    this.state.teams.forEach(team => {
      if (team.name === value) {
        value = team.id;
      }
    });

    this.state.players.forEach(player => {
      if (player.name === value) {
        value = player.id;
      }
    });

    const picks = Object.assign({}, this.state.picks, { [name]: value });
    this.setState({ picks });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/picks', this.state.picks, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  render() {
    const teamNames = this.state.teams.map(team => team.name);
    const playerNames = this.state.players.map(player => player.name);
    return (
      <div>
        <h2>Make Your Picks for the Champions League Knockout Stages 2018</h2>
        <Form onSubmit={this.handleSubmit}>
          <ControlLabel>#1: Champions</ControlLabel>
          <FormGroup controlId="winningTeamInput">
            <Autosuggest
              datalist={teamNames}
              placeholder="Pick a team"
              name="champion"
              id="champion"
              value=''
              onBlur={this.handleChange}
            />
          </FormGroup>

          <ControlLabel>#2: Runner Up</ControlLabel>
          <FormGroup controlId="runnerUpInput">
            <Autosuggest
              datalist={teamNames}
              placeholder="Pick a team"
              name="runnerUp"
              id="runnerUp"
              value=""
              onBlur={this.handleChange}
            />
          </FormGroup>

          <ControlLabel>#3: Top Scoring Team</ControlLabel>
          <FormGroup controlId="topScoringTeamInput">
            <Autosuggest
              datalist={teamNames}
              placeholder="Pick a team"
              name="topScoringTeam"
              id="topScoringTeam"
              value=""
              onBlur={this.handleChange}
            />
          </FormGroup>

          <ControlLabel>#4: Most Yellow Cards (Team)</ControlLabel>
          <FormGroup controlId="mostYellowsTeamInput">
            <Autosuggest
              datalist={teamNames}
              placeholder="Pick a team"
              name="mostYellowsTeam"
              id="mostYellowsTeam"
              value=""
              onBlur={this.handleChange}
            />
          </FormGroup>

          <ControlLabel>#5: Top Scorer</ControlLabel>
          <FormGroup controlId="topScorerInput">
            <Autosuggest
              datalist={playerNames}
              placeholder="Pick a player"
              name="topScorer"
              id="topScorer"
              value=""
              onBlur={this.handleChange}
            />
          </FormGroup>

          <ControlLabel>#6: Most Assists</ControlLabel>
          <FormGroup controlId="mostAssistsInput">
            <Autosuggest
              datalist={playerNames}
              placeholder="Pick a player"
              name="mostAssists"
              id="mostAssists"
              value=""
              onBlur={this.handleChange}
            />
          </FormGroup>

          <ControlLabel>#6: Most Yellow Cards</ControlLabel>
          <FormGroup controlId="mostYellowsInput">
            <Autosuggest
              datalist={playerNames}
              placeholder="Pick a player"
              name="mostYellows"
              id="mostYellows"
              value=""
              onBlur={this.handleChange}
            />
          </FormGroup>

          <h3>Bonus!</h3>
          <p>Score 20 bonus points for each of these you pick correctly.</p>

          <ControlLabel>Player to be Sent Off</ControlLabel>
          <FormGroup controlId="sentOffInput">
            <Autosuggest
              datalist={playerNames}
              placeholder="Pick a player"
              name="sentOff"
              id="sentOff"
              value=""
              onBlur={this.handleChange}
            />
          </FormGroup>

          <ControlLabel>Cup Final: Man of the Match</ControlLabel>
          <FormGroup controlId="finalMoMInput">
            <Autosuggest
              datalist={playerNames}
              placeholder="Pick a player"
              name="finalMoM"
              id="finalMoM"
              value=""
              onBlur={this.handleChange}
            />
          </FormGroup>

          <Button type="submit">
            Submit Picks
          </Button>

        </Form>
      </div>
    );
  }

}

export default withRouter(Picker);
