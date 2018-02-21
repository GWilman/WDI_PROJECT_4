import React from 'react';
import { FormGroup, FormControl, Form, Col, Row, ControlLabel, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';

import '../../scss/datetime.scss';


const LeaguesForm = ({ handleChange, handleSubmit, league, errors, title }) => {

  const homeStyle = {
    backgroundImage: 'url(https://i.imgur.com/j3OqQRl.jpg)',
    minHeight: 'calc(100vh - 52px)',
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
            <h1 style={h1Style}>{title}</h1>
          </Col>
        </Row>
        <Form horizontal onSubmit={handleSubmit}>
          <FormGroup controlId="formHorizontalLeagueName">
            <Col componentClass={ControlLabel} style={labelStyle} sm={3}>
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
            <Col componentClass={ControlLabel} style={labelStyle} sm={3}>
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
            <Col componentClass={ControlLabel} style={labelStyle} sm={3}>
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
            <Col smOffset={3} sm={6}>
              <Button type="submit" disabled={formInvalid} className="btn btn-blue">
                {title}
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default LeaguesForm;
