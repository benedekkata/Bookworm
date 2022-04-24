import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import { isAuthenticated as isAuthenticatedCheck } from "./services/AuthenticationService";
import {
  BookDetailPage,
  HomePage,
  MyPagePage,
  UsersPage,
  ResisterPage,
  LoginPage,
  RequireAuth,
  PageNotFoundPage,
} from "./pages/pages";
import { AppTheme } from "./config/Theme";

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(true);
  useEffect(() => {
    isAuthenticatedCheck().then(setAuthenticated);
  }, []);

  return (
    <div className="App">
      <ChakraProvider theme={AppTheme}>
        <Navbar
          isAuthenticated={isAuthenticated}
          setAuthenticated={setAuthenticated}
        ></Navbar>
        <Routes>
          <Route
            path="/register"
            element={<ResisterPage setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/login"
            element={<LoginPage setAuthenticated={setAuthenticated} />}
          />
          <Route element={<RequireAuth isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/mypage" element={<MyPagePage />} />
            <Route path="/bookdetails/:isbn" element={<BookDetailPage />} />
          </Route>
          <Route path="*" element={<PageNotFoundPage />}></Route>
        </Routes>
      </ChakraProvider>
    </div>
  );
};

export default App;
