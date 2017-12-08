import React from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Auth from '../../lib/Auth';

const MainNav = ({ history, username, userId }) => {

  function logout(e) {
    e.preventDefault();
    Auth.removeToken();
    history.push('/');
  }

  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer exact to="/">
            <a href="#">VINCE GRID</a>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          { Auth.isAuthenticated() &&
            <LinkContainer exact to="/leagues/new">
              <NavItem href="#">Create League</NavItem>
            </LinkContainer>
          }
          { Auth.isAuthenticated() &&
            <LinkContainer exact to="/leagues/join">
              <NavItem href="#">Join League</NavItem>
            </LinkContainer>
          }
          { Auth.isAuthenticated() &&
            <LinkContainer exact to="/leagues">
              <NavItem href="#">My Leagues</NavItem>
            </LinkContainer>
          }
          { Auth.isAuthenticated() &&
            <LinkContainer exact to={`/users/${userId}`}>
              <NavItem href="#">{username}</NavItem>
            </LinkContainer>
          }
          { Auth.isAuthenticated() &&
            <LinkContainer to="#">
              <NavItem href="#" onClick={logout}>Logout</NavItem>
            </LinkContainer>
          }
          { !Auth.isAuthenticated() &&
            <LinkContainer to="/login">
              <NavItem href="#">Login</NavItem>
            </LinkContainer>
          }
          { !Auth.isAuthenticated() &&
            <LinkContainer to="/register">
              <NavItem href="#">Register</NavItem>
            </LinkContainer>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(MainNav);
