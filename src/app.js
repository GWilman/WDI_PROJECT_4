import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap-css-only';

import MainNav from './components/utilities/MainNav';
import Routes from './components/utilities/Routes';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <MainNav />
          <main className="container">
            <Routes />
          </main>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
