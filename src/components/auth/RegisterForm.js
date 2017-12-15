import React from 'react';

import { FormGroup, FormControl, Form, Col, Row, ControlLabel, Button } from 'react-bootstrap';

const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {

  const homeStyle = {
    backgroundImage: 'url(https://i.imgur.com/j3OqQRl.jpg)',
    minHeight: 'calc(100vh - 53px)',
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat'
  };

  const h1Style = {
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: '40px',
    color: '#fff'
  };

  const labelStyle = {
    color: '#fff'
  };

  const formInvalid = Object.keys(errors).some(key => errors[key]);
  return (
    <div style={homeStyle}>
      <div className="container mainPageComponent">
        <Row>
          <Col sm={6} smOffset={3}>
            <h1 style={h1Style}>Register</h1>
          </Col>
        </Row>
        <Form horizontal onSubmit={handleSubmit}>
          <FormGroup controlId="formHorizontalUsername">
            <Col componentClass={ControlLabel} style={labelStyle} sm={3}>
              Username
            </Col>
            <Col sm={6}>
              <FormControl
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={user.username}
              />
              { errors.username && <p><small className="red">{errors.username}</small></p> }
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} style={labelStyle} sm={3}>
              Email
            </Col>
            <Col sm={6}>
              <FormControl
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={user.email}
              />
              { errors.email && <small className="red">{errors.email}</small> }
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalImage">
            <Col componentClass={ControlLabel} style={labelStyle} sm={3}>
              Image
            </Col>
            <Col sm={6}>
              <FormControl
                type="text"
                name="image"
                placeholder="Image url (e.g. https://i.imgur.com/bbyE9MB.jpg)"
                onChange={handleChange}
                value={user.image}
              />
            </Col>
            { errors.image && <small className="red">{errors.image}</small> }
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} style={labelStyle} sm={3}>
              Password
            </Col>
            <Col sm={6}>
              <FormControl
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
              />
              { errors.password && <small className="red">{errors.password}</small> }
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPasswordConfirmation">
            <Col componentClass={ControlLabel} style={labelStyle} sm={3}>
              Password Confirmation
            </Col>
            <Col sm={6}>
              <FormControl
                type="password"
                name="passwordConfirmation"
                placeholder="Password Confirmation"
                onChange={handleChange}
                value={user.passwordConfirmation}
              />
              { errors.passwordConfirmation && <small className="red">{errors.passwordConfirmation}</small> }
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={3} sm={6}>
              <Button type="submit" disabled={formInvalid} className="btn btn-green">
                Create Account
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
