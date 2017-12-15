import React from 'react';

import { FormGroup, FormControl, Form, Col, ControlLabel, Button } from 'react-bootstrap';

const UsersEditForm = ({ handleChange, handleSubmit, user, errors }) => {

  const formStyle = {
    marginTop: '20px'
  };

  const white = {
    color: '#fff'
  };

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <div>
      <Form horizontal onSubmit={handleSubmit} style={formStyle}>
        <FormGroup controlId="formHorizontalUsername">
          <Col componentClass={ControlLabel} sm={2} style={white}>
            Username
          </Col>
          <Col sm={9}>
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
          <Col componentClass={ControlLabel} sm={2} style={white}>
            Email
          </Col>
          <Col sm={9}>
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
          <Col componentClass={ControlLabel} sm={2} style={white}>
            Image
          </Col>
          <Col sm={9}>
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

        <FormGroup>
          <Col smOffset={2} sm={9}>
            <Button type="submit" disabled={formInvalid} className="btn btn-green">
              Save Changes
            </Button>
          </Col>
        </FormGroup>

      </Form>
    </div>
  );
};

export default UsersEditForm;
