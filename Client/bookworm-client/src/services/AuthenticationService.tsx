import React from "react";
import { LoginData, LoginResponse } from "../interfaces";

var state = false;
const API: string = "https://localhost:7188/api/Authentication";

export const isAuthenticated = () => {
  return state;
  //check if the token is there (and valid with the new endpoint)
  //check expires at if expired but the refresh token is there ask for a newOne
  //if there is no token, or there is an invalid/expired one, and new one can not be created with the refresh token, then false
};

export const signUp = (body: any) => {
  state = true;

  console.log("registered");
};

export const signIn = async (body: LoginData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${API}/login`, requestOptions);
  if (response.status === 200) {
    const data: LoginResponse = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("expiresAt", data.expiresAt);
    state = true;
  }
};

export const signOut = () => {
  state = false;
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expiresAt");
};
