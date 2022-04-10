import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Link,
  Spacer,
  Square,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { MdExitToApp } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";
import logo from "../images/books.png";

const Navigation = () => {
  return (
    <Box zIndex={100} sx={{ position: "sticky", top: "0" }}>
      <Flex bg="brand.100" boxShadow="md" height="60px">
        <Center ml="3">
          <Image borderRadius="10px" boxSize="40px" src={logo} alt="Bookworm" />
        </Center>
        <Center ml="3" mr="3">
          <Link ml="3" mr="3" textColor="white">
            <RouterLink to="/">HOME</RouterLink>
          </Link>
          <Link ml="3" mr="3" textColor="white">
            <RouterLink to="/users">USERS</RouterLink>
          </Link>
          <Link ml="3" mr="3" textColor="white">
            <RouterLink to="/mypage">MY PAGE</RouterLink>
          </Link>
        </Center>
        <Spacer />
        <Square ml="3">
          <Icon as={CgProfile} w={8} h={8} color="white" />
        </Square>
        <Square ml="3" mr="3">
          <Icon as={MdExitToApp} w={8} h={8} color="white"></Icon>
        </Square>
      </Flex>
    </Box>
  );
};

export default Navigation;
