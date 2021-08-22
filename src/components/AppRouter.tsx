import { Switch, Route, Redirect } from "react-router-dom"
import { Context } from "..";
import { CHAT_ROUTE, LOGIN_ROUTE, privateRoutes, publicRoutes } from "./routes";
import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export const AppRouter = () => {
  const { auth } = useContext<any>(Context);
  const [user] = useAuthState(auth);

  return user ?
    (
      <Switch>
        {privateRoutes.map(({ path, component }) =>
          <Route key={path} path={path} component={component} />
        )}
        <Redirect to={CHAT_ROUTE} />
      </Switch>
    ) : (
      <Switch>
        {publicRoutes.map(({ path, component }) =>
          <Route key={path} path={path} component={component} />
        )}
        <Redirect to={LOGIN_ROUTE} />
      </Switch>
    )
};