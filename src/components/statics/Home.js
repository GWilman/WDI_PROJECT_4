import React from 'react';
// import Background from '../../images/home.jpg';

const Home = () => {

  const homeStyle = {
    backgroundImage: 'url(https://i.imgur.com/KUsFPXg.jpg)',
    height: '100vh',
    width: '100%',
    backgroundPosition: 'cover',
    backgroundRepeat: 'noRepeat'
  };

  const h1Style = {
    margin: '0',
    textAlign: 'center',
    fontSize: '60px'
  };

  const divStyle = {
    padding: '80px 0'
  };

  const contentContainer = {
    padding: '20px',
    background: 'rgba(12, 235, 169, 0.5)',
    width: '60%',
    margin: '0 auto'
  };

  return (
    <div style={homeStyle}>
      <div className="container" style={divStyle}>
        {/* <div style={contentContainer}>
          <h1 style={h1Style}>The Vince Grid</h1>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
