import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Grid, Row, Col } from 'react-bootstrap';

class PicksGrid extends React.Component {
  state = {
    picks: []
  }

  componentDidMount() {
    Axios
      .get('/api/picks', {
        params: { league: this.props.match.params.id }
      })
      .then(res => {
        this.setState({ picks: res.data });
      })
      .catch(err => console.error(err));
  }


  render() {
    return (
      <div>
        <h1>The Grid</h1>
        <Grid>
          <Row>
            <Col sm={1}>
              <p></p>
            </Col>
            <Col sm={1}>
              <p>Champion</p>
            </Col>
            <Col sm={1}>
              <p>Runner Up</p>
            </Col>
            <Col sm={1}>
              <p>Top Scoring Team</p>
            </Col>
            <Col sm={1}>
              <p>Most Yellows (Team)</p>
            </Col>
            <Col sm={1}>
              <p>Top Scorer</p>
            </Col>
            <Col sm={1}>
              <p>Most Assists</p>
            </Col>
            <Col sm={1}>
              <p>Most Yellows</p>
            </Col>
            <Col sm={1}>
              <p>Sent Off</p>
            </Col>
            <Col sm={1}>
              <p>Man of the Match (Final)</p>
            </Col>
            <Col sm={1}>
              <p>Points</p>
            </Col>
          </Row>
          { this.state.picks.map(pick => {
            return (<Row key={pick.id}>
              <Col sm={1}>
                <p>{pick.createdBy.username}</p>
              </Col>
              <Col sm={1}>
                <p>{pick.champion.name}</p>
              </Col>
              <Col sm={1}>
                <p>{pick.runnerUp.name}</p>
              </Col>
              <Col sm={1}>
                <p>{pick.topScoringTeam.name}</p>
              </Col>
              <Col sm={1}>
                <p>{pick.mostYellowsTeam.name}</p>
              </Col>
              <Col sm={1}>
                <p>{pick.topScorer.name}</p>
              </Col>
              <Col sm={1}>
                <p>{pick.mostAssists.name}</p>
              </Col>
              <Col sm={1}>
                <p>{pick.mostYellows.name}</p>
              </Col>
              <Col sm={1}>
                <p>{pick.sentOff.name}</p>
              </Col>
              <Col sm={1}>
                <p>{pick.finalMoM.name}</p>
              </Col>
              <Col sm={1}>
                <p></p>
              </Col>
            </Row>);
          })}
        </Grid>
      </div>
    );
  }

}

export default withRouter(PicksGrid);
