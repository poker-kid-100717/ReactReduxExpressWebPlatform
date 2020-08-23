import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Pages from './pages';

const Routes = () => {
  
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to={_routes.receiptFinder} />
      </Route>
      <Route
        path={_routes.login}
        component={Pages.Login}
        exact
      />
      <Route
        path={_routes.forgotPassword}
        component={Pages.ForgotPassword}
        exact
      />
      <Route
        path={_routes.receiptFinder}
        component={Pages.ReceiptFinder}
        exact
      />
      <Route
        path={_routes.resetPassword}
        component={Pages.ResetPassword}
      />
      <Route
        path={_routes.emailSent}
        component={Pages.EmailSent}
        exact
      />
    </Switch>
  )
}

export default Routes;
