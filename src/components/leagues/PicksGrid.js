import React from 'react';
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import Auth from '../../lib/Auth';

class PicksGrid extends React.Component {
  state = {
    picks: [],
    isOwned: false
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


  render() {
    const orderedPicks = _.orderBy(this.state.picks, ['totalPoints'], ['desc']);
    return (
      <div>
        <h1>The Grid</h1>
        { this.state.isOwned &&
          <Link to={`/leagues/${this.props.match.params.id}/scores`}>
            <button className="btn btn-primary">Update Scores</button>
          </Link>
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
                <p>{pick.championPoints}<br />{pick.champion.name}</p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p>{pick.runnerUpPoints}<br />{pick.runnerUp.name}</p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p>{pick.topScoringTeamPoints}<br />{pick.topScoringTeam.name}</p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p>{pick.mostYellowsTeamPoints}<br />{pick.mostYellowsTeam.name}</p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p>{pick.topScorerPoints}<br />{pick.topScorer.name}</p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p>{pick.mostAssistsPoints}<br />{pick.mostAssists.name}</p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p>{pick.mostYellowsPoints}<br />{pick.mostYellows.name}</p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p>{pick.sentOffPoints}<br />{pick.sentOff.name}</p>
              </Col>
              <Col xs={1} style={this.colStyle}>
                <p>{pick.finalMoMPoints}<br />{pick.finalMoM.name}</p>
              </Col>
              <Col xs={1} style={this.endColStyle}>
                <p><strong>{pick.totalPoints}</strong></p>
              </Col>
            </Row>);
          })}
        </Grid>
      </div>
    );
  }

}

export default withRouter(PicksGrid);
