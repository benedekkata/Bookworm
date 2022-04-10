import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Navigation from "./components/NavigationComponent";
import { extendTheme } from "@chakra-ui/react";
import {
  BookDetailPage,
  HomePage,
  MyPagePage,
  UsersPage,
  ResisterPage,
  LoginPage,
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
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="mypage" element={<MyPagePage />} />
          <Route path="register" element={<ResisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="bookdetails/:isbn" element={<BookDetailPage />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
