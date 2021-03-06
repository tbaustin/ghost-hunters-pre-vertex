import React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import { Home, PostLayout, ProfileLayout, UsersLayout, MapLayout } from './components/layout';

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
      <Route path="/users" component={UsersLayout} />
      <Route path="/map" component={MapLayout} />
      <Route path="/profile/:id" component={ProfileLayout} />
      <Route path="/post/:id" component={PostLayout} />
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default routes;
