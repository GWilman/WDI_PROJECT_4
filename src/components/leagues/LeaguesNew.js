import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import LeaguesForm from './LeaguesForm';

class LeaguesNew extends React.Component {
  state = {
    league: {
      name: '',
      stake: '',
      startTime: null,
      code: null
    },
    user: {},
    errors: {},
    title: 'Create League'
  };

  componentDidMount() {
    const { userId } = Auth.getPayload();
    Axios
      .get(`/api/users/${userId}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.error(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const league = Object.assign({}, this.state.league, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ league, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const code = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    const league = Object.assign({}, this.state.league, { code: parseInt(code) });

    Axios
      .post('/api/leagues', league, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(league => {

        const leagues = this.state.user.leagues.concat(league.data.id);
        const user = Object.assign({}, this.state.user, { leagues });

        Axios
          .put(`/api/users/${this.state.user.id}`, user)
          .then(() => {
            this.props.history.push(`/leagues/${league.data.id}`);
          });
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));

  }

  render() {
    return (
      <LeaguesForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        league={this.state.league}
        errors={this.state.errors}
        title={this.state.title}
      />
    );
  }
}

export default LeaguesNew;
