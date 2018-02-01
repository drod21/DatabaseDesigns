import React from 'react';
import App from './containers/AppContainer';
import About from './views/About';
import Anthony from './views/Anthony';
import Home from './views/home';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/anthony" component={Anthony}/>
      </div>
    </Router>
  )
};

export default Routes;
