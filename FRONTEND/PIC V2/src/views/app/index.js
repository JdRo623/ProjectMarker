import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";

const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ "./gogo")
);
const SecondMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ "./second-menu")
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./blank-page")
);

const Profile = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./profile")
);

const Pic = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./pic")
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/pic`} />
              <Route
                path={`${match.url}/pic`}
                render={(props) => <Pic {...props} />}
              />
              <Route
                path={`${match.url}/pic`}
                render={(props) => <Pic {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
