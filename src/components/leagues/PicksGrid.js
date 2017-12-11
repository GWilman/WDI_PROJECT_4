import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import _ from 'lodash';

import Auth from '../../lib/Auth';

class PicksGrid extends React.Component {
  state = {
    picks: [],
    isOwned: false,
    updating: false
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
    Axios
      .get('/api/picks', {
        params: { league: this.props.match.params.id }
      })
      .then(res => {
        const { userId } = Auth.getPayload();
        let isOwned = false;
        if (userId === res.data[0].league.createdBy) isOwned = true;
        this.setState({ picks: res.data, isOwned: isOwned });
      })
      .catch(err => console.error(err));
  }

  update = () => {
    this.setState({ updating: true });
  }

  handleChange = (e, category, id) => {
    if(!e.target.value) return false;
    const newPicks = this.state.picks.map(pick => pick);
    newPicks.find(pick => pick.id === id)[category] = parseFloat(e.target.value);
    this.setState({ picks: newPicks });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const ids = this.state.picks.map(pick => pick.id);

    for (let i = 0; i < ids.length; i++) {

      const updatePick = Object.assign({}, this.state.picks[i], {
        createdBy: this.state.picks[i].createdBy.id,
        league: this.state.picks[i].league.id,
        champion: this.state.picks[i].champion.id,
        runnerUp: this.state.picks[i].runnerUp.id,
        topScoringTeam: this.state.picks[i].topScoringTeam.id,
        mostYellowsTeam: this.state.picks[i].mostYellowsTeam.id,
        topScorer: this.state.picks[i].topScorer.id,
        mostAssists: this.state.picks[i].mostAssists.id,
        mostYellows: this.state.picks[i].mostYellows.id,
        sentOff: this.state.picks[i].sentOff.id,
        finalMoM: this.state.picks[i].finalMoM.id
      });

      console.log('to send:', updatePick);

      Axios
        .put(`/api/picks/${ids[i]}`, updatePick, {
          headers: {'Authorization': `Bearer ${Auth.getToken()}`}
        })
        .then()
        .catch(err => console.error(err));
    }

    Axios
      .get('/api/picks', {
        params: { league: this.props.match.params.id }
      })
      .then(res => {
        const { userId } = Auth.getPayload();
        let isOwned = false;
        if (userId === res.data[0].league.createdBy) isOwned = true;
        this.setState({ picks: res.data, isOwned: isOwned, updating: false });
      })
      .catch(err => console.error(err));

  }


