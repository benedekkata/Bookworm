import React from "react";
import { Box, Center, Flex, Icon, Spacer, Square } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { BiExit, BiUser } from "react-icons/bi";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/images/books.png";
import { signOut } from "../services/AuthenticationService";

const Navbar = (props: {
  isAuthenticated: Boolean;
  setAuthenticated: Function;
}) => {
  const navigate = useNavigate();
  const menu = props.isAuthenticated ? (
    <React.Fragment>
      <Center ml="3" mr="3">
        <Box ml="3" mr="3" textColor="white">
          <RouterLink to="/">HOME</RouterLink>
        </Box>
        <Box ml="3" mr="3" textColor="white">
          <RouterLink to="/users">USERS</RouterLink>
        </Box>
        <Box ml="3" mr="3" textColor="white">
          <RouterLink to="/mypage">MY PAGE</RouterLink>
        </Box>
      </Center>

      <Spacer />
      <Square
        ml="3"
        onClick={() => {
          navigate("/settings");
        }}
      >
        <Icon as={BiUser} w={8} h={8} color="white" />
      </Square>
      <Square
        ml="3"
        mr="3"
        onClick={() => {
          signOut();
          navigate("/login");
          props.setAuthenticated(false);
        }}
      >
        <Icon as={BiExit} w={8} h={8} color="white"></Icon>
      </Square>
    </React.Fragment>
  ) : null;

  return (
    <Box zIndex={100} sx={{ position: "sticky", top: "0" }}>
      <Flex bg="brand.100" boxShadow="md" height="60px">
        <Center ml="3">
          <Image borderRadius="10px" boxSize="40px" src={logo} alt="Bookworm" />
        </Center>
        {menu}
      </Flex>
    </Box>
  );
};

export default Navbar;
