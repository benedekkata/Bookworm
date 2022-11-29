import React from "react";
import Home from "../containers/home/HomeComponent";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import BookDetailedView from "../layouts/BookDetailedView";
import Login from "../containers/authentication/Login";
import Register from "../containers/authentication/Register";
import PageNotFound from "../components/PageNotFound";
import UserSettings from "../containers/userdata/UserSettings";
import MyPageComponent from "../containers/mypage/MyPageComponent";
import EditreadingRecord from "../containers/mypage/EditreadingRecord";
import BookShelfEdit from "../containers/mypage/BookShelfEdit";
import UsersSearch from "../containers/users/UsersSearch";
import UserDetail from "../containers/users/UserDetail";

export const HomePage = () => {
  return <Home></Home>;
};

export const UsersPage = () => {
  return <UsersSearch />;
};

export const MyPagePage = () => {
  return <MyPageComponent></MyPageComponent>;
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

export const ReadingRecordEditPage = () => {
  return <EditreadingRecord />;
};

export const BookShelfEditPage = () => {
  return <BookShelfEdit />;
};

export const UserDetailPage = () => {
  return <UserDetail />;
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

export const UserSettingsPage = () => {
  return <UserSettings />;
};
