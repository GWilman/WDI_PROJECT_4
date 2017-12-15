import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import _ from 'lodash';
import Promise from 'bluebird';

import Auth from '../../lib/Auth';

class PicksGrid extends React.Component {
  state = {
    picks: [],
    isOwned: false,
    updating: false
  }

  containerStyle = {
    marginTop: '20px'
  }

  gridStyle = {
    border: '4px solid black',
    fontSize: '12px',
    padding: '0',
    textAlign: 'center',
    margin: '20px 0',
    borderRadius: '8px',
    background: '#fff'
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

  imageStyle = {
    lineHeight: '70px'
  }

  usernameStyle = {
    lineHeight: '70px',
    fontWeight: '800',
    textAlign: 'left'
  }

  inputStyle = {
    width: '40px',
    borderRadius: '4px',
    marginTop: '10px',
    textAlign: 'center'
  }

  updateStyle = {
    margin: '10px auto'
  }

  pointsStyle = {
    marginTop: '10px'
  }

  totalPointsStyle = {
    marginTop: '10px',
    fontSize: '20px',
    fontWeight: '800'
  }

  imgStyle = {
    height: '34px',
    width: '34px',
    borderRadius: '100%'
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
    const promises = this.state.picks.map(pick => {
      return Axios
        .put(`/api/picks/${pick.id}`, pick, {
          headers: {'Authorization': `Bearer ${Auth.getToken()}`}
        }).then(res => res.data);
    });

    Promise.all(promises)
      .then(() => Axios.get('/api/picks', { params: { league: this.props.match.params.id } }))
      .then(res => {
        console.log('submit get picks', res.data);
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
      <div style={this.containerStyle}>
        { this.state.isOwned && !this.state.updating &&
          <button className="btn btn-blue" onClick={this.update} style={this.updateStyle}>Update Scores</button>
        }
        <Form onSubmit={this.handleSubmit}>
          { this.state.isOwned && this.state.updating &&
            <button className="btn btn-blue" style={this.updateStyle}>Save Changes</button>
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
                  <Col xs={3} xsOffset={2}>
                    { pick.createdBy.image &&
                      <p style={this.imageStyle}><img src={pick.createdBy.image} style={this.imgStyle} /></p>
                    }
                  </Col>
                  <Col xs={7}>
                    <p style={this.usernameStyle}>
                      {pick.createdBy.username}
                    </p>
                  </Col>
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
                    <p style={this.pointsStyle}>{pick.championPoints}<br />{pick.champion.name}</p>
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
                    <p style={this.pointsStyle}>{pick.runnerUpPoints}<br />{pick.runnerUp.name}</p>
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
                    <p style={this.pointsStyle}>{pick.topScoringTeamPoints}<br />{pick.topScoringTeam.name}</p>
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
                    <p style={this.pointsStyle}>{pick.mostYellowsTeamPoints}<br />{pick.mostYellowsTeam.name}</p>
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
                    <p style={this.pointsStyle}>{pick.topScorerPoints}<br />{pick.topScorer.name}</p>
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
                    <p style={this.pointsStyle}>{pick.mostAssistsPoints}<br />{pick.mostAssists.name}</p>
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
                    <p style={this.pointsStyle}>{pick.mostYellowsPoints}<br />{pick.mostYellows.name}</p>
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
                    <p style={this.pointsStyle}>{pick.sentOffPoints}<br />{pick.sentOff.name}</p>
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
                    <p style={this.pointsStyle}>{pick.finalMoMPoints}<br />{pick.finalMoM.name}</p>
                  }
                </Col>
                <Col xs={1} style={this.endColStyle}>
                  <p style={this.totalPointsStyle}><strong>{pick.totalPoints}</strong></p>
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
