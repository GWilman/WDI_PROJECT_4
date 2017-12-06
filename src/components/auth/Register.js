import React        from 'react';
import RegisterForm from './RegisterForm';
import Axios        from 'axios';

import Auth from '../../lib/Auth';

class Register extends React.Component {
  state = {
    user: {
      username: '',
      email: '',
      image: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  };

  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ user, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/register', this.state.user)
      .then(res => {
        Auth.setToken(res.data.token);
        this.props.history.push('/');
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <RegisterForm
        user={this.state.user}
        errors={this.state.errors}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Register;
