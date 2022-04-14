import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/NavigationComponent";
import { extendTheme } from "@chakra-ui/react";
import {
  BookDetailPage,
  HomePage,
  MyPagePage,
  UsersPage,
  ResisterPage,
  LoginPage,
  RequireAuth,
  PageNotFound,
} from "./pages";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#00AFB9",
      200: "#FF9C27",
      300: "#18393B",
    },
  },
});

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  //use effect to check is authenticated and setAuthenticated from false to true if the token is valid
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Navigation
          isAuthenticated={isAuthenticated}
          setAuthenticated={setAuthenticated}
        ></Navigation>
        <Routes>
          <Route
            path="/register"
            element={<ResisterPage setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/login"
            element={<LoginPage setAuthenticated={setAuthenticated} />}
          />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/mypage" element={<MyPagePage />} />
            <Route path="/bookdetails/:isbn" element={<BookDetailPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