  render() {
    const orderedPicks = _.orderBy(this.state.picks, ['totalPoints'], ['desc']);
    return (
      <div>
        <h1>The Grid</h1>
        { this.state.isOwned && !this.state.updating &&
          <button className="btn btn-primary" onClick={this.update}>Update Scores</button>
        }
        <Form onSubmit={this.handleSubmit}>
          { this.state.isOwned && this.state.updating &&
            <button className="btn btn-primary">Save Changes</button>
          }
          <Grid style={this.gridStyle}>
            <Row style={this.rowStyle}>
              <Col xs={2} style={this.colStyle}>
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
              <Col xs={1} style={this.colStyle}>
                <p style={this.pStyle}><strong>MoM (Final)</strong></p>
              </Col>
              <Col xs={1} style={this.endColStyle}>
                <p style={this.pStyle}><strong>Points</strong></p>
              </Col>
            </Row>
            { orderedPicks.map(pick => {
              return (<Row key={pick.id} style={this.rowStyle}>
                <Col xs={2} style={this.colStyle}>
                  <p style={this.usernameStyle}>{pick.createdBy.username}</p>
                </Col>
                <Col xs={1} style={this.colStyle}>
                  { this.state.updating ?
                    <div>
                      <input
                        style={this.inputStyle}
                        type="text"
                        name="championPoints"
                        value={pick.championPoints}
                        onChange={(value) => this.handleChange(value, 'championPoints', pick.id)}
                      />
                      <p>{pick.champion.name}</p>
                    </div>
                    :
                    <p>{pick.championPoints}<br />{pick.champion.name}</p>
                  }
                </Col>
                <Col xs={1} style={this.colStyle}>
                  { this.state.updating ?
                    <div>
                      <input
                        style={this.inputStyle}
                        type="text"
                        name="runnerUpPoints"
                        value={pick.runnerUpPoints}
                        onChange={(value) => this.handleChange(value, 'runnerUpPoints', pick.id)}
                      />
                      <p>{pick.runnerUp.name}</p>
                    </div>
                    :
                    <p>{pick.runnerUpPoints}<br />{pick.runnerUp.name}</p>
                  }
                </Col>
                <Col xs={1} style={this.colStyle}>
                  { this.state.updating ?
                    <div>
                      <input
                        style={this.inputStyle}
                        type="text"
                        name="topScoringTeamPoints"
                        value={pick.topScoringTeamPoints}
                        onChange={(value) => this.handleChange(value, 'topScoringTeamPoints', pick.id)}
                      />
                      <p>{pick.topScoringTeam.name}</p>
                    </div>
                    :
                    <p>{pick.topScoringTeamPoints}<br />{pick.topScoringTeam.name}</p>
                  }
                </Col>
                <Col xs={1} style={this.colStyle}>
                  { this.state.updating ?
                    <div>
                      <input
                        style={this.inputStyle}
                        type="text"
                        name="mostYellowsTeamPoints"
                        value={pick.mostYellowsTeamPoints}
                        onChange={(value) => this.handleChange(value, 'mostYellowsTeamPoints', pick.id)}
                      />
                      <p>{pick.mostYellowsTeam.name}</p>
                    </div>
                    :
                    <p>{pick.mostYellowsTeamPoints}<br />{pick.mostYellowsTeam.name}</p>
                  }
                </Col>
                <Col xs={1} style={this.colStyle}>
                  { this.state.updating ?
                    <div>
                      <input
                        style={this.inputStyle}
                        type="text"
                        name="topScorerPoints"
                        value={pick.topScorerPoints}
                        onChange={(value) => this.handleChange(value, 'topScorerPoints', pick.id)}
                      />
                      <p>{pick.topScorer.name}</p>
                    </div>
                    :
                    <p>{pick.topScorerPoints}<br />{pick.topScorer.name}</p>
                  }
                </Col>
                <Col xs={1} style={this.colStyle}>
                  { this.state.updating ?
                    <div>
                      <input
                        style={this.inputStyle}
                        type="text"
                        name="mostAssistsPoints"
                        value={pick.mostAssistsPoints}
                        onChange={(value) => this.handleChange(value, 'mostAssistsPoints', pick.id)}
                      />
                      <p>{pick.mostAssists.name}</p>
                    </div>
                    :
                    <p>{pick.mostAssistsPoints}<br />{pick.mostAssists.name}</p>
                  }
                </Col>
                <Col xs={1} style={this.colStyle}>
                  { this.state.updating ?
                    <div>
                      <input
                        style={this.inputStyle}
                        type="text"
                        name="mostYellowsPoints"
                        value={pick.mostYellowsPoints}
                        onChange={(value) => this.handleChange(value, 'mostYellowsPoints', pick.id)}
                      />
                      <p>{pick.mostYellows.name}</p>
                    </div>
                    :
                    <p>{pick.mostYellowsPoints}<br />{pick.mostYellows.name}</p>
                  }
                </Col>
                <Col xs={1} style={this.colStyle}>
                  { this.state.updating ?
                    <div>
                      <input
                        style={this.inputStyle}
                        type="text"
                        name="sentOffPoints"
                        value={pick.sentOffPoints}
                        onChange={(value) => this.handleChange(value, 'sentOffPoints', pick.id)}
                      />
                      <p>{pick.sentOff.name}</p>
                    </div>
                    :
                    <p>{pick.sentOffPoints}<br />{pick.sentOff.name}</p>
                  }
                </Col>
                <Col xs={1} style={this.colStyle}>
                  { this.state.updating ?
                    <div>
                      <input
                        style={this.inputStyle}
                        type="text"
                        name="finalMoMPoints"
                        value={pick.finalMoMPoints}
                        onChange={(value) => this.handleChange(value, 'finalMoMPoints', pick.id)}
                      />
                      <p>{pick.finalMoM.name}</p>
                    </div>
                    :
                    <p>{pick.finalMoMPoints}<br />{pick.finalMoM.name}</p>
                  }
                </Col>
                <Col xs={1} style={this.endColStyle}>
                  <p><strong>{pick.totalPoints}</strong></p>
                </Col>
              </Row>);
            })}
          </Grid>
        </Form>
      </div>
    );
  }

}

export default withRouter(PicksGrid);
