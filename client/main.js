import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.js';
import AppContainer from '../imports/ui/AppContainer.js';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});

const browserHistory = createBrowserHistory();

// route components
export const renderRoutes = () => (
    <Router history={browserHistory}>
      <div>
        <Route exact path="/" component={AppContainer}/>
      </div>
    </Router>
);