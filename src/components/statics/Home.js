import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const Home = () => {

  const homeStyle = {
    backgroundImage: 'url(https://i.imgur.com/KUsFPXg.jpg)',
    height: '100vh',
    width: '100%',
    backgroundPosition: 'cover',
    backgroundRepeat: 'noRepeat'
  };

  const h1Style = {
    margin: '0 0 20px 0',
    textAlign: 'center',
    fontSize: '60px',
    textTransform: 'uppercase'
  };

  const pStyle = {
    textAlign: 'center',
    fontSize: '20px'
  };

  const btnStyle = {
    textAlign: 'center',
    margin: '16px auto 0',
    display: 'block',
    width: '30%'
  };

  const divStyle = {
    padding: '80px 0'
  };

  const btnContainer = {
    marginTop: '20px'
  };

  const contentContainer = {
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.8)',
    width: '60%',
    margin: '0 auto',
    borderRadius: '10px'
  };

  return (
    <div style={homeStyle}>
      <div className="container" style={divStyle}>
        <div style={contentContainer}>
          <h1 style={h1Style}>The Vince Grid</h1>
          <p style={pStyle}>Welcome to the Vince Grid. The <strong>Champions League Knockout Stages</strong> are upon us, so it&apos;s time to test your sporting knowledge against your friends by creating a league, picking your winners for each category in a <strong>live draft</strong> and watching the scores come in.</p>
          <p style={pStyle}>Set your stake for a winner-takes-all tournament, or if you&apos;re feeling frugal, just play for pride.</p>
          <div style={btnContainer}>
            <LinkContainer to={'/login'} style={btnStyle}><button className="btn btn-green">Login</button></LinkContainer>
            <LinkContainer to={'/register'} style={btnStyle}><button className="btn btn-green">Register</button></LinkContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
