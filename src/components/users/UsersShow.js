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

  homeStyle = {
    backgroundImage: 'url(https://i.imgur.com/j3OqQRl.jpg)',
    minHeight: 'calc(100vh - 53px)',
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat'
  }

  imgStyle = {
    borderRadius: '100%',
    margin: '20px auto 0',
    width: '250px',
    height: '250px',
    border: '4px solid #fff',
    display: 'block'
  }

  leagueContainer = {
    background: '#fff',
    border: '1px solid gray',
    boxShadow: '0 0 4px black',
    padding: '20px',
    marginBottom: '10px',
    marginTop: '20px',
    borderRadius: '10px',
    textAlign: 'center'
  }

  white = {
    color: '#fff',
    textAlign: 'center'
  }

  btnStyle = {
    margin: '10px'
  }

  btnContainer = {
    textAlign: 'center'
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
        this.props.history.push(`/users/${this.state.user.id}`);
        this.setState({ open: false, passwordOpen: false });
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    if(!this.state.user.leagues) return null;
    return (
      <div style={this.homeStyle}>
        <div className="container mainPageComponent">
          <Row>
            <Col xs={12} sm={6}>
              { this.state.user.image ? <img style={this.imgStyle} src={this.state.user.image} /> : <img style={this.imgStyle} src="https://myspace.com/common/images/user.png" />}
              <h1 style={this.white}>{this.state.user.username}</h1>
              <h4 style={this.white}>{this.state.user.email}</h4>
              <div style={this.btnContainer}>
                <Button className="btn btn-blue" style={this.btnStyle} onClick={() => {
                  this.setState({ open: !this.state.open, passwordOpen: false });
                }
                }>
                  Edit Profile
                </Button>
                <Button className="btn btn-blue" style={this.btnStyle} onClick={() => {
                  this.setState({ passwordOpen: !this.state.passwordOpen, open: false });
                }
                }>
                  Change Password
                </Button>
              </div>
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

            <Col xs={12} sm={6}>
              <div style={this.leagueContainer}>
                <h4>MY LEAGUES:</h4>
                { this.state.user.leagues.map(league =>
                  <p key={league.id}>
                    <Link to={`/leagues/${league.id}`}>{league.name}</Link>
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default UsersShow;
