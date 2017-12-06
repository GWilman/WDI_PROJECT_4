import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Auth from '../../lib/Auth';

const MainNav = ({ history }) => {

  function logout(e) {
    e.preventDefault();
    Auth.removeToken();
    history.push('/');
  }

  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">VINCE GRID</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          { Auth.isAuthenticated() &&
            <NavItem href="#">
              <Link to="/leagues/new">Create League</Link>
            </NavItem>
          }
          { Auth.isAuthenticated() &&
            <NavItem href="#">
              <Link to="/leagues">My Leagues</Link>
            </NavItem>
          }
          { Auth.isAuthenticated() &&
            <NavItem href="#">
              <a href="#" onClick={logout}>Logout</a>
            </NavItem>
          }
          { !Auth.isAuthenticated() &&
            <NavItem href="#">
              <Link to="/login">Login</Link>
            </NavItem>
          }
          { !Auth.isAuthenticated() &&
            <NavItem href="#">
              <Link to="/register">Register</Link>
            </NavItem>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(MainNav);
