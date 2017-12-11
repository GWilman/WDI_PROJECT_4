import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Axios from 'axios';

import 'bootstrap-css-only';

import Auth from './lib/Auth';

import MainNav from './components/utilities/MainNav';
import Routes from './components/utilities/Routes';

class App extends React.Component {
  state = {
    user: {}
  }

  componentDidMount() {
    const { userId } = Auth.getPayload();
    Axios
      .get(`/api/users/${userId}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.error(err));
  }

  navImage = {
    height: '20px',
    width: '20px',
    borderRadius: '100%'
  }

  render() {
    return (
      <Router>
        <div>
          { this.state.user.username &&
            <MainNav
              username={this.state.user.username}
              userId={this.state.user.id}
              image={this.state.user.image}
              navImage={this.navImage}
            />
          }
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
