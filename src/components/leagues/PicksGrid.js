import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Grid, Row, Col } from 'react-bootstrap';

class PicksGrid extends React.Component {
  state = {
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

  componentDidMount() {
    Axios
      .get('/api/picks', {
        params: { league: this.props.match.params.id }
      })
      .then(res => {
        this.setState({ picks: res.data }, () => console.log(this.state.picks));
      })
      .catch(err => console.error(err));
  }


  render() {
    return (
      <div>
        <h1>The Grid</h1>
        <Grid style={this.gridStyle}>
          <Row style={this.rowStyle}>
            <Col sm={2} style={this.colStyle}>
              <p style={this.pStyle}></p>
            </Col>
            <Col sm={1} style={this.colStyle}>
              <p style={this.pStyle}><strong>Champion</strong></p>
            </Col>
            <Col sm={1} style={this.colStyle}>
              <p style={this.pStyle}><strong>Runner Up</strong></p>
            </Col>
            <Col sm={1} style={this.colStyle}>
              <p style={this.pStyle}><strong>Top Scoring Team</strong></p>
            </Col>
            <Col sm={1} style={this.colStyle}>
              <p style={this.pStyle}><strong>Most Yellows (Team)</strong></p>
            </Col>
            <Col sm={1} style={this.colStyle}>
              <p style={this.pStyle}><strong>Top Scorer</strong></p>
            </Col>
            <Col sm={1} style={this.colStyle}>
              <p style={this.pStyle}><strong>Most Assists</strong></p>
            </Col>
            <Col sm={1} style={this.colStyle}>
              <p style={this.pStyle}><strong>Most Yellows</strong></p>
            </Col>
            <Col sm={1} style={this.colStyle}>
              <p style={this.pStyle}><strong>Sent Off</strong></p>
            </Col>
            <Col sm={1} style={this.colStyle}>
              <p style={this.pStyle}><strong>MoM (Final)</strong></p>
            </Col>
            <Col sm={1} style={this.endColStyle}>
              <p style={this.pStyle}><strong>Points</strong></p>
            </Col>
          </Row>
          { this.state.picks.map(pick => {
            return (<Row key={pick.id} style={this.rowStyle}>
              <Col sm={2} style={this.colStyle}>
                <p style={this.usernameStyle}>{pick.createdBy.username}</p>
              </Col>
              <Col sm={1} style={this.colStyle}>
                <p style={this.pStyle}>{pick.champion.name}</p>
              </Col>
              <Col sm={1} style={this.colStyle}>
                <p style={this.pStyle}>{pick.runnerUp.name}</p>
              </Col>
              <Col sm={1} style={this.colStyle}>
                <p style={this.pStyle}>{pick.topScoringTeam.name}</p>
              </Col>
              <Col sm={1} style={this.colStyle}>
                <p style={this.pStyle}>{pick.mostYellowsTeam.name}</p>
              </Col>
              <Col sm={1} style={this.colStyle}>
                <p style={this.pStyle}>{pick.topScorer.name}</p>
              </Col>
              <Col sm={1} style={this.colStyle}>
                <p style={this.pStyle}>{pick.mostAssists.name}</p>
              </Col>
              <Col sm={1} style={this.colStyle}>
                <p style={this.pStyle}>{pick.mostYellows.name}</p>
              </Col>
              <Col sm={1} style={this.colStyle}>
                <p style={this.pStyle}>{pick.sentOff.name}</p>
              </Col>
              <Col sm={1} style={this.colStyle}>
                <p style={this.pStyle}>{pick.finalMoM.name}</p>
              </Col>
              <Col sm={1} style={this.endColStyle}>
                <p style={this.pStyle}></p>
              </Col>
            </Row>);
          })}
        </Grid>
      </div>
    );
  }

}

export default withRouter(PicksGrid);
