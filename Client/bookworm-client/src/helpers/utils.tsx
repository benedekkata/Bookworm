import { useEffect, useState } from "react";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import { isAuthenticated as isAuthenticatedCheck } from "../services/AuthenticationService";

export class UnauthorizedError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  getMessage() {
    return this.message;
  }
}

export class BadRequestError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  getMessage() {
    return this.message;
  }
}

export const PrivateRoute = () => {
  const [isAuthenticated, setAuthenticated] = useState(true);
  useEffect(() => {
    isAuthenticatedCheck().then(setAuthenticated);
  }, []);
  if (!isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
