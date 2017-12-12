import React from 'react';

import { FormGroup, FormControl, Form, Col, ControlLabel, Button } from 'react-bootstrap';

const UsersEditForm = ({ handleChange, handleSubmit, user, errors }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);
  return (
    <div>
      <Form horizontal onSubmit={handleSubmit}>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={3}>
            New Password
          </Col>
          <Col sm={9}>
            <FormControl
              type="password"
              name="password"
              placeholder="New Password"
              onChange={handleChange}
              value={user.password}
            />
            { errors.password && <small className="red">{errors.password}</small> }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPasswordConfirmation">
          <Col componentClass={ControlLabel} sm={3}>
            Password Confirmation
          </Col>
          <Col sm={9}>
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
          <Col smOffset={3} sm={9}>
            <Button type="submit" disabled={formInvalid}>
              Save Changes
            </Button>
          </Col>
        </FormGroup>

      </Form>
    </div>
  );
};

export default UsersEditForm;
