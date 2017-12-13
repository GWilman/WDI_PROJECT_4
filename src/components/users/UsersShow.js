import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Collapse, Button, Row, Col } from 'react-bootstrap';

import Auth from '../../lib/Auth';

import UsersEditForm from './UsersEditForm';
import PasswordChangeForm from './PasswordChangeForm';

class UsersShow extends React.Component {
  state = {
    user: {},
    errors: {}
  }

  imgStyle = {
    borderRadius: '100%',
    margin: '0 auto'
  }

  componentDidMount() {
    const { userId } = Auth.getPayload();
    Axios
      .get(`/api/users/${userId}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.error(err));
  }

  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ user, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/users/${this.state.user.id}`, this.state.user)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    if(!this.state.user.leagues) return null;
    return (
      <div className="container mainPageComponent">
        <Row>
          <Col sm={6}>
            <img style={this.imgStyle} src={this.state.user.image} />
            <h1>{this.state.user.username}</h1>
            <h4>{this.state.user.email}</h4>
            <h4>Leagues:</h4>
            { this.state.user.leagues.map(league =>
              <p key={league.id}>
                <Link to={`/leagues/${league.id}`}>{league.name}</Link>
              </p>
            )}
          </Col>

          <Col sm={6}>
            <Button onClick={() => {
              this.setState({ open: !this.state.open, passwordOpen: false });
            }
            }>
              Edit Profile
            </Button>
            <Button onClick={() => {
              this.setState({ passwordOpen: !this.state.passwordOpen, open: false });
            }
            }>
              Change Password
            </Button>
            <Collapse in={this.state.open}>
              <div>
                <UsersEditForm
                  user={this.state.user}
                  errors={this.state.errors}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
              </div>
            </Collapse>
            <Collapse in={this.state.passwordOpen}>
              <div>
                <PasswordChangeForm
                  user={this.state.user}
                  errors={this.state.errors}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
              </div>
            </Collapse>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UsersShow;
