import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Form } from 'react-bootstrap';

class LiveDraft extends React.Component {
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
        this.setState({ picks: res.data });
      })
      .catch(err => console.error(err));
  }

  // handleChange = (value, name, type) => {
  //   if(!value) return false;
  //   const { teams, players } = this.state;
  //   if(type === 'team') {
  //     value = teams.find(team => team.name === value).id;
  //   } else {
  //     value = players.find(player => player.name === value).id;
  //   }
  //
  //   const picks = Object.assign({}, this.state.picks, { [name]: value });
  //   this.setState({ picks });
  // }
  //
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
            { this.state.picks.map(pick => {
              return (<Row key={pick.id} style={this.rowStyle}>
                <Col xs={3} style={this.colStyle}>
                  <p style={this.usernameStyle}>{pick.createdBy.username}</p>
                </Col>
                <Col xs={1} style={this.colStyle}>

                </Col>
                <Col xs={1} style={this.colStyle}>

                </Col>
                <Col xs={1} style={this.colStyle}>

                </Col>
                <Col xs={1} style={this.colStyle}>

                </Col>
                <Col xs={1} style={this.colStyle}>

                </Col>
                <Col xs={1} style={this.colStyle}>

                </Col>
                <Col xs={1} style={this.colStyle}>

                </Col>
                <Col xs={1} style={this.colStyle}>

                </Col>
                <Col xs={1} style={this.endColStyle}>

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
