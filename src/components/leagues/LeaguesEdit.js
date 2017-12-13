import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import LeaguesForm from './LeaguesForm';

class LeaguesEdit extends React.Component {
  state = {
    league: {
      name: '',
      stake: '',
      startTime: null,
      code: null
    },
    user: {},
    errors: {}
  };

  componentDidMount() {
    Axios
      .get(`/api/leagues/${this.props.match.params.id}`)
      .then(res => this.setState({
        league: {
          name: res.data.name,
          stake: res.data.stake,
          startTime: res.data.startTime,
          code: res.data.code
        }
      }))
      .catch(err => console.error(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const league = Object.assign({}, this.state.league, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ league, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/leagues/${this.props.match.params.id}`, this.state.league, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push(`/leagues/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));

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

export default LeaguesEdit;
