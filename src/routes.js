import React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import { Home } from './components/layout';

const Status = ({ code, children }) => {
  return (
    <Route
      render={({ staticConent }) => {
        if (staticConent) staticConent.status = code;
        return children;
      }}
    />
  );
};

const NotFound = () => {
  return (
    <Status code={404}>
      <div>
        <h2>Sorry, can't find this page</h2>
      </div>
    </Status>
  );
};

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default routes;
