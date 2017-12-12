import React from 'react';
import Axios from 'axios';
import { Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import _ from 'lodash';

import Auth from '../../lib/Auth';

// import Picker from './Picker.js';
import LiveDraft from './LiveDraft.js';
import PicksGrid from './PicksGrid.js';

class LeaguesShow extends React.Component {
  state = {
    league: null,
    isOwned: false,
    hasMadePick: false
  }

  h4Style = {
    marginTop: '30px'
  }

  componentDidMount() {
    Axios
      .get(`/api/leagues/${this.props.match.params.id}`)
      .then(res => {
        const { userId } = Auth.getPayload();
        const hasMadePick = !!res.data.picks.find(pick => pick.createdBy === userId);
        let isOwned = false;
        if (userId === res.data.createdBy.id) isOwned = true;
        this.setState({ hasMadePick, league: res.data, isOwned: isOwned });
      })
      .catch(err => console.error(err));
  }

  deleteLeague() {
    Axios
      .delete(`/api/leagues/${this.props.match.params.id}`, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/leagues'))
      .catch(err => console.error(err));
  }

  render() {
    if(!this.state.league) return null;
    return (
      <div>
        <Row>
          <Col xs={6}>
            <h1>{this.state.league.name}</h1>
            <h3>Stake: £{this.state.league.stake}</h3>
            <h3>Owner: {this.state.league.createdBy.username}</h3>
            <h3>Entry Code: {this.state.league.code}</h3>
            { this.state.isOwned &&
              <button className="btn btn-primary" onClick={this.deleteLeague.bind(this)}>Delete League</button>
            }
          </Col>
          <Col xs={6}>
            { this.state.hasMadePick &&
              <div>
                <h4 style={this.h4Style}>How to score:</h4>
                <p>1st: 25 points | 2nd: 18 points | 3rd: 15 points | 4th: 10 points | 5th: 5 points | 6th: 0 points</p>
                <p>In the event of a tie, the sum of the position scores is divided by the number of players in a tie.</p>
                <p>
                  Tie examples:<br />
                  In a two-way tie for second place, each player will score 16.5 points<br />
                  (18 + 15 / 2)<br />
                  In a three-way tie for third, each player will score 10 points<br />
                  (15 + 10 + 5 / 3).
                </p>
              </div>
            }
          </Col>
        </Row>
        { !this.state.hasMadePick ? (
          // <Picker />
          <LiveDraft />
        ) : (
          <PicksGrid />
        )}
      </div>
    );
  }

}

export default LeaguesShow;
