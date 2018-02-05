import React from 'react';
import About from './views/About';
import Login from './views/login';
import Home from './views/home';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login}/>
      </div>
    </Router>
  )
};

export default Routes;
