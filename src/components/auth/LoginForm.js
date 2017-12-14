import React from 'react';

import { FormGroup, FormControl, Form, Col, Row, ControlLabel, Button } from 'react-bootstrap';

const LoginForm = ({ handleChange, handleSubmit, user, errors }) => {

  const h1Style = {
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: '40px'
  };

  const formInvalid = Object.keys(errors).some(key => errors[key]);
  return (
    <div className="container mainPageComponent">
      <Row>
        <Col sm={6} smOffset={2}>
          <h1 style={h1Style}>Login</h1>
        </Col>
      </Row>
      <Form horizontal onSubmit={handleSubmit}>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
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
          <Col componentClass={ControlLabel} sm={2}>
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
          <Col smOffset={2} sm={6}>
            <Button type="submit" disabled={formInvalid} className="btn btn-green">
              Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default LoginForm;
