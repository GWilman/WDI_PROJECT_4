import React from 'react';

import { FormGroup, FormControl, Form, Col, Row, ControlLabel, Button } from 'react-bootstrap';

const LoginForm = ({ handleChange, handleSubmit, user, errors }) => {

  const homeStyle = {
    backgroundImage: 'url(https://i.imgur.com/j3OqQRl.jpg)',
    height: '100vh',
    width: '100%',
    backgroundPosition: 'cover',
    backgroundRepeat: 'noRepeat'
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
            <h1 style={h1Style}>Login</h1>
          </Col>
        </Row>
        <Form horizontal onSubmit={handleSubmit}>
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
            </Col>
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
              { errors.message && <small className="red">{errors.message}</small> }
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={3} sm={6}>
              <Button type="submit" disabled={formInvalid} className="btn btn-green">
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
