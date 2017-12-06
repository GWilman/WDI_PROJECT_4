import React from 'react';

import { FormGroup, FormControl, Form, Col, Row, ControlLabel, Button } from 'react-bootstrap';

const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);
  return (
    <div>
      <Row>
        <Col sm={10} smOffset={2}>
          <h1>Register</h1>
        </Col>
      </Row>
      <Form horizontal onSubmit={handleSubmit}>
        <FormGroup controlId="formHorizontalUsername">
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={user.username}
            />
            { errors.username && <small>{errors.username}</small> }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={user.email}
            />
            { errors.email && <small>{errors.email}</small> }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalImage">
          <Col componentClass={ControlLabel} sm={2}>
            Image
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              name="image"
              placeholder="Image url (e.g. https://i.imgur.com/bbyE9MB.jpg)"
              onChange={handleChange}
              value={user.image}
            />
          </Col>
          { errors.image && <small>{errors.image}</small> }
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={user.password}
            />
            { errors.password && <small>{errors.password}</small> }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPasswordConfirmation">
          <Col componentClass={ControlLabel} sm={2}>
            Password Confirmation
          </Col>
          <Col sm={10}>
            <FormControl
              type="password"
              name="passwordConfirmation"
              placeholder="Password Confirmation"
              onChange={handleChange}
              value={user.passwordConfirmation}
            />
            { errors.passwordConfirmation && <small>{errors.passwordConfirmation}</small> }
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" disabled={formInvalid}>
              Create Account
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default RegisterForm;
