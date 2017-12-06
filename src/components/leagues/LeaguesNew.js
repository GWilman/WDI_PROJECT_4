import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import LeaguesForm from './LeaguesForm';

class LeaguesNew extends React.Component {
  state = {
    league: {
      name: '',
      stake: ''
    },
    errors: {}
  };

  handleChange = ({ target: { name, value } }) => {
    const league = Object.assign({}, this.state.league, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ league, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/leagues', this.state.league, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/'))
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  }

  render() {
    return (
      <LeaguesForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        league={this.state.league}
        errors={this.state.errors}
      />
    );
  }
}

export default LeaguesNew;
