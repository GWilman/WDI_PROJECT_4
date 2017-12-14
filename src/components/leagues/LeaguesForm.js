import React from 'react';
import { FormGroup, FormControl, Form, Col, Row, ControlLabel, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';

import '../../scss/datetime.scss';


const LeaguesForm = ({ handleChange, handleSubmit, league, errors, title }) => {

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
          <h1 style={h1Style}>{title}</h1>
        </Col>
      </Row>
      <Form horizontal onSubmit={handleSubmit}>
        <FormGroup controlId="formHorizontalLeagueName">
          <Col componentClass={ControlLabel} sm={2}>
            League Name
          </Col>
          <Col sm={6}>
            <FormControl
              type="text"
              name="name"
              onChange={handleChange}
              value={league.name}
            />
            { errors.name && <small className="red">{errors.name}</small> }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalStake">
          <Col componentClass={ControlLabel} sm={2}>
            Stake (£)
          </Col>
          <Col sm={6}>
            <FormControl
              type="number"
              name="stake"
              onChange={handleChange}
              value={league.stake}
            />
            { errors.stake && <small className="red">{errors.stake}</small> }
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalTime">
          <Col componentClass={ControlLabel} sm={2}>
            Time of Draft
          </Col>
          <Col sm={6}>
            <Datetime
              type="datetime"
              name="startTime"
              onChange={(value) => handleChange({ target: { name: 'startTime', value }})}
              value={league.startTime}
            />
            { errors.stake && <small className="red">{errors.startTime}</small> }
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={6}>
            <Button type="submit" disabled={formInvalid} className="btn btn-blue">
              {title}
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default LeaguesForm;
