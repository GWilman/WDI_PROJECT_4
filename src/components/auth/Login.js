import React     from 'react';
import LoginForm from './LoginForm';
import Axios     from 'axios';

import Auth from '../../lib/Auth';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {}
  };

  handleChange = ({ target: { name, value } }) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    const errors = Object.assign({}, { errors: '' });
    this.setState({ user, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/login', this.state.user)
      .then(res => {
        Auth.setToken(res.data.token);
        this.props.setUser(res.data.user);
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ errors: err.response.data });
      });
  }

  render() {
    return (
      <LoginForm
        user={this.state.user}
        errors={this.state.errors}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Login;
