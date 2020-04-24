import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Cuestionario = React.lazy(() =>
  import(/* webpackChunkName: "cuestionario" */ './cuestionario')
);


const PagesPic = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/cuestionario`} />
      <Route
        path={`${match.url}/cuestionario`}
        render={props => <Cuestionario {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PagesPic;
