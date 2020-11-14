import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./app.routes";
import nProgress from "nprogress";

const RouteFallback = () => {
  useEffect(() => {
    nProgress.start();
    return () => {
      nProgress.done();
      nProgress.remove();
    };
  }, []);
  return null;
};

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<RouteFallback />}>
          {Object.entries(routes).map(([routeKey, routeConfig]) => {
            return <Route key={routeKey} {...routeConfig} />;
          })}
        </Suspense>
      </Switch>
    </Router>
  );
};

export default AppRouter;
