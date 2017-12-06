import React from 'react';

import { FormGroup, FormControl, Form, Col, Row, ControlLabel, Button } from 'react-bootstrap';

const LeaguesForm = ({ handleChange, handleSubmit, league, errors }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);
  return (
    <div>
      <Row>
        <Col sm={10} smOffset={2}>
          <h1>Create League</h1>
        </Col>
      </Row>
      <Form horizontal onSubmit={handleSubmit}>
        <FormGroup controlId="formHorizontalLeagueName">
          <Col componentClass={ControlLabel} sm={2}>
            League Name
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              name="name"
              placeholder="League Name"
              onChange={handleChange}
              value={league.name}
            />
            { errors.name && <small>{errors.name}</small> }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalStake">
          <Col componentClass={ControlLabel} sm={2}>
            Stake (£)
          </Col>
          <Col sm={10}>
            <FormControl
              type="number"
              name="stake"
              placeholder="Stake"
              onChange={handleChange}
              value={league.stake}
            />
            { errors.stake && <small>{errors.stake}</small> }
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" disabled={formInvalid}>
              Create League
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default LeaguesForm;
