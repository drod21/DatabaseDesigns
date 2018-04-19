import React from 'react';
import Login from './views/login';
import Home from './views/home';
import Items from './views/items';
import SearchResults from './views/search-results';
import Dashboard from './views/dashboard';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path='/items' component={Items} />
        <Route exact path='/results' component={SearchResults} />
        <Route exact path='/dashboard' component={Dashboard} />
      </div>
    </Router>
  )
};

export default Routes;
