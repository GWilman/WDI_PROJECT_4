import React from 'react';

import { FormGroup, FormControl, Form, Col, ControlLabel, Button, HelpBlock } from 'react-bootstrap';

const RegisterForm = ({ handleChange, handleSubmit, user }) => {
  return (
    <div>
      <h1>Register</h1>
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
            <HelpBlock>Please provide an image url (optional)</HelpBlock>
          </Col>
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
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">
              Create Account
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default RegisterForm;
