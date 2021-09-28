import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, children, redirect, auth, ...rest }) {
  return (
		<Route {...rest} render={() =>
			auth() ? children || <Component /> : <Redirect to={{ pathname: redirect }} />
		} />
	);
}