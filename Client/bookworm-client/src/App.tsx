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
  PageNotFoundPage,
  UserSettingsPage,
  ReadingRecordEditPage,
  BookShelfEditPage,
  UserDetailPage,
} from "./pages/pages";
import { AppTheme } from "./config/Theme";
import { PrivateRoute } from "./helpers/utils";

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
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/users/:userId" element={<UserDetailPage />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/mypage" element={<MyPagePage />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/bookdetails/:isbn" element={<BookDetailPage />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route
              path="/readingrecord/:bookId"
              element={<ReadingRecordEditPage />}
            />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/shelf/:shelfId" element={<BookShelfEditPage />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/settings" element={<UserSettingsPage />} />
          </Route>

          <Route path="*" element={<PageNotFoundPage />}></Route>
        </Routes>
      </ChakraProvider>
    </div>
  );
};

export default App;
