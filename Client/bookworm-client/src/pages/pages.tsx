import React, { useEffect, useState } from "react";
import Home from "../containers/HomeComponent";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import BookDetailedView from "../layouts/BookDetailedView";
import Login from "../containers/Login";
import Register from "../containers/Register";
import PageNotFound from "../components/PageNotFound";

export const HomePage = () => {
  return <Home></Home>;
};

export const UsersPage = () => {
  return <div>USERS</div>;
};

export const MyPagePage = () => {
  return <div>MYPAGE</div>;
};

export const BookDetailPage = () => {
  return <BookDetailedView></BookDetailedView>;
};

export const LoginPage = (props: { setAuthenticated: Function }) => {
  return <Login setAuthenticated={props.setAuthenticated} />;
};

export const ResisterPage = (props: { setAuthenticated: Function }) => {
  return <Register setAuthenticated={props.setAuthenticated} />;
};

export const RequireAuth = (props: { isAuthenticated: Boolean }) => {
  const location = useLocation();

  return props.isAuthenticated === false ? (
    <Navigate to="/login" replace state={{ from: location }}></Navigate>
  ) : (
    <Outlet />
  );
};

export const PageNotFoundPage = () => {
  return <PageNotFound />;
};
